import create from 'zustand'
interface AuthState {
    user?: {
        name: string
    },
    isLoading: boolean,
    showOnboard: boolean,
    setUser: (user: AuthState['user']) => void,
    logOut: () => void,
    setOnboardFalse: () => void
}


export const useAuth = create<AuthState>((set) => ({
    user: null,
    showOnboard: true,
    isLoading: false,
    setUser: (user) => set((state) => ({ user })),
    logOut: () => set((state) => ({ user: null })),
    setOnboardFalse: () => set({ showOnboard: false })
}))
