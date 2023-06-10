import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Room, User } from './types';

interface State {
  users: Map<number, User>;
  currentRoom: Room | undefined;
  showVotes: boolean;
  lottie: string | undefined;
  getCurrentUser: () => User | undefined;
  setShowVotes: (show: boolean) => void;
  addUser: (user: User) => void;
  addUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
  updateUsers: (users: User[]) => void;
  setCurrentRoom: (room: Room | undefined) => void;
  setLottie: (lottie: string | undefined) => void;
}

export const useStore = create<State>()(
  devtools((set) => ({
    users: new Map(),
    showVotes: false,
    lottie: undefined,
    addUser: (user: User) =>
      set((state) => {
        const newUsers = new Map(state.users);
        return { users: newUsers.set(user.id, user) };
      }),
    addUsers: (users: User[]) =>
      set((state) => {
        const newUsers = new Map(state.users);
        users.forEach((user) => newUsers.set(user.id, user));
        return { users: newUsers };
      }),
    updateUser: (user: User) =>
      set((state) => {
        const newUsers = new Map(state.users);
        return { users: newUsers.set(user.id, user) };
      }),
    updateUsers: (users: User[]) =>
      set((state) => {
        const newUsers = new Map(state.users);
        users.forEach((user) => newUsers.set(user.id, user));
        return { users: newUsers };
      }),
    getCurrentUser: () => {
      const userCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('user='));
      if (!userCookie) return undefined;
      const user = JSON.parse(
        decodeURIComponent(userCookie.substring('user='.length))
      );
      return user;
    },
    setShowVotes: (show: boolean) => set({ showVotes: show }),
    currentRoom: undefined,
    setCurrentRoom: (room: Room | undefined) => set({ currentRoom: room }),
    setLottie: (lottie: string | undefined) => set({ lottie: lottie }),
  }))
);
