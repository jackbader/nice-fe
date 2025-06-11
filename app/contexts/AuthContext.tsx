"use client";

import { notifications } from "@mantine/notifications";
import { createContext, ReactNode, useContext, useState } from "react";

export interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: User | null }) {
    const [user, setUser] = useState<User | null>(initialUser);

    const login = async (credentials: { email: string; password: string }) => {
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        const data = await response.json();

        console.log('data', data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        setUser(data.user);
        window.location.href = "/dashboard";
    };

    const logout = async () => {
        try {
            // Call the server to clear the session cookie
            await fetch("http://localhost:8000/auth/logout", {
                method: "POST",
                credentials: "include", // Important for sending the session cookie
            });

            // Clear local state
            setUser(null);

            notifications.show({
                title: "Logged out",
                message: "You have been successfully logged out",
                color: "blue",
            });

            window.location.href = "/";
        } catch (error) {
            console.error("Error during logout:", error);
            notifications.show({
                title: "Error",
                message: "Failed to log out properly",
                color: "red",
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 