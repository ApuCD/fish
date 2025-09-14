import React from 'react';
import { User, Catchable } from '../types';
import { CATCHABLES, RARITY_CONFIG } from '../constants';

interface DebugPanelProps {
    user: User;
    onUpdateUser: (user: User) => void;
    onClose: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ user, onUpdateUser, onClose }) => {

    const handleAddItem = (itemToAdd: Catchable) => {
        const updatedUser = { ...user };
        const newInventory = { ...updatedUser.inventory };
        const current = newInventory[itemToAdd.id];
        if (current) {
            newInventory[itemToAdd.id] = { ...current, count: current.count + 1 };
        } else {
            newInventory[itemToAdd.id] = { item: itemToAdd, count: 1 };
        }
        updatedUser.inventory = newInventory;
        onUpdateUser(updatedUser);
    };

    const handleRemoveItem = (itemToRemove: Catchable) => {
        const updatedUser = { ...user };
        const newInventory = { ...updatedUser.inventory };
        const current = newInventory[itemToRemove.id];
        if (current) {
            if (current.count > 1) {
                newInventory[itemToRemove.id] = { ...current, count: current.count - 1 };
            } else {
                delete newInventory[itemToRemove.id];
            }
        }
        updatedUser.inventory = newInventory;
        onUpdateUser(updatedUser);
    };

     const handleMoneyChange = (amount: number) => {
        onUpdateUser({ ...user, money: Math.max(0, user.money + amount) });
    };
    
    return (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="debug-panel-title">
            <div className="bg-slate-900 border border-cyan-400/20 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <h2 id="debug-panel-title" className="text-2xl font-bold text-cyan-200">Debug Menu</h2>
                    <button onClick={onClose} className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-500 transition-colors" aria-label="Close Debug Menu">Close</button>
                </header>
                <div className="p-4 flex-shrink-0 border-b border-slate-700">
                    <h3 className="text-lg font-semibold mb-2">Money</h3>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-lg">${user.money.toLocaleString()}</span>
                        <button onClick={() => handleMoneyChange(100)} className="px-3 py-1 bg-green-600 rounded text-xs">+100</button>
                        <button onClick={() => handleMoneyChange(1000)} className="px-3 py-1 bg-green-600 rounded text-xs">+1k</button>
                        <button onClick={() => handleMoneyChange(-100)} className="px-3 py-1 bg-red-600 rounded text-xs">-100</button>
                    </div>
                </div>
                <div className="p-4 flex-grow overflow-y-auto">
                    <ul className="space-y-2">
                        {CATCHABLES.sort((a, b) => a.id - b.id).map(item => {
                            const currentCount = user.inventory[item.id]?.count ?? 0;
                            const rarityInfo = RARITY_CONFIG[item.rarity];
                            return (
                                <li key={item.id} className={`flex items-center justify-between p-2 rounded-lg ${rarityInfo.bg}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl w-8 text-center">{item.emoji}</span>
                                        <div>
                                            <p className="font-semibold text-slate-100">{item.name}</p>
                                            <p className={`text-xs font-bold ${rarityInfo.color}`}>{item.rarity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleRemoveItem(item)}
                                            disabled={currentCount === 0}
                                            className="w-8 h-8 bg-slate-700 rounded-md font-bold text-lg hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                                            aria-label={`Remove one ${item.name}`}
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center font-mono text-lg">{currentCount}</span>
                                        <button
                                            onClick={() => handleAddItem(item)}
                                            className="w-8 h-8 bg-slate-700 rounded-md font-bold text-lg hover:bg-slate-600 transition-colors"
                                            aria-label={`Add one ${item.name}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DebugPanel;
