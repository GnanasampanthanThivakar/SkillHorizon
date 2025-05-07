import { Link } from "react-router-dom";
import homeImage from "../assets/home.jpg";

export default function HomePage() {
  return (
    <div className="font-sans bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navbar - Minimal and Floating */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              SkillHorizon
            </h1>
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Screen with Floating Elements */}
      <section className="min-h-screen pt-24">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-6rem)]">
          {/* Left Side - Content */}
          <div className="relative p-12 lg:p-24 flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 -z-10"></div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                The Future of Learning
              </div>
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Build Your Digital
                </span>
                <br />
                <span className="text-white">Learning Journey</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                Transform your skills into a stunning digital portfolio.
                Showcase your growth, connect with opportunities, and tell your
                unique story.
              </p>
              <div className="flex gap-6">
                <Link to="/login">
                  <button className="group relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="border border-white/10 text-white px-10 py-4 rounded-full text-lg font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 -z-10"></div>
            <div className="relative h-full flex items-center justify-center">
              {/* Floating Cards */}
              <div className="absolute top-1/4 -left-12 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-emerald-400">10k+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="absolute bottom-1/4 -right-12 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-cyan-400">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              {/* Main Image */}
              <div className="relative w-[500px] h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
                <img
                  src={homeImage}
                  alt="ePortfolio Illustration"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl shadow-emerald-500/10 transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
              Powerful Features for Your Success
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of digital portfolios with our cutting-edge
              features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Visual Resume",
                description:
                  "Create a stunning digital profile that captures attention",
                icon: "🎯",
                gradient: "from-emerald-500 to-cyan-500",
              },
              {
                title: "Learning Showcase",
                description: "Present your work with style and professionalism",
                icon: "✨",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                title: "Skills & Progress",
                description: "Track and visualize your growth journey",
                icon: "📈",
                gradient: "from-blue-500 to-indigo-500",
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Modern Split Layout */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Your Growth Journey
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
                Transform Your Learning Experience
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                SkillHorizon is your digital canvas for documenting
                achievements, connecting skills to real-world impact, and
                crafting your unique story.
              </p>
              <ul className="space-y-4">
                {[
                  "Interactive multimedia showcases",
                  "Professional portfolio builder",
                  "Real-time progress tracking",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
              <div className="relative">
                <iframe
                  className="rounded-3xl w-full h-[400px] shadow-2xl shadow-emerald-500/10"
                  src="https://www.youtube.com/embed/l8rq1Gff06w"
                  title="SkillHorizon Intro Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Modern Design */}
      <footer className="relative py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_50%)]"></div>
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Start Your Journey
          </div>
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8">
            Create Your Digital Portfolio Today
          </h3>
          <Link to="/register">
            <button className="group relative bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
