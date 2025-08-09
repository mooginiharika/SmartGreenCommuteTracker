import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Trophy, Flame, UserPlus, UserMinus } from 'lucide-react';
import { Post, Comment, User } from '../types';

interface SocialFeedProps {
  user: User;
}

function SocialFeed({ user }: SocialFeedProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Chen',
      userAvatar: '',
      content: 'Just completed my 7-day green commute streak! 🌱 Biked to campus every day this week and saved 12.5 kg of CO₂. Feeling great about making a difference!',
      likes: 24,
      comments: [
        {
          id: '1',
          userId: '3',
          userName: 'Marcus Rodriguez',
          content: 'Amazing work Sarah! Keep it up! 🚴‍♀️',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        }
      ],
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      type: 'achievement'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Marcus Rodriguez',
      userAvatar: '',
      content: 'Reached Level 5 today! 🎉 Thanks to everyone in our campus community for the motivation. Together we\'ve saved over 500kg of CO₂ this month!',
      likes: 18,
      comments: [],
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      type: 'milestone'
    },
    {
      id: '3',
      userId: '4',
      userName: 'Emma Thompson',
      userAvatar: '',
      content: 'Beautiful morning for a walk to campus! 🌅 The fresh air and exercise is the perfect way to start the day. Plus, I\'m contributing to a cleaner environment!',
      likes: 12,
      comments: [
        {
          id: '2',
          userId: '1',
          userName: 'Alex Johnson',
          content: 'Love the positive energy! Walking is so underrated 🚶‍♀️',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        }
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: 'general'
    }
  ]);

  const [following, setFollowing] = useState<string[]>(['2', '3']);
  const [newComment, setNewComment] = useState<{ [postId: string]: string }>({});

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: commentText,
      timestamp: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const handleFollow = (userId: string) => {
    setFollowing(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getPostIcon = (type: Post['type']) => {
    switch (type) {
      case 'achievement': return Trophy;
      case 'milestone': return Flame;
      default: return Users;
    }
  };

  const getPostColor = (type: Post['type']) => {
    switch (type) {
      case 'achievement': return 'from-yellow-500 to-orange-600';
      case 'milestone': return 'from-purple-500 to-pink-600';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Feed</h2>
        <p className="text-gray-600">See what your eco-warriors are achieving!</p>
      </div>

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Campus Community
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-green-100 text-sm">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3,892 kg</div>
            <div className="text-green-100 text-sm">CO₂ Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-green-100 text-sm">Achievements</div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const PostIcon = getPostIcon(post.type);
          const colorClass = getPostColor(post.type);
          const isFollowing = following.includes(post.userId);

          return (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {post.userName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                      <div className={`w-6 h-6 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center`}>
                        <PostIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</p>
                  </div>
                </div>
                {post.userId !== user.id && (
                  <button
                    onClick={() => handleFollow(post.userId)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      isFollowing
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isFollowing ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6 mb-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="space-y-3 mb-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {comment.userName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{comment.userName}</span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium">
          Load More Posts
        </button>
      </div>
    </div>
  );
}

export default SocialFeed;