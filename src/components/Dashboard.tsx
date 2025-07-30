import React, { useState } from 'react';
import { X, User, Activity, Heart, MessageCircle, BarChart3, Edit, Save, Users, Shield, Trash2, Crown, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const { user, updateProfile, getAllUsers, makeUserOwner, deleteUser, getUserActivities } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
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
  const allUsers = getAllUsers();

  const tabs = user.isOwner ? [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-5 h-5" /> },
    { id: 'users', label: 'All Users', icon: <Users className="w-5 h-5" /> },
    { id: 'management', label: 'Management', icon: <Shield className="w-5 h-5" /> },
  ] : [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen py-4 sm:py-20 px-2 sm:px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold backdrop-blur-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                  <p className="text-blue-100 text-sm sm:text-base">{user.email}</p>
                  {user.isOwner && (
                    <span className="inline-block bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mt-1">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      OWNER
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors self-end sm:self-auto"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r dark:border-gray-700">
              <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">Login Count</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-300">{user.loginCount}</p>
                        </div>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">Liked Projects</p>
                          <p className="text-xl sm:text-2xl font-bold text-red-800 dark:text-red-300">{favoriteProjects.length}</p>
                        </div>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center">
                          <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">Blog Likes</p>
                          <p className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-300">{blogStats.userLikes}</p>
                        </div>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                          <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium">Comments</p>
                          <p className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300">{blogStats.userComments}</p>
                        </div>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {user.isOwner && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl text-white">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Crown className="w-5 h-5 mr-2" />
                        Owner Statistics
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                          <div className="text-2xl font-bold">{allUsers.length}</div>
                          <div className="text-sm">Total Users</div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                          <div className="text-2xl font-bold">{allUsers.filter(u => u.isActive).length}</div>
                          <div className="text-sm">Active Users</div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                          <div className="text-2xl font-bold">{allUsers.filter(u => u.isOwner).length}</div>
                          <div className="text-sm">Owners</div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm text-center">
                          <div className="text-2xl font-bold">{blogStats.totalPosts}</div>
                          <div className="text-sm">Blog Posts</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
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
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Activity Log</h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
                    <div className="space-y-4">
                      {user.activities && user.activities.length > 0 ? (
                        user.activities.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-800 dark:text-white text-sm sm:text-base break-words">{activity}</p>
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
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Favorite Projects</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {favoriteProjects.length > 0 ? (
                      favoriteProjects.map((project: any) => (
                        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Heart className="w-4 h-4 text-red-500 fill-current" />
                              <span>{project.likes.length}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
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

              {user.isOwner && activeTab === 'users' && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    All Users ({allUsers.length})
                  </h2>
                  
                  <div className="grid gap-4">
                    {allUsers.map((userData) => (
                      <div key={userData.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                              {userData.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                                {userData.name}
                                {userData.isOwner && (
                                  <Crown className="w-4 h-4 ml-2 text-yellow-500" />
                                )}
                                {userData.isActive && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                                )}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{userData.email}</p>
                              <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                                <span>Logins: {userData.loginCount}</span>
                                <span>•</span>
                                <span>Joined: {new Date(userData.createdAt).toLocaleDateString()}</span>
                                {userData.lastLogin && (
                                  <>
                                    <span>•</span>
                                    <span>Last: {new Date(userData.lastLogin).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedUser(userData)}
                              className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {!userData.isOwner && userData.id !== user.id && (
                              <>
                                <button
                                  onClick={() => makeUserOwner(userData.id)}
                                  className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                                  title="Make Owner"
                                >
                                  <Crown className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteUser(userData.id)}
                                  className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {user.isOwner && activeTab === 'management' && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Site Management
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                      <h3 className="text-lg font-semibold mb-4">Content Management</h3>
                      <div className="space-y-2 text-sm">
                        <p>✓ Add/Edit Projects</p>
                        <p>✓ Manage Skills</p>
                        <p>✓ Update Certificates</p>
                        <p>✓ Write Blog Posts</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl text-white">
                      <h3 className="text-lg font-semibold mb-4">User Management</h3>
                      <div className="space-y-2 text-sm">
                        <p>✓ View All Users</p>
                        <p>✓ Make Users Owners</p>
                        <p>✓ Delete Accounts</p>
                        <p>✓ Monitor Activities</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    {selectedUser.name}
                    {selectedUser.isOwner && <Crown className="w-5 h-5 ml-2 text-yellow-500" />}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Login Count</div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{selectedUser.loginCount}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                  <div className={`text-2xl font-bold ${selectedUser.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                    {selectedUser.isActive ? 'Active' : 'Offline'}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getUserActivities(selectedUser.id).slice(0, 10).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-800 dark:text-white">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}