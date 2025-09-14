import React from 'react';
import { Catchable } from '../types';
import { RARITY_CONFIG } from '../constants';

interface FishingAreaProps {
    onGoFish: () => void;
    isFishing: boolean;
    cooldown: number;
    message: string;
    lastCatch: Catchable | null;
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const FishingArea: React.FC<FishingAreaProps> = ({ onGoFish, isFishing, cooldown, message, lastCatch }) => {
    const isDisabled = isFishing || cooldown > 0;
    const rarityColor = lastCatch ? RARITY_CONFIG[lastCatch.rarity].color : 'text-cyan-200';
    
    return (
        <section className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 flex flex-col items-center gap-6">
            <div className="h-40 w-full flex flex-col justify-center items-center bg-black/20 rounded-xl p-4 text-center relative overflow-hidden">
                {isFishing && <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>}
                
                {lastCatch && !isFishing ? (
                    <div className="flex flex-col items-center animate-fade-in">
                        <span className="text-6xl drop-shadow-lg">{lastCatch.emoji}</span>
                        <p className={`mt-2 text-xl font-semibold ${rarityColor}`}>{message}</p>
                        <p className={`text-sm font-bold uppercase tracking-widest ${rarityColor}`}>
                           {lastCatch.rarity}
                        </p>
                    </div>
                ) : (
                     <p className="text-xl text-cyan-200 animate-fade-in">{message}</p>
                )}
            </div>
            
            <button
                onClick={onGoFish}
                disabled={isDisabled}
                className="w-full md:w-auto px-12 py-4 bg-cyan-600 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 transform transition-all duration-200 hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
            >
                {isFishing ? 'Fishing...' : cooldown > 0 ? `Wait... (${formatTime(cooldown)})` : '+ Go Fish'}
            </button>
        </section>
    );
};

export default FishingArea;
