import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from './types';

interface State {
  users: Map<number, User>;
  showVotes: boolean;
  getCurrentUser: () => User | undefined;
  setShowVotes: (show: boolean) => void;
  addUser: (user: User) => void;
  addUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
}

export const useStore = create<State>()(
  devtools((set) => ({
    users: new Map(),
    showVotes: false,
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
        console.log('updateUser', user);
        return { users: newUsers.set(user.id, user) };
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
  }))
);
