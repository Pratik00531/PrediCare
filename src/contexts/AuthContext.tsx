import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  profileCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (completed: boolean) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthState = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      const profileCompleted = localStorage.getItem('profileCompleted') === 'true';

      if (isLoggedIn && userEmail) {
        setUser({
          email: userEmail,
          profileCompleted
        });
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const login = (email: string) => {
    const profileCompleted = localStorage.getItem('profileCompleted') === 'true';
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    setUser({
      email,
      profileCompleted
    });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profileCompleted');
    // Keep other data like health data for demo purposes
    setUser(null);
  };

  const updateProfile = (completed: boolean) => {
    localStorage.setItem('profileCompleted', completed.toString());
    if (user) {
      setUser({
        ...user,
        profileCompleted: completed
      });
    }
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
