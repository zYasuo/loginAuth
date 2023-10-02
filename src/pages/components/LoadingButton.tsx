// components/LoadingButton.tsx

import { useState } from 'react';

interface LoadingButtonProps {
    onClick: () => Promise<any>;
    className?: string;
    children: React.ReactNode;
}



export const LoadingButton: React.FC<LoadingButtonProps> = ({ onClick, className, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <button onClick={handleClick} className={className} disabled={isLoading}>
            {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
            ) : (
                children
            )}
        </button>
    );
}

