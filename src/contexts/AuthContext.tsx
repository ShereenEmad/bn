import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  work?: string;
  isOwner: boolean;
  loginCount: number;
  activities: string[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addActivity: (activity: string) => void;
  incrementLoginCount: () => void;
  getAllUsers: () => User[];
  makeUserOwner: (userId: string) => void;
  deleteUser: (userId: string) => void;
  getUserActivities: (userId: string) => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize owner account if it doesn't exist
    initializeOwnerAccount();
    
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Update last login and set as active
      userData.lastLogin = new Date();
      userData.isActive = true;
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === userData.id ? { ...u, lastLogin: new Date(), isActive: true } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  }, []);

  const initializeOwnerAccount = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const ownerExists = users.find((u: any) => u.email === 'mohamedemad.front@gmail.com');
    
    if (!ownerExists) {
      const ownerAccount = {
        id: 'owner-' + Date.now(),
        name: 'Mohamed Emad',
        email: 'mohamedemad.front@gmail.com',
        password: 'Mes@2010225',
        isOwner: true,
        loginCount: 0,
        activities: [`Owner account created at ${new Date().toLocaleString()}`],
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: false
      };
      
      users.push(ownerAccount);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = { ...foundUser };
        delete userData.password;
        userData.loginCount = (userData.loginCount || 0) + 1;
        userData.activities = userData.activities || [];
        userData.activities.unshift(`Logged in at ${new Date().toLocaleString()}`);
        userData.lastLogin = new Date();
        userData.isActive = true;
        
        // Update user in storage
        const updatedUsers = users.map((u: any) => 
          u.email === email ? { 
            ...u, 
            loginCount: userData.loginCount, 
            activities: userData.activities,
            lastLogin: userData.lastLogin,
            isActive: true
          } : u
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

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        isOwner: false,
        loginCount: 1,
        activities: [`Account created at ${new Date().toLocaleString()}`],
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

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
    if (user) {
      // Mark user as inactive
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, isActive: false } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    
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
    const updatedActivities = [newActivity, ...(user.activities || [])].slice(0, 20);
    
    updateProfile({ activities: updatedActivities });
  };

  const incrementLoginCount = () => {
    if (!user) return;
    updateProfile({ loginCount: user.loginCount + 1 });
  };

  const getAllUsers = (): User[] => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.map((u: any) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  };

  const makeUserOwner = (userId: string) => {
    if (!user?.isOwner) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === userId ? { ...u, isOwner: true } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    addActivity(`Made user ${users.find((u: any) => u.id === userId)?.name} an owner`);
  };

  const deleteUser = (userId: string) => {
    if (!user?.isOwner || userId === user.id) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userToDelete = users.find((u: any) => u.id === userId);
    const updatedUsers = users.filter((u: any) => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    addActivity(`Deleted user account: ${userToDelete?.name}`);
  };

  const getUserActivities = (userId: string): string[] => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const targetUser = users.find((u: any) => u.id === userId);
    return targetUser?.activities || [];
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      addActivity,
      incrementLoginCount,
      getAllUsers,
      makeUserOwner,
      deleteUser,
      getUserActivities
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