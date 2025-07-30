import React, { useState } from 'react';
import { X, User, Activity, Heart, MessageCircle, BarChart3, Edit, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    work: user?.work || ''
  });

  if (!user) return null;

  const handleProfileUpdate = () => {
    updateProfile({
      name: profileData.name,
      age: profileData.age ? Number(profileData.age) : undefined,
      work: profileData.work
    });
    setIsEditingProfile(false);
  };

  const getFavoriteProjects = () => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    return projects.filter((project: any) => project.likes.includes(user.id));
  };

  const getBlogStats = () => {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const userLikes = posts.reduce((total: number, post: any) => 
      total + (post.likes.includes(user.id) ? 1 : 0), 0
    );
    const userComments = posts.reduce((total: number, post: any) => 
      total + post.comments.filter((comment: any) => comment.userId === user.id).length, 0
    );
    return { userLikes, userComments, totalPosts: posts.length };
  };

  const favoriteProjects = getFavoriteProjects();
  const blogStats = getBlogStats();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  {user.isOwner && (
                    <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                      OWNER
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-900 p-6 border-r dark:border-gray-700">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Login Count</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{user.loginCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                          <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-600 dark:text-red-400 text-sm font-medium">Liked Projects</p>
                          <p className="text-2xl font-bold text-red-800 dark:text-red-300">{favoriteProjects.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">Blog Likes</p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-300">{blogStats.userLikes}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Comments</p>
                          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">{blogStats.userComments}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all text-left"
                      >
                        <User className="w-8 h-8 text-blue-600 mb-2" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">Edit Profile</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal information</p>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('favorites')}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all text-left"
                      >
                        <Heart className="w-8 h-8 text-red-600 mb-2" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">View Favorites</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">See your liked projects</p>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('activity')}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all text-left"
                      >
                        <Activity className="w-8 h-8 text-green-600 mb-2" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">Activity Log</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Review your recent activities</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Name
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          />
                        ) : (
                          <p className="p-3 bg-white dark:bg-gray-800 rounded-lg">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <p className="p-3 bg-white dark:bg-gray-800 rounded-lg text-gray-500">{user.email} (cannot be changed)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Age
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="number"
                            value={profileData.age}
                            onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="Enter your age"
                          />
                        ) : (
                          <p className="p-3 bg-white dark:bg-gray-800 rounded-lg">{user.age || 'Not specified'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Work/Profession
                        </label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            value={profileData.work}
                            onChange={(e) => setProfileData({ ...profileData, work: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            placeholder="Enter your work/profession"
                          />
                        ) : (
                          <p className="p-3 bg-white dark:bg-gray-800 rounded-lg">{user.work || 'Not specified'}</p>
                        )}
                      </div>

                      {isEditingProfile && (
                        <button
                          onClick={handleProfileUpdate}
                          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Activity Log</h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                    <div className="space-y-4">
                      {user.activities && user.activities.length > 0 ? (
                        user.activities.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-white">{activity}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                          No activities yet. Start interacting with the site to see your activity log!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Favorite Projects</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProjects.length > 0 ? (
                      favoriteProjects.map((project: any) => (
                        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {project.price}
                            </span>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Heart className="w-4 h-4 text-red-500 fill-current" />
                              <span>{project.likes.length}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                          No favorites yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Start liking projects to see them here!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}