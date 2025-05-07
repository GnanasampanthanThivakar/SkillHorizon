import { useState, useEffect } from "react";
import API from "../api/axios";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [bio, setBio] = useState(
    "Write something about yourself here, such as academic and career goals and your hobbies. Use hashtags to label your skills, experiences and competencies, for example, #Teaching, #PublicSpeaking, #Java."
  );
  const [tagline, setTagline] = useState("Write a tagline here.");
  const [skills, setSkills] = useState(["Developer"]);
  const [newSkill, setNewSkill] = useState("");
  const [user, setUser] = useState(null);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const userId = savedUser?._id || savedUser?.id;
    if (savedUser?.id) {
      API.get(`/auth/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("coverImage", file);
    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const res = await API.post(`/auth/users/${userId}/cover`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const sectionVisible = (tabName) =>
    activeTab === null || activeTab === tabName;

  if (!user)
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-pulse"></div>
          <span className="text-xl text-rose-400">Loading profile...</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                SH
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                SkillHorizon
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Courses", "Search"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-300 hover:text-rose-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
            <button className="md:hidden text-gray-300 hover:text-rose-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header - New Design */}
          <div className="relative mb-12">
            {/* Cover Image with Gradient Overlay */}
            <div className="h-[400px] rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20"></div>
              <input
                type="file"
                id="coverUpload"
                accept="image/*"
                hidden
                onChange={handleCoverUpload}
              />
              <button
                onClick={() => document.getElementById("coverUpload").click()}
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm hover:bg-black/60 px-4 py-2 rounded-xl text-sm text-white font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add cover</span>
              </button>
            </div>

            {/* Profile Info - Floating Card */}
            <div className="absolute -bottom-20 left-8 right-8">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <img
                      src="/assets/avatar.png"
                      alt="avatar"
                      className="w-32 h-32 rounded-2xl border-4 border-black/40 shadow-xl transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 right-0 bg-gradient-to-r from-rose-500 to-orange-500 w-10 h-10 rounded-xl border-2 border-black/40 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-2.828 0l-2-2a2 2 0 012.828-2.828l8 8a2 2 0 012.828 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-3">
                      <h2 className="text-3xl font-bold text-white truncate">
                        {user.name}
                      </h2>
                      <span className="text-lg">🇱🇰</span>
                      <button className="text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors">
                        Edit Profile
                      </button>
                    </div>

                    <p className="text-sm text-rose-400 hover:text-rose-300 cursor-pointer transition-colors inline-flex items-center mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-1 1v1a1 1 0 002 0V7a1 1 0 00-1-1zm2-3a1 1 0 011-1h.01a1 1 0 110 2H11a1 1 0 01-1-1zM5 7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2H5zm10 12H5a1 1 0 01-1-1v-6a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      + Add headline
                    </p>

                    <div className="text-sm text-gray-400 mt-2 flex flex-wrap gap-3">
                      <a
                        href="#"
                        className="hover:text-rose-400 transition-colors"
                      >
                        {user.email}
                      </a>
                      <span>📅 Joined {user.date}</span>
                      <span>⏱ Last Visit: now</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      {[
                        "Public View",
                        "Privacy Settings",
                        "Profile Views",
                        "Link Websites",
                      ].map((text, idx) => (
                        <button
                          key={idx}
                          className="text-rose-400 hover:text-rose-300 transition-colors hover:underline"
                        >
                          {text}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-8 mt-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-rose-400">101</p>
                        <p className="text-xs text-gray-400">Connections</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-rose-400">0</p>
                        <p className="text-xs text-gray-400">Following</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-rose-400">0</p>
                        <p className="text-xs text-gray-400">Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                  <div className="p-5 border-b border-white/5">
                    <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-rose-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Profile Menu
                    </h2>
                  </div>
                  <ul className="p-3 space-y-1">
                    {[
                      { id: null, name: "All Sections", icon: "📊" },
                      { id: "about", name: "About", icon: "ℹ️" },
                      { id: "skills", name: "Skills", icon: "🛠️" },
                      { id: "documents", name: "Documents", icon: "📄" },
                      { id: "showcases", name: "Showcases", icon: "🎨" },
                      {
                        id: "recommendations",
                        name: "Recommendations",
                        icon: "🌟",
                      },
                      { id: "posts", name: "Posts", icon: "📢" },
                    ].map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                            activeTab === item.id
                              ? "bg-rose-500/10 text-rose-400 font-semibold"
                              : "text-gray-400 hover:bg-white/5 hover:text-rose-400"
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span className="text-sm">{item.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 space-y-6">
              {/* About Section */}
              {sectionVisible("about") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-6 border-b border-white/5 pb-3">
                    About
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          className="w-full p-3 bg-black/40 border border-white/5 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 text-white"
                          rows="6"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 bg-black/40 border border-white/5 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 text-white"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                        />
                      </div>

                      <div className="pt-4">
                        <h4 className="font-semibold text-gray-300 mb-3">
                          Resume & Transcript
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upload Resume
                          </button>
                          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upload Transcript
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-3">
                          Autofill enabled from resume uploads. Review and edit
                          content if needed.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-300 mb-3">
                          Video Bio
                        </h4>
                        <div className="border-2 border-dashed border-white/5 rounded-xl p-6 text-center hover:border-rose-500 transition-colors duration-200">
                          <div className="text-5xl text-rose-400 mb-2">🎥</div>
                          <p className="text-sm text-gray-400">
                            Drag and drop video file here
                          </p>
                          <button className="mt-3 text-sm text-rose-400 hover:text-rose-300">
                            Choose file
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-300 mb-3">
                          Basic Information
                        </h4>
                        <div className="space-y-3">
                          <p>
                            <span className="font-medium text-gray-400">
                              Email:
                            </span>
                            <span className="ml-2 text-white">
                              {user.email}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-gray-400">
                              Country/Region:
                            </span>
                            <span className="ml-2 text-white">
                              Sri Lanka 🇱🇰
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-gray-400">
                              Field of Study:
                            </span>
                            <span className="ml-2 text-white">
                              {user.profession || "Not specified"}
                            </span>
                          </p>
                          <div className="pt-3 border-t border-white/5">
                            <h5 className="font-medium text-gray-300 mb-2">
                              Career Goals
                            </h5>
                            <p className="text-sm text-gray-400 italic">
                              Not filled yet
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {sectionVisible("skills") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-6 border-b border-white/5 pb-3">
                    Skills
                  </h3>
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 p-3 bg-black/40 border border-white/5 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 text-white"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-rose-500/10 text-rose-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-rose-500/20 transition-colors duration-200 cursor-pointer"
                        >
                          {skill}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Section */}
              {sectionVisible("documents") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-6 border-b border-white/5 pb-3">
                    Documents
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Upload your resume, certificates, transcripts and work
                    samples here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upload Resume
                    </button>
                    <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upload Transcript
                    </button>
                  </div>
                </div>
              )}

              {/* Showcases Section */}
              {sectionVisible("showcases") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 border-b border-white/5 pb-3">
                      Showcases
                    </h3>
                    <button className="text-sm text-rose-400 hover:text-rose-300 transition-colors">
                      Change Title
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-8">
                    Add showcases to present your experiences and competencies
                    in detail. For example, document a project, internship, or
                    service experience. Each showcase has its unique URL and
                    visibility setting.
                  </p>
                  <div className="border-2 border-dashed border-rose-500/20 rounded-xl p-10 text-center bg-rose-500/5 hover:bg-rose-500/10 cursor-pointer transition-colors duration-300">
                    <div className="text-6xl text-rose-400 mb-3">+</div>
                    <p className="font-bold text-white text-lg">
                      Add New Showcase
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      First, create a summary card. Then add detailed sections.
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-rose-400 hover:text-rose-300 transition-colors cursor-pointer">
                    + Sort Showcases
                  </div>
                </div>
              )}

              {/* Recommendations Section */}
              {sectionVisible("recommendations") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 border-b border-white/5 pb-3">
                      Recommendations
                    </h3>
                    <button className="text-sm text-rose-400 hover:text-rose-300 transition-colors">
                      Change Title
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                    This section displays recommendations or compliments you
                    have received from others. Use the button below to request
                    recommendations from your faculty, academic advisors,
                    classmates, and supervisors who can speak to your strengths.
                  </p>
                  <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-200 text-sm flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Request a Recommendation
                  </button>
                  <p className="text-sm text-gray-400 mt-8 text-center">
                    No Recommendations Received
                  </p>

                  <div className="mt-10">
                    <h4 className="font-bold text-lg text-white mb-4">
                      Sections You May Want To Add:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      {[
                        "Overview",
                        "Expertise",
                        "Badge",
                        "Experience",
                        "Education",
                        "Courses",
                        "Research",
                        "Publications",
                        "Grants",
                        "Awards",
                        "Tweets",
                        "Custom",
                      ].map((section, idx) => (
                        <div
                          key={idx}
                          className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center transition-all duration-300 hover:border-rose-500/50 hover:bg-rose-500/5"
                        >
                          <div className="text-3xl mb-2">📄</div>
                          <p className="text-sm font-medium text-gray-300">
                            {section}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Posts Section */}
              {sectionVisible("posts") && (
                <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 border-b border-white/5 pb-3">
                      My SkillHorizon Posts
                    </h3>
                    <button className="text-sm text-rose-400 hover:text-rose-300 transition-colors">
                      Change Title
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Below are posts that you have added to your public
                    SkillHorizon profile.
                  </p>
                  <div className="border border-white/5 p-6 rounded-xl text-center text-gray-400 text-sm bg-black/20">
                    You haven't added any posts to your public SkillHorizon
                    profile.
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
