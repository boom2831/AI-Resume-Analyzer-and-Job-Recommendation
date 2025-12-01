import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Bot, 
  ArrowLeft, 
  User, 
  Mail, 
  Settings,
  Save,
  Edit,
  MapPin,
  Phone,
  Shield,
  Trash2,
  Lock,
  X,
  Check
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Profile Data State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate software developer looking for new opportunities.',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567'
  });

  // Password Data State
  const [passData, setPassData] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // API Call to save profile would go here
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleSavePassword = () => {
    if (!passData.current || !passData.newPass || !passData.confirm) {
      alert('Please fill in all password fields.');
      return;
    }
    if (passData.newPass !== passData.confirm) {
      alert('New passwords do not match.');
      return;
    }
    
    // API Call to update password would go here
    setIsChangingPassword(false);
    setPassData({ current: '', newPass: '', confirm: '' }); // Reset form
    alert('Password changed successfully!');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?\n\nThis action cannot be undone."
    );
    
    if (confirmed) {
      // API Call to delete account would go here
      logout();
      navigate('/login');
      alert('Your account has been deleted.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Profile Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- MAIN CARD --- */}
        <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          {/* Hero Section */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-12 left-8">
              <img
                className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md bg-white"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                alt={user?.name}
              />
            </div>
          </div>

          {/* Profile Header Actions */}
          <div className="pt-16 px-8 pb-8 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-serif text-gray-900 dark:text-white">{user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Shield size={12} />
                  <span>Member since 2024</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center px-4 py-2 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  About Me
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="px-8 py-8 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Security & Account</h3>
            <div className="space-y-4">
              
              {/* CHANGE PASSWORD */}
              <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Change Password</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
                    </div>
                  </div>
                  {!isChangingPassword && (
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    >
                      Change
                    </button>
                  )}
                </div>

                {/* Password Change Form (Hidden by default) */}
                {isChangingPassword && (
                  <div className="mt-4 pl-0 sm:pl-14 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="password"
                        name="current"
                        placeholder="Current Password"
                        value={passData.current}
                        onChange={handlePassChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        name="newPass"
                        placeholder="New Password"
                        value={passData.newPass}
                        onChange={handlePassChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm New Password"
                        value={passData.confirm}
                        onChange={handlePassChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                       <button 
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPassData({ current: '', newPass: '', confirm: '' });
                        }}
                        className="flex items-center px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X size={14} className="mr-1" /> Cancel
                      </button>
                      <button 
                        onClick={handleSavePassword}
                        className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        <Check size={14} className="mr-1" /> Save Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* DELETE ACCOUNT */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Delete Account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Permanently remove your data</p>
                  </div>
                </div>
                <button 
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}