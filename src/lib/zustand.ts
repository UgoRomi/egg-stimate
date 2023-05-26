import { create } from 'zustand';
import { User } from './types';

interface State {
  users: Map<number, User>;
  getCurrentUser: () => User | undefined;
  addUser: (user: User) => void;
  addUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
}

export const useStore = create<State>()((set) => ({
  users: new Map(),
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
}));
