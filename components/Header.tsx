import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="text-center w-full max-w-7xl">
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <p className="font-semibold text-cyan-200">{user.nickname}</p>
                    <p className="font-bold text-lg text-yellow-300">${user.money.toLocaleString()}</p>
                </div>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-cyan-200 relative" style={{ textShadow: '0 0 15px rgba(100, 220, 255, 0.7)' }}>
                        Overfishing <span className="text-lg absolute top-0 -right-12 text-yellow-300 font-normal">beta</span>
                    </h1>
                    <p className="text-cyan-400/80 mt-2">A relaxing fishing mini-game</p>
                </div>
                <div>
                     <button onClick={onLogout} className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-500 transition-colors text-sm">Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
