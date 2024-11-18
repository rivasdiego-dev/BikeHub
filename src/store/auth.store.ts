// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from './user.store';
interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (credentials: UserCredentials) => Promise<{ success: boolean; error?: string }>;
    register: (userData: Omit<User, 'id' | 'created_at' | 'is_admin'>) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            currentUser: null,
            isAuthenticated: false,

            login: async ({ email, password }) => {
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 500));

                const user = useUserStore.getState().getUserByEmail(email);

                if (user && user.password === password) {
                    set({
                        currentUser: user,
                        isAuthenticated: true,
                    });
                    return { success: true };
                }

                return {
                    success: false,
                    error: 'Credenciales inválidas',
                };
            },

            register: async (userData) => {
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 500));

                const existingUser = useUserStore.getState().getUserByEmail(userData.email);

                if (existingUser) {
                    return {
                        success: false,
                        error: 'El email ya está registrado',
                    };
                }

                const userId = useUserStore.getState().addUser({
                    ...userData,
                    is_admin: false,
                });

                const newUser = useUserStore.getState().getUser(userId);

                if (newUser) {
                    set({
                        currentUser: newUser,
                        isAuthenticated: true,
                    });
                    return { success: true };
                }

                return {
                    success: false,
                    error: 'Error al crear usuario',
                };
            },

            logout: () => {
                set({
                    currentUser: null,
                    isAuthenticated: false,
                });
            },

            checkAuth: () => {
                const state = get();
                return state.isAuthenticated && state.currentUser !== null;
            },
        }),
        {
            name: 'auth-store',
        }
    )
);