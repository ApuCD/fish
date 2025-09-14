
export enum Rarity {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  LEGENDARY = 'Legendary',
  JUNK = 'Junk',
}

export interface Catchable {
  id: number;
  name: string;
  emoji: string;
  rarity: Rarity;
}

export interface InventoryItem {
  item: Catchable;
  count: number;
}

export interface Rod {
    id: number;
    name: string;
    emoji: string;
    price: number;
    cooldownModifier: number; // e.g., 0.9 for 10% reduction
}

export interface ClothingItem {
    id: number;
    name: string;
    emoji: string;
    type: 'head' | 'body';
    price: number;
}

export interface User {
    username: string; // unique login ID
    nickname: string; // display name
    money: number;
    inventory: Record<number, InventoryItem>; // Using Record for easier JSON serialization
    equippedRodId: number;
    equippedClothing: {
        head: number | null;
        body: number | null;
    };
    joinDate: number;
}