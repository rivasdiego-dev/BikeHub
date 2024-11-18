// stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    users: User[];
    addUser: (user: Omit<User, 'id' | 'created_at'>) => string;
    getUser: (id: string) => User | undefined;
    getUserByEmail: (email: string) => User | undefined;
    updateUser: (id: string, userData: Partial<User>) => void;
    deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            users: [
                // Usuario admin por defecto
                {
                    id: 'admin-1',
                    email: 'admin@bikehub.com',
                    password: 'admin123',
                    name: 'Admin',
                    is_admin: true,
                    created_at: new Date().toISOString(),
                },
                // Usuario normal por defecto
                {
                    id: 'user-1',
                    email: 'user@bikehub.com',
                    password: 'user123',
                    name: 'Usuario Demo',
                    is_admin: false,
                    created_at: new Date().toISOString(),
                },
            ],

            addUser: (userData) => {
                const id = `user-${Math.random().toString(36).substr(2, 9)}`;
                const newUser: User = {
                    ...userData,
                    id,
                    created_at: new Date().toISOString(),
                };

                set((state) => ({
                    users: [...state.users, newUser],
                }));

                return id;
            },

            getUser: (id) => {
                const state = get();
                return state.users.find((user) => user.id === id);
            },

            getUserByEmail: (email) => {
                const state = get();
                return state.users.find((user) => user.email === email);
            },

            updateUser: (id, userData) => {
                set((state) => ({
                    users: state.users.map((user) =>
                        user.id === id ? { ...user, ...userData } : user
                    ),
                }));
            },

            deleteUser: (id) => {
                set((state) => ({
                    users: state.users.filter((user) => user.id !== id),
                }));
            },
        }),
        {
            name: 'user-store',
        }
    )
);