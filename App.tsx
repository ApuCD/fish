import React, { useState, useEffect, useCallback } from 'react';
import { User, Catchable, Rarity, Rod, ClothingItem, InventoryItem } from './types';
import { CATCH_CHANCE, BASE_SUCCESS_COOLDOWN, FAIL_COOLDOWN, CATCHABLES, RARITY_CONFIG, RODS } from './constants';
import Header from './components/Header';
import FishingArea from './components/FishingArea';
import Inventory from './components/Inventory';
import DebugPanel from './components/DebugPanel';
import LoginScreen from './components/LoginScreen';
import CharacterPanel from './components/CharacterPanel';
import ShopModal from './components/ShopModal';
import LeaderboardModal from './components/LeaderboardModal';


const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<Record<string, User>>({});
    
    const [lastMessage, setLastMessage] = useState<string>("Cast your line to begin!");
    const [lastCatch, setLastCatch] = useState<Catchable | null>(null);
    const [cooldown, setCooldown] = useState<number>(0);
    const [isFishing, setIsFishing] = useState<boolean>(false);
    
    const [showDebug, setShowDebug] = useState<boolean>(false);
    const [showShop, setShowShop] = useState<boolean>(false);
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

    // Load all users from localStorage on initial mount
    useEffect(() => {
        try {
            const savedUsers = localStorage.getItem('overfishing-users');
            if (savedUsers) {
                setAllUsers(JSON.parse(savedUsers));
            }
        } catch (error) {
            console.error("Failed to load users from localStorage", error);
        }
    }, []);

    // Save all users to localStorage whenever the `allUsers` state changes
    useEffect(() => {
        try {
            localStorage.setItem('overfishing-users', JSON.stringify(allUsers));
        } catch (error) {
            console.error("Failed to save users to localStorage", error);
        }
    }, [allUsers]);
    
    // Cooldown timer
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const updateUserState = (user: User) => {
        setCurrentUser(user);
        setAllUsers(prev => ({ ...prev, [user.username]: user }));
    };

    const handleLogin = (username: string) => {
        if (allUsers[username]) {
            setCurrentUser(allUsers[username]);
        }
    };

    const handleRegister = (username: string, nickname: string) => {
        if (allUsers[username]) {
            alert("Username already exists!");
            return;
        }
        const newUser: User = {
            username,
            nickname,
            money: 0,
            inventory: {},
            equippedRodId: 1,
            equippedClothing: { head: null, body: null },
            joinDate: Date.now(),
        };
        updateUserState(newUser);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const determineCatch = (): Catchable => {
        const totalWeight = Object.values(RARITY_CONFIG).reduce((sum, r) => sum + r.weight, 0);
        let randomWeight = Math.random() * totalWeight;
        let chosenRarity: Rarity = Rarity.COMMON;

        for (const rarityKey in RARITY_CONFIG) {
            const rarity = rarityKey as Rarity;
            if (randomWeight < RARITY_CONFIG[rarity].weight) {
                chosenRarity = rarity;
                break;
            }
            randomWeight -= RARITY_CONFIG[rarity].weight;
        }

        const possibleCatches = CATCHABLES.filter(c => c.rarity === chosenRarity);
        return possibleCatches[Math.floor(Math.random() * possibleCatches.length)];
    };

    const handleGoFish = useCallback(() => {
        if (isFishing || cooldown > 0 || !currentUser) return;

        setIsFishing(true);
        setLastMessage("Casting your line...");
        setLastCatch(null);

        setTimeout(() => {
            const isSuccess = Math.random() < CATCH_CHANCE;

            if (isSuccess) {
                const caughtItem = determineCatch();
                setLastCatch(caughtItem);
                setLastMessage(`You caught a ${caughtItem.name}!`);
                
                const updatedUser = { ...currentUser };
                const currentItem = updatedUser.inventory[caughtItem.id];
                if (currentItem) {
                    currentItem.count++;
                } else {
                    updatedUser.inventory[caughtItem.id] = { item: caughtItem, count: 1 };
                }
                updateUserState(updatedUser);

                const equippedRod = RODS.find(r => r.id === currentUser.equippedRodId) || RODS[0];
                setCooldown(Math.round(BASE_SUCCESS_COOLDOWN * equippedRod.cooldownModifier));

            } else {
                setLastMessage("Nothing bites... Better luck next time!");
                setCooldown(FAIL_COOLDOWN);
            }
            setIsFishing(false);
        }, 2000);
    }, [isFishing, cooldown, currentUser]);

    if (!currentUser) {
        return <LoginScreen users={Object.values(allUsers)} onLogin={handleLogin} onRegister={handleRegister} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-800 to-blue-900 text-white font-sans flex flex-col items-center p-4 selection:bg-cyan-300/20">
            <Header user={currentUser} onLogout={handleLogout} />
            <main className="w-full max-w-7xl flex-grow mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3">
                    <CharacterPanel user={currentUser} />
                </aside>
                <div className="lg:col-span-9 flex flex-col gap-8">
                     <FishingArea
                        onGoFish={handleGoFish}
                        isFishing={isFishing}
                        cooldown={cooldown}
                        message={lastMessage}
                        lastCatch={lastCatch}
                    />
                    <Inventory user={currentUser} onUpdateUser={updateUserState} />
                </div>
            </main>
            <footer className="text-center p-4 text-xs text-sky-300/50 w-full max-w-7xl">
                 <div className="flex justify-center items-center gap-4 mt-4">
                    <button onClick={() => setShowShop(true)} className="px-4 py-2 bg-slate-700/50 text-sky-300/70 rounded-md hover:bg-slate-600/50 transition-colors">Shop</button>
                    <button onClick={() => setShowLeaderboard(true)} className="px-4 py-2 bg-slate-700/50 text-sky-300/70 rounded-md hover:bg-slate-600/50 transition-colors">Leaderboard</button>
                    <button onClick={() => setShowDebug(true)} className="px-4 py-2 bg-slate-700/50 text-sky-300/70 rounded-md hover:bg-slate-600/50 transition-colors">Debug Menu</button>
                </div>
            </footer>
            {showShop && <ShopModal user={currentUser} onUpdateUser={updateUserState} onClose={() => setShowShop(false)} />}
            {showLeaderboard && <LeaderboardModal allUsers={Object.values(allUsers)} currentUser={currentUser} onClose={() => setShowLeaderboard(false)} />}
            {showDebug && <DebugPanel user={currentUser} onUpdateUser={updateUserState} onClose={() => setShowDebug(false)} />}
        </div>
    );
};

export default App;
