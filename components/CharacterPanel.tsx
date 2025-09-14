import React from 'react';
import { User } from '../types';
import { CLOTHING_ITEMS, RODS } from '../constants';

interface CharacterPanelProps {
    user: User;
}

const CharacterPanel: React.FC<CharacterPanelProps> = ({ user }) => {
    const equippedRod = RODS.find(r => r.id === user.equippedRodId) || RODS[0];
    const equippedHead = CLOTHING_ITEMS.find(c => c.id === user.equippedClothing.head);
    const equippedBody = CLOTHING_ITEMS.find(c => c.id === user.equippedClothing.body);

    return (
        <aside className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 h-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-cyan-200 mb-4 border-b-2 border-cyan-400/20 pb-2 w-full text-center">Your Character</h2>
            <div className="relative w-40 h-40 flex items-center justify-center">
                <span className="text-9xl">🧍</span>
                {equippedBody && <span className="absolute text-9xl">{equippedBody.emoji}</span>}
                {equippedHead && <span className="absolute text-6xl -top-4">{equippedHead.emoji}</span>}
            </div>
            <div className="mt-6 w-full space-y-3 text-center">
                <h3 className="text-xl font-semibold text-cyan-300">{user.nickname}</h3>
                <div>
                    <p className="text-sm text-slate-400">Equipped Rod:</p>
                    <p className="font-semibold text-lg">{equippedRod.name} {equippedRod.emoji}</p>
                </div>
            </div>
        </aside>
    );
};

export default CharacterPanel;
