import React, { useEffect, useState, useCallback } from "react";
import Navigation from "../components/user/Navigation";
import UserProfile from "../components/user/UserProfile";
import CreatePost from "../components/user/CreatePost";
import NetworksFilter from "../components/user/NetworksFilter";
import FeedSettings from "../components/user/FeedSettings";
import Post from "../components/user/Post";
import CourseMenu from "../components/user/CourseMenu";
import Footer from "../components/user/Footer";
import API from "../api/axios";
import { toast } from "react-toastify";

const Index = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 10;

  // Utility function to get user ID
  const getUserId = (userObj) =>
    userObj?._id ||
    userObj?.id ||
    (typeof userObj === "string" ? userObj : null);

  // Initial data fetching
  const fetchInitialData = async () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      const token = localStorage.getItem("token");
      if (!savedUser || !token) {
        toast.error("User not authenticated");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const userId = savedUser._id || savedUser.id;

      // Fetch user data and following list in parallel
      const [userRes, followingRes] = await Promise.all([
        API.get(`/auth/users/${userId}`, config),
        API.get(`/auth/following/${userId}`, config),
      ]);

      // Update user state
      setUser({
        id: userRes.data._id || userRes.data.id,
        name: userRes.data.name || "Unknown User",
        username: userRes.data.username || "username",
        profileImage: userRes.data.profileImage || null,
        points: userRes.data.points || 0,
        country: userRes.data.country || null,
        isMember: userRes.data.isMember || false,
      });

      // Update following state
      setFollowing(
        new Set((followingRes.data || []).filter(Boolean).map(getUserId))
      );

      // Fetch initial posts
      await fetchPosts(1);
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts for infinite scroll
  const fetchPosts = async (pageNum) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await API.get(
        `/auth/posts?page=${pageNum}&limit=${postsPerPage}`,
        config
      );

      // Update posts state
      setPosts((prev) => (pageNum === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === postsPerPage);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to load posts");
    }
  };

  // Fetch following list
  const fetchFollowing = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = user?.id;
      if (!token || !userId) return;

      const { data } = await API.get(`/auth/following/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update following state
      setFollowing(new Set((data || []).filter(Boolean).map(getUserId)));
    } catch (err) {
      console.error("Error fetching following list:", err);
      toast.error("Failed to load following list");
    }
  };

  // Effects
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Handle new post creation
  const handlePostCreated = useCallback((newPost) => {
    setPosts((prev) => {
      if (
        prev.some(
          (post) => (post._id || post.id) === (newPost._id || newPost.id)
        )
      ) {
        return prev;
      }
      return [newPost, ...prev];
    });
  }, []);

  // Handle follow/unfollow actions
  const handleFollowToggle = useCallback((userId, follow) => {
    setFollowing((prev) => {
      const updated = new Set(prev);
      follow ? updated.add(userId) : updated.delete(userId);
      return updated;
    });
  }, []);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      setLoading(true);
      fetchPosts(page + 1);
    }
  }, [hasMore, loading, page]);

  // Add/remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Skeleton loading component
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6">
      {Array(3)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/2" />
                <div className="h-3 bg-white/10 rounded w-1/3" />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
            </div>
            <div className="mt-6 h-48 bg-white/10 rounded-xl" />
            <div className="mt-6 flex gap-4">
              <div className="h-9 w-24 bg-white/10 rounded-xl" />
              <div className="h-9 w-24 bg-white/10 rounded-xl" />
            </div>
          </div>
        ))}
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white">
      {/* Enhanced Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
            <Navigation />
          </div>
        </div>
      </div>

      <div className="pt-24 pb-10">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Hero Section */}
          {user && (
            <div className="mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-xl mb-4">
                      <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                        Welcome to SkillHorizon
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                        Welcome back,
                      </span>
                      <br />
                      <span className="text-white">{user.name}!</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                      Share your thoughts, connect with others, and continue
                      your learning journey with our community.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                      <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200 font-medium">
                        Create Post
                      </button>
                      <button className="px-8 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 p-[2px] transform hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-2xl bg-black overflow-hidden">
                        <img
                          src={user.profileImage || "/assets/avatar.png"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-1.5">
                      <div className="bg-black rounded-lg px-4 py-2 text-sm font-medium">
                        {user.points} pts
                      </div>
                    </div>
                    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-1.5">
                      <div className="bg-black rounded-lg px-4 py-2 text-sm font-medium">
                        {user.isMember ? "Premium" : "Member"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="col-span-3 space-y-6">
              {/* Quick Stats */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4">
                  Quick Stats
                </h3>
                <div className="grid  gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-2xl font-bold text-rose-400">24</p>
                    <p className="text-sm text-gray-400">Posts</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-2xl font-bold text-orange-400">156</p>
                    <p className="text-sm text-gray-400">Followers</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-2xl font-bold text-rose-400">89</p>
                    <p className="text-sm text-gray-400">Following</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-2xl font-bold text-orange-400">12</p>
                    <p className="text-sm text-gray-400">Courses</p>
                  </div>
                </div>
              </div>

              {/* Course Menu */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 sticky top-24">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4 pb-3 border-b border-white/5">
                  Course Menu
                </h3>
                <CourseMenu />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-6 space-y-6">
              {/* Create Post */}
              {user ? (
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 p-[2px]">
                      <div className="w-full h-full rounded-xl bg-black overflow-hidden">
                        <img
                          src={user.profileImage || "/assets/avatar.png"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                        What's on your mind?
                      </h2>
                    </div>
                  </div>
                  <CreatePost
                    avatarInitials={user.name?.[0] || "U"}
                    onPostCreated={handlePostCreated}
                    user={user}
                  />
                </div>
              ) : (
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 animate-pulse h-24" />
              )}

              {/* Filters */}
              <div className="grid  gap-4">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/5">
                  <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-3">
                    Feed Preferences
                  </h3>
                  <FeedSettings />
                </div>

                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/5">
                  <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-3">
                    Network Filters
                  </h3>
                  <NetworksFilter />
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {loading && page === 1 ? (
                  renderSkeleton()
                ) : posts.length > 0 ? (
                  posts.map((post) => {
                    const postUserId = getUserId(post.user);
                    return (
                      <div
                        key={post._id || post.id}
                        className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
                      >
                        <Post
                          user={user}
                          post={post}
                          isFollowing={following.has(postUserId)}
                          updateFollowingState={handleFollowToggle}
                          refreshFollowing={fetchFollowing}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/5">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 text-xl font-semibold mb-2">
                      No posts yet
                    </div>
                    <p className="text-gray-400">
                      Start sharing your thoughts with the community!
                    </p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200">
                      Create Your First Post
                    </button>
                  </div>
                )}

                {loading && page > 1 && (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-rose-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3 space-y-6">
              {/* Trending Section */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 sticky top-24">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4 pb-3 border-b border-white/5">
                  Trending Now
                </h3>
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="group">
                      <div className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors duration-200">
                        <span className="text-gray-400 font-medium text-sm mt-0.5">
                          {item}.
                        </span>
                        <div>
                          <p className="font-medium text-white group-hover:text-rose-400 transition-colors duration-200">
                            Trending Topic {item}
                          </p>
                          <p className="text-sm text-gray-400 mt-1 flex items-center">
                            {(item * 1.5).toFixed(1)}k posts
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200 flex items-center justify-center">
                  Show more trends
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Who to Follow */}
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 sticky top-[400px]">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4 pb-3 border-b border-white/5">
                  Who to Follow
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {item}
                        </div>
                        <div>
                          <p className="font-medium text-white">User {item}</p>
                          <p className="text-sm text-gray-400">@user{item}</p>
                        </div>
                      </div>
                      <button className="text-xs font-medium px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors duration-200 transform hover:scale-105">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors duration-200 flex items-center justify-center">
                  View more suggestions
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-black/40 backdrop-blur-xl border-t border-white/5 py-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Index);
