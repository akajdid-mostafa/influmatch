import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // For demo purposes, this is a simplified auth implementation
  // In a real app, you would connect to your authentication service
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      if (email && password) {
        // Demo users for testing - Updated for Moroccan market
        const users: Record<string, User> = {
          'marque@example.com': { id: 1, name: 'Marjane Market', email, role: 'brand' },
          'influenceur@example.com': { id: 2, name: 'Saad Lamjarred', email, role: 'influencer' },
          'admin@example.com': { id: 3, name: 'Admin Maroc', email, role: 'admin' }
        };

        const user = users[email as keyof typeof users];
        if (!user) throw new Error('Identifiants invalides');

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, user };
      } else {
        throw new Error('Veuillez fournir un email et un mot de passe');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Échec de la connexion' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'brand' | 'influencer';
    // Additional fields based on role
    [key: string]: any;
  }) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirect based on role
      if (userData.role === 'brand') navigate('/brand/dashboard');
      else if (userData.role === 'influencer') navigate('/influencer/dashboard');
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Échec de l\'inscription' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};