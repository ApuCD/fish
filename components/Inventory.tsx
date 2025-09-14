import React from 'react';
import { User, InventoryItem, Rarity } from '../types';
import { RARITY_CONFIG, SELL_PRICES } from '../constants';

interface InventoryProps {
    user: User;
    onUpdateUser: (user: User) => void;
}

const rarityOrder: Rarity[] = [Rarity.LEGENDARY, Rarity.RARE, Rarity.UNCOMMON, Rarity.COMMON, Rarity.JUNK];

const Inventory: React.FC<InventoryProps> = ({ user, onUpdateUser }) => {
    const inventory = user.inventory;
    const sortedInventory = Object.values(inventory).sort((a, b) => {
        const rarityA = rarityOrder.indexOf(a.item.rarity);
        const rarityB = rarityOrder.indexOf(b.item.rarity);
        if (rarityA !== rarityB) {
            return rarityA - rarityB;
        }
        return a.item.id - b.item.id;
    });

    const handleSell = (itemToSell: InventoryItem) => {
        const price = SELL_PRICES[itemToSell.item.rarity];
        const newInventory = { ...user.inventory };
        
        if (newInventory[itemToSell.item.id].count > 1) {
            newInventory[itemToSell.item.id].count -= 1;
        } else {
            delete newInventory[itemToSell.item.id];
        }

        const updatedUser = {
            ...user,
            money: user.money + price,
            inventory: newInventory
        };
        onUpdateUser(updatedUser);
    };

    return (
        <section className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 flex-grow">
            <h2 className="text-2xl font-bold text-cyan-200 mb-4 border-b-2 border-cyan-400/20 pb-2">Inventory</h2>
            {sortedInventory.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400">
                    <p>Your inventory is empty. Start fishing!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sortedInventory.map(({ item, count }) => (
                         <div
                            key={item.id}
                            title={`${item.name} (${item.rarity}) - Sell for $${SELL_PRICES[item.rarity]}`}
                            className={`p-3 rounded-lg flex flex-col items-center justify-center text-center border-2 border-transparent transition-all group relative ${RARITY_CONFIG[item.rarity].bg} hover:border-cyan-400/50`}
                        >
                            <span className="text-4xl drop-shadow-md">{item.emoji}</span>
                            <p className="mt-1 text-sm font-semibold truncate w-full text-slate-100">{item.name}</p>
                            <p className={`text-xs font-bold ${RARITY_CONFIG[item.rarity].color}`}>x {count}</p>
                            <button
                                onClick={() => handleSell({item, count})}
                                className="absolute bottom-1 right-1 px-2 py-0.5 bg-yellow-600 text-white rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500"
                            >
                                Sell
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Inventory;
