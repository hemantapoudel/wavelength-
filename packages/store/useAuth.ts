import create from 'zustand'
interface AuthState {
    user?: {
        name: string
    },
    isLoading: boolean,
    setUser: (user: AuthState['user']) => void,
    logOut: () => void,
}


export const useAuth = create<AuthState>((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set((state) => ({ user })),
    logOut: () => set((state) => ({ user: null })),

}))
