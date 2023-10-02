import React from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ id, type, placeholder, value, onChange }) => {
    return (
        <div>
            <label htmlFor={id} className="sr-only">{placeholder}</label>
            <input
                id={id}
                name={id}
                type={type}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}


