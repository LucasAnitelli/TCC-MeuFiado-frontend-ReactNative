
export interface User {
    email: string;
    nameEstablishment?: string;
}

export interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}