import React, { useState } from 'react';
import { User, Rod, ClothingItem } from '../types';
import { RODS, CLOTHING_ITEMS } from '../constants';

interface ShopModalProps {
    user: User;
    onUpdateUser: (user: User) => void;
    onClose: () => void;
}

type ShopCategory = 'rods' | 'clothing';

const ShopModal: React.FC<ShopModalProps> = ({ user, onUpdateUser, onClose }) => {
    const [activeTab, setActiveTab] = useState<ShopCategory>('rods');
    
    const userRods = RODS.filter(r => r.id <= user.equippedRodId);

    const handleBuyRod = (rod: Rod) => {
        if (user.money >= rod.price && user.equippedRodId < rod.id) {
            const updatedUser = {
                ...user,
                money: user.money - rod.price,
                equippedRodId: rod.id,
            };
            onUpdateUser(updatedUser);
        }
    };
    
    const hasClothingItem = (item: ClothingItem) => {
        // A simple check if the item is equipped or in a virtual "closet"
        // For now, we'll just check if it's equipped
        return user.equippedClothing.head === item.id || user.equippedClothing.body === item.id;
    }

    const handleBuyClothing = (item: ClothingItem) => {
         if (user.money >= item.price && !hasClothingItem(item)) { // Simplified: assume no closet, can only buy if not owned
            const updatedUser = {
                ...user,
                money: user.money - item.price,
                equippedClothing: {
                    ...user.equippedClothing,
                    [item.type]: item.id, // Auto-equip on buy
                }
            };
            onUpdateUser(updatedUser);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="bg-slate-900 border border-cyan-400/20 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-cyan-200">Shop</h2>
                        <p className="text-yellow-300 font-semibold">Your Money: ${user.money.toLocaleString()}</p>
                    </div>
                    <button onClick={onClose} className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-500 transition-colors">Close</button>
                </header>
                <div className="border-b border-slate-700 flex-shrink-0">
                    <nav className="flex">
                        <button onClick={() => setActiveTab('rods')} className={`flex-1 p-3 font-semibold ${activeTab === 'rods' ? 'bg-slate-700 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:bg-slate-700/50'}`}>Rods</button>
                        <button onClick={() => setActiveTab('clothing')} className={`flex-1 p-3 font-semibold ${activeTab === 'clothing' ? 'bg-slate-700 text-cyan-300' : 'bg-slate-800 text-slate-400 hover:bg-slate-700/50'}`}>Clothing</button>
                    </nav>
                </div>
                <div className="p-4 flex-grow overflow-y-auto">
                    {activeTab === 'rods' && (
                        <ul className="space-y-3">
                            {RODS.map(rod => {
                                const isOwned = user.equippedRodId >= rod.id;
                                const canAfford = user.money >= rod.price;
                                const isNext = user.equippedRodId + 1 === rod.id;
                                return (
                                    <li key={rod.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-100">{rod.name} {rod.emoji}</p>
                                            <p className="text-sm text-slate-400">Cooldown: {rod.cooldownModifier * 100}% of base</p>
                                            <p className="text-sm font-bold text-yellow-400">Price: ${rod.price.toLocaleString()}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleBuyRod(rod)}
                                            disabled={isOwned || !canAfford || !isNext}
                                            // FIX: The className was using a mix of double quotes and backticks, causing a syntax error. Corrected to use a template literal.
                                            className={`px-4 py-2 rounded-lg font-bold transition-colors disabled:cursor-not-allowed
                                                ${isOwned ? 'bg-green-700 text-white/70' : 
                                                !isNext ? 'bg-slate-600 text-slate-400' :
                                                canAfford ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-red-800/50 text-red-300/70'}`
                                            }>
                                            {isOwned ? 'Owned' : !isNext ? 'Locked' : 'Buy'}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                     {activeTab === 'clothing' && (
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {CLOTHING_ITEMS.map(item => {
                                const isOwned = hasClothingItem(item);
                                const canAfford = user.money >= item.price;
                                return (
                                    <li key={item.id} className="flex flex-col items-center justify-between p-3 rounded-lg bg-slate-800/60 text-center">
                                        <span className="text-5xl">{item.emoji}</span>
                                        <p className="font-semibold text-slate-100 mt-2">{item.name}</p>
                                        <p className="text-sm text-slate-400 capitalize">{item.type} Item</p>
                                        <p className="text-sm font-bold text-yellow-400 mt-1">Price: ${item.price.toLocaleString()}</p>
                                         <button 
                                            onClick={() => handleBuyClothing(item)}
                                            disabled={isOwned || !canAfford}
                                            // FIX: The className was using a mix of double quotes and backticks, causing a syntax error. Corrected to use a template literal.
                                            className={`w-full mt-2 px-4 py-2 rounded-lg font-bold transition-colors disabled:cursor-not-allowed
                                                ${isOwned ? 'bg-green-700 text-white/70' : 
                                                canAfford ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-red-800/50 text-red-300/70'}`
                                            }>
                                            {isOwned ? 'Owned' : 'Buy'}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopModal;