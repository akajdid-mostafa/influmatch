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
        // Demo users for testing
        const users = {
          'brand@example.com': { id: 1, name: 'SAmsung Brand', email, role: 'brand' },
          'influencer@example.com': { id: 2, name: 'Ezzoubair Hilal', email, role: 'influencer' },
          'admin@example.com': { id: 3, name: 'Admin User', email, role: 'admin' }
        };

        const user = users[email as keyof typeof users];
        if (!user) throw new Error('Invalid credentials');

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on role
        if (user.role === 'brand') navigate('/brand/dashboard');
        else if (user.role === 'influencer') navigate('/influencer/dashboard');
        else if (user.role === 'admin') navigate('/admin/dashboard');
        
        return { success: true };
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
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
        error: error instanceof Error ? error.message : 'Registration failed' 
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