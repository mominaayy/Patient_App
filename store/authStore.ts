import { create } from 'zustand';

type AuthState = {
  token: string;
  localId: number | null;
  uid: string;
  setToken: (token: string) => void;
  setLocalId: (id: number) => void;
  setUid: (uid: string) => void
};

export const useAuthStore = create<AuthState>((set) => ({
  token: '',
  localId: null,
  uid: '',
  setToken: (token) => set({ token }),
  setLocalId: (id) => set({ localId: id }),
  setUid: (uid) => set({ uid }),
}));
