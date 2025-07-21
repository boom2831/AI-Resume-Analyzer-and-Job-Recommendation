import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // Store all registered users

  useEffect(() => {
    // Load registered users from localStorage
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user with hashed password (in real app, use proper hashing)
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, hash this password
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
      createdAt: new Date().toISOString()
    };

    // Add to users list
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Log in the new user
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const login = (email, password) => {
    // Find user by email
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('User not found. Please register first.');
    }

    // Check password
    if (foundUser.password !== password) {
      throw new Error('Invalid password. Please try again.');
    }

    // Log in user (remove password from user object)
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    users,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 