import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  work?: string;
  isOwner: boolean;
  loginCount: number;
  activities: string[];
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addActivity: (activity: string) => void;
  incrementLoginCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Check if user is already logged in with different account
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const current = JSON.parse(currentUser);
          if (current.email !== email) {
            return false; // Can't login with different account
          }
        }

        const userData = { ...user };
        delete userData.password;
        userData.loginCount = (userData.loginCount || 0) + 1;
        userData.activities = userData.activities || [];
        userData.activities.unshift(`Logged in at ${new Date().toLocaleString()}`);
        
        // Update user in storage
        const updatedUsers = users.map((u: any) => 
          u.email === email ? { ...u, loginCount: userData.loginCount, activities: userData.activities } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }

      // Check if this is the owner account
      const isOwner = email === 'mohamedemad.front@gmail.com';

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        isOwner,
        loginCount: 1,
        activities: [`Account created at ${new Date().toLocaleString()}`],
        createdAt: new Date()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Send email notification (simulated)
      if (!isOwner) {
        console.log(`Email sent to mohamedemad.front@gmail.com: New user ${name} (${email}) signed up!`);
      }

      const userData = { ...newUser };
      delete userData.password;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const addActivity = (activity: string) => {
    if (!user) return;

    const newActivity = `${activity} at ${new Date().toLocaleString()}`;
    const updatedActivities = [newActivity, ...(user.activities || [])].slice(0, 10);
    
    updateProfile({ activities: updatedActivities });
  };

  const incrementLoginCount = () => {
    if (!user) return;
    updateProfile({ loginCount: user.loginCount + 1 });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      addActivity,
      incrementLoginCount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}