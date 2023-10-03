// components/LoginForm.tsx
import React, { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { InputField } from './InputField';
import { loginUser } from '../utils/Auth';


export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const handleLogin = async () => {
        try {
            const data = await loginUser(email);
            console.log(data);
            setMessage('Login realizado com sucesso!');
        } catch (error) {
            console.error("Error searching user:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-50">
                        Entrar
                    </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <InputField
                        id="email-address"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        id="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {message && <div className="text-center text-white">{message}</div>}
                    <div>
                        <LoadingButton
                            onClick={handleLogin}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Entrar
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
