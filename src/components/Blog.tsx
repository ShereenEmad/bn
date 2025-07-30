import React, { useState, useEffect } from 'react';
import { Calendar, User, Heart, MessageCircle, Edit, Trash2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import BlogEditor from './BlogEditor';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  likes: string[];
  comments: Comment[];
  image?: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  userId: string;
}

export default function Blog() {
  const { t } = useLanguage();
  const { user, addActivity } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Load blog posts from localStorage
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Default posts
      // const defaultPosts: BlogPost[] = [
      //   {
      //     id: '1',
      //     title: 'My Journey into Frontend Development',
      //     content: 'Starting my journey as a 15-year-old developer has been incredible. From learning HTML to mastering React, every day brings new challenges and opportunities...',
      //     excerpt: 'How I started my journey as a young developer and what I\'ve learned so far.',
      //     author: 'Mohamed Emad',
      //     date: '2024-12-15',
      //     likes: [],
      //     comments: [],
      //     image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800'
      //   },
      //   {
      //     id: '2',
      //     title: 'Why I Love React.js',
      //     content: 'React has transformed how I think about building user interfaces. The component-based architecture makes code reusable and maintainable...',
      //     excerpt: 'Exploring the features that make React.js my favorite frontend framework.',
      //     author: 'Mohamed Emad',
      //     date: '2024-12-10',
      //     likes: [],
      //     comments: []
      //   }
      // ];
      // setPosts(defaultPosts);
      // localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
    // No return value here
  }, []);

  const savePosts = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const handleLike = (postId: string) => {
    if (!user) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id);
        const newLikes = isLiked 
          ? post.likes.filter(id => id !== user.id)
          : [...post.likes, user.id];
        
        addActivity(isLiked ? `Unliked blog post: ${post.title}` : `Liked blog post: ${post.title}`);
        
        return { ...post, likes: newLikes };
      }
      return post;
    });

    savePosts(updatedPosts);
  };

  const handleComment = (postId: string) => {
    if (!user || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user.name,
      content: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      userId: user.id
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    savePosts(updatedPosts);
    setNewComment('');
    addActivity(`Commented on blog post: ${posts.find(p => p.id === postId)?.title}`);
  };

  const handleDeletePost = (postId: string) => {
    if (!user?.isOwner) return;

    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
    setSelectedPost(null);
    addActivity('Deleted a blog post');
  };

  const handleSavePost = (post: Omit<BlogPost, 'id' | 'date' | 'likes' | 'comments'>) => {
    if (!user?.isOwner) return;

    if (editingPost) {
      // Update existing post
      const updatedPosts = posts.map(p => 
        p.id === editingPost.id 
          ? { ...p, ...post }
          : p
      );
      savePosts(updatedPosts);
      addActivity(`Updated blog post: ${post.title}`);
    } else {
      // Create new post
      const newPost: BlogPost = {
        ...post,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        likes: [],
        comments: []
      };
      savePosts([newPost, ...posts]);
      addActivity(`Published new blog post: ${post.title}`);
    }

    setShowEditor(false);
    setEditingPost(null);
  };

  if (showEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  if (selectedPost) {
    return (
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Blog
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {selectedPost.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedPost.date}
                    </span>
                  </div>
                </div>

                {user?.isOwner && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingPost(selectedPost);
                        setShowEditor(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(selectedPost.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {selectedPost.content}
                </p>
              </div>

              {/* Like and Comment Actions */}
              <div className="flex items-center justify-between border-t dark:border-gray-700 pt-6">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    disabled={!user}
                    className={`flex items-center space-x-2 transition-all ${
                      user && selectedPost.likes.includes(user.id)
                        ? 'text-red-600'
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-600'
                    } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${user && selectedPost.likes.includes(user.id) ? 'fill-current' : ''}`} />
                    <span>{selectedPost.likes.length}</span>
                  </button>
                  
                  <span className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedPost.comments.length}</span>
                  </span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8 border-t dark:border-gray-700 pt-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Comments ({selectedPost.comments.length})
                </h3>

                {/* Add Comment */}
                {user && (
                  <div className="mb-8">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                        <button
                          onClick={() => handleComment(selectedPost.id)}
                          disabled={!newComment.trim()}
                          className="mt-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-800 dark:text-white">
                              {comment.author}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              {t('blogTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('blogDescription')}
            </p>
          </div>

          {user?.isOwner && (
            <button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-red-700 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Heart className={`w-4 h-4 mr-1 ${post.likes.length > 0 ? 'text-red-500' : ''}`} />
                      {post.likes.length}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments.length}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    disabled={!user}
                    className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                      user && post.likes.includes(user.id)
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400'
                    } ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Heart className={`w-4 h-4 ${user && post.likes.includes(user.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              No blog posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.isOwner ? 'Start writing your first blog post!' : 'Check back soon for new content!'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}