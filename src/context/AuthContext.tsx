"use client";

import { LoginFormData, SignupFormData } from "@/interfaces/form";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useState } from "react";
// ---------------------------------
export interface User {
  id: string;
  full_name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (formData: LoginFormData) => Promise<void>;
  signup: (formData: SignupFormData, emailRedirect: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }: LoginFormData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      const { user } = data;
      setUser({
        id: user.id,
        full_name: user.user_metadata.full_name,
        email: user.user_metadata.email
      });
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    { name, email, password, confirmPassword }: SignupFormData,
    emailRedirect: string
  ) => {
    setIsLoading(true);
    try {
      if(password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            emailRedirect: emailRedirect,
          }  
        }
      })

      if (error) {
        throw error;
      }

      console.log("Signup successful");

    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}