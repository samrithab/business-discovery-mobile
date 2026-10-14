import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Business = { id: string; name: string; category: string; description: string };
type Store = { businesses: Business[]; loading: boolean; addBusiness: (data: Omit<Business, 'id'>) => Promise<void> };
const KEY = 'business-discovery:listings:v1';
const Context = createContext<Store | null>(null);
export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) { const parsed: unknown = JSON.parse(raw); if (Array.isArray(parsed)) setBusinesses(parsed as Business[]); }
    }).catch(err => console.warn('Unable to load listings', err)).finally(() => setLoading(false));
  }, []);
  async function addBusiness(data: Omit<Business, 'id'>) {
    const next = [{ ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }, ...businesses];
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    setBusinesses(next);
  }
  return <Context.Provider value={{ businesses, loading, addBusiness }}>{children}</Context.Provider>;
}
export function useBusinesses() { const store = useContext(Context); if (!store) throw new Error('BusinessProvider missing'); return store; }
