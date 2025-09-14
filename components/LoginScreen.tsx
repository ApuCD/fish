import React, { useState } from 'react';
import { User } from '../types';

interface LoginScreenProps {
    users: User[];
    onLogin: (username: string) => void;
    onRegister: (username: string, nickname: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ users, onLogin, onRegister }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() && nickname.trim()) {
            onRegister(username.trim().toLowerCase(), nickname.trim());
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-800 to-blue-900 text-white flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10">
                <h1 className="text-4xl font-bold text-cyan-200 text-center mb-6">Welcome to Overfishing</h1>

                {isRegistering ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <h2 className="text-2xl text-center mb-4">Create New Player</h2>
                        <div className="space-y-4">
                             <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Nickname"
                                required
                                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                             <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Login (username, no spaces)"
                                required
                                pattern="\S*"
                                title="Username cannot contain spaces."
                                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        <button type="submit" className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors">Register</button>
                        <button onClick={() => setIsRegistering(false)} className="w-full mt-2 text-center text-sm text-cyan-300 hover:underline">Back to Login</button>
                    </form>
                ) : (
                    <div>
                        <h2 className="text-2xl text-center mb-4">Select Player</h2>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {users.length > 0 ? (
                                users.map(user => (
                                    <button
                                        key={user.username}
                                        onClick={() => onLogin(user.username)}
                                        className="w-full p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-600/50 transition-colors"
                                    >
                                        {user.nickname}
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-slate-400">No players found. Please register.</p>
                            )}
                        </div>
                        <button onClick={() => setIsRegistering(true)} className="w-full mt-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors">Create New Player</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginScreen;
