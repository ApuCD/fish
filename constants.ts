import { Rarity, Catchable, Rod, ClothingItem } from './types';

export const CATCH_CHANCE = 1 / 15;
export const BASE_SUCCESS_COOLDOWN = 180; // 3 minutes
export const FAIL_COOLDOWN = 15; // 15 seconds

export const RARITY_CONFIG: { [key in Rarity]: { weight: number; color: string; bg: string } } = {
  [Rarity.JUNK]: { weight: 10, color: 'text-yellow-700', bg: 'bg-yellow-900/50' },
  [Rarity.COMMON]: { weight: 60, color: 'text-gray-300', bg: 'bg-gray-700/50' },
  [Rarity.UNCOMMON]: { weight: 22, color: 'text-green-400', bg: 'bg-green-800/50' },
  [Rarity.RARE]: { weight: 7, color: 'text-blue-400', bg: 'bg-blue-800/50' },
  [Rarity.LEGENDARY]: { weight: 1, color: 'text-purple-400', bg: 'bg-purple-800/50' },
};

export const SELL_PRICES: { [key in Rarity]: number } = {
    [Rarity.JUNK]: 1,
    [Rarity.COMMON]: 5,
    [Rarity.UNCOMMON]: 25,
    [Rarity.RARE]: 100,
    [Rarity.LEGENDARY]: 500,
};

export const RODS: Rod[] = [
    { id: 1, name: 'Old Rod', emoji: '🎣', price: 0, cooldownModifier: 1.0 },
    { id: 2, name: 'Sturdy Rod', emoji: '🎣', price: 500, cooldownModifier: 0.9 }, // 10% faster
    { id: 3, name: 'Professional Rod', emoji: '🎣', price: 2500, cooldownModifier: 0.75 }, // 25% faster
    { id: 4, name: 'Mastercraft Rod', emoji: '🎣', price: 10000, cooldownModifier: 0.5 }, // 50% faster
    { id: 5, name: 'Golden Rod', emoji: '🏆', price: 50000, cooldownModifier: 0.25 }, // 75% faster
];

export const CLOTHING_ITEMS: ClothingItem[] = [
    { id: 101, name: 'Baseball Cap', emoji: '🧢', type: 'head', price: 150 },
    { id: 102, name: 'Cowboy Hat', emoji: '🤠', type: 'head', price: 200 },
    { id: 103, name: 'Top Hat', emoji: '🎩', type: 'head', price: 500 },
    { id: 201, name: 'T-Shirt', emoji: '👕', type: 'body', price: 100 },
    { id: 202, name: 'Jacket', emoji: '🧥', type: 'body', price: 300 },
    { id: 203, name: 'Kimono', emoji: '👘', type: 'body', price: 600 },
];


export const CATCHABLES: Catchable[] = [
  // Junk
  { id: 1, name: 'Seaweed', emoji: '🌿', rarity: Rarity.JUNK },
  { id: 2, name: 'Old Boot', emoji: '👢', rarity: Rarity.JUNK },
  { id: 3, name: 'Rusty Can', emoji: '🥫', rarity: Rarity.JUNK },
  { id: 4, name: 'Plastic Bag', emoji: '🛍️', rarity: Rarity.JUNK },
  { id: 5, name: 'Soggy Log', emoji: '🪵', rarity: Rarity.JUNK },

  // Common
  { id: 6, name: 'Anchovy', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 7, name: 'Sardine', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 8, name: 'Mackerel', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 9, name: 'Herring', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 10, name: 'Cod', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 11, name: 'Tuna', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 12, name: 'Bass', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 13, name: 'Carp', emoji: '🎏', rarity: Rarity.COMMON },
  { id: 14, name: 'Perch', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 15, name: 'Pike', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 16, name: 'Salmon', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 17, name: 'Trout', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 18, name: 'Snapper', emoji: '🐟', rarity: Rarity.COMMON },
  { id: 19, name: 'Flounder', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 20, name: 'Sea Bass', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 21, name: 'Haddock', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 22, name: 'Pollock', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 23, name: 'Halibut', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 24, name: 'Grouper', emoji: '🐠', rarity: Rarity.COMMON },
  { id: 25, name: 'Mahi-mahi', emoji: '🐠', rarity: Rarity.COMMON },
  
  // Uncommon
  { id: 26, name: 'Tropical Fish', emoji: '🐠', rarity: Rarity.UNCOMMON },
  { id: 27, name: 'Pufferfish', emoji: '🐡', rarity: Rarity.UNCOMMON },
  { id: 28, name: 'Octopus', emoji: '🐙', rarity: Rarity.UNCOMMON },
  { id: 29, name: 'Squid', emoji: '🦑', rarity: Rarity.UNCOMMON },
  { id: 30, name: 'Lobster', emoji: '🦞', rarity: Rarity.UNCOMMON },
  { id: 31, name: 'Crab', emoji: '🦀', rarity: Rarity.UNCOMMON },
  { id: 32, name: 'Shrimp', emoji: '🦐', rarity: Rarity.UNCOMMON },
  { id: 33, name: 'Clam', emoji: '🦪', rarity: Rarity.UNCOMMON },
  { id: 34, name: 'Eel', emoji: '鰻', rarity: Rarity.UNCOMMON },
  { id: 35, name: 'Stingray', emoji: '⚡️', rarity: Rarity.UNCOMMON },
  { id: 36, name: 'Starfish', emoji: '⭐', rarity: Rarity.UNCOMMON },
  { id: 37, name: 'Jellyfish', emoji: ' jellyfish ', rarity: Rarity.UNCOMMON },
  
  // Rare
  { id: 38, name: 'Anglerfish', emoji: '🎣', rarity: Rarity.RARE },
  { id: 39, name: 'Coelacanth', emoji: ' L ', rarity: Rarity.RARE },
  { id: 40, name: 'Pearl', emoji: '⚪', rarity: Rarity.RARE },
  { id: 41, name: 'Message in a Bottle', emoji: '🍾', rarity: Rarity.RARE },
  { id: 42, name: 'Dolphin', emoji: '🐬', rarity: Rarity.RARE },
  { id: 43, name: 'Whale', emoji: '🐳', rarity: Rarity.RARE },
  { id: 44, name: 'Shark', emoji: '🦈', rarity: Rarity.RARE },
  
  // Legendary
  { id: 45, name: 'Golden Fish', emoji: '🏆', rarity: Rarity.LEGENDARY },
  { id: 46, name: 'Treasure Chest', emoji: '📦', rarity: Rarity.LEGENDARY },
  { id: 47, name: 'Sunken Crown', emoji: '👑', rarity: Rarity.LEGENDARY },
  { id: 48, name: 'Kraken Tentacle', emoji: '🐙', rarity: Rarity.LEGENDARY },
  { id: 49, name: 'Mermaid\'s Tear', emoji: '💧', rarity: Rarity.LEGENDARY },
  { id: 50, name: 'Nessie', emoji: '🐉', rarity: Rarity.LEGENDARY },
];
