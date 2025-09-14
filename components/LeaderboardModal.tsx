import React from 'react';
import { User } from '../types';
import { SELL_PRICES } from '../constants';

interface LeaderboardModalProps {
    allUsers: User[];
    currentUser: User;
    onClose: () => void;
}

const calculateNetWorth = (user: User): number => {
    const inventoryValue = Object.values(user.inventory).reduce((sum, invItem) => {
        const price = SELL_PRICES[invItem.item.rarity] || 0;
        return sum + (price * invItem.count);
    }, 0);
    return user.money + inventoryValue;
};

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ allUsers, currentUser, onClose }) => {
    const sortedUsers = [...allUsers]
        .map(user => ({ ...user, netWorth: calculateNetWorth(user) }))
        .sort((a, b) => b.netWorth - a.netWorth);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="bg-slate-900 border border-cyan-400/20 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-2xl font-bold text-cyan-200">Leaderboard</h2>
                    <button onClick={onClose} className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-500 transition-colors">Close</button>
                </header>
                <div className="p-4 flex-grow overflow-y-auto">
                    <ul className="space-y-2">
                        {sortedUsers.map((user, index) => {
                            const isCurrentUser = user.username === currentUser.username;
                            return (
                                <li 
                                    key={user.username} 
                                    className={`flex items-center justify-between p-3 rounded-lg transition-all
                                        ${isCurrentUser ? 'bg-cyan-800/50 border-2 border-cyan-400' : 'bg-slate-800/60'}
                                        ${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : index === 2 ? 'border-yellow-700' : 'border-transparent'}
                                        ${index < 3 ? 'border-2' : ''}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-lg w-8 text-center">{index + 1}</span>
                                        <div>
                                            <p className={`font-semibold ${isCurrentUser ? 'text-cyan-200' : 'text-slate-100'}`}>{user.nickname}</p>
                                            <p className="text-xs text-slate-400">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-lg text-yellow-300">${user.netWorth.toLocaleString()}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardModal;
