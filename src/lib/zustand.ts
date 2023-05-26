import { create } from 'zustand';
import { User } from './types';

interface State {
  users: Map<number, User>;
  addUser: (user: User) => void;
  addUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
}

export const useStore = create<State>()((set) => ({
  users: new Map(),
  addUser: (user: User) =>
    set((state) => ({ users: state.users.set(user.id, user) })),
  addUsers: (users: User[]) =>
    set((state) => {
      const newUsers = new Map(state.users);
      users.forEach((user) => newUsers.set(user.id, user));
      return { users: newUsers };
    }),
  updateUser: (user: User) =>
    set((state) => ({ users: state.users.set(user.id, user) })),
}));
