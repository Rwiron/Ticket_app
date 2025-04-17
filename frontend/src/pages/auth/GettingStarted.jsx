import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { logo, logo2 } from "../../assets";

const GettingStarted = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const issuesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              heroRef.current.classList.add("animate-fadeIn");
            }
            if (entry.target === stepsRef.current) {
              stepsRef.current.classList.add("animate-steps");
            }
            if (entry.target === issuesRef.current) {
              issuesRef.current.classList.add("animate-fade-in");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (stepsRef.current) observer.observe(stepsRef.current);
    if (issuesRef.current) observer.observe(issuesRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (stepsRef.current) observer.unobserve(stepsRef.current);
      if (issuesRef.current) observer.unobserve(issuesRef.current);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Modern Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isScrolled
                    ? "bg-gradient-blue text-white"
                    : "bg-white/20 backdrop-blur-sm"
                }`}
              >
                <img
                  src={logo}
                  alt="MMI Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h1
                className={`ml-2 font-bold text-xl ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                MMI Ticket System
              </h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              {["Features", "How It Works"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`font-medium transition-colors ${
                    isScrolled
                      ? "text-gray-600 hover:text-[#00b2ef]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigation("/login")}
                className={`hidden sm:flex items-center font-medium text-sm transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-[#00b2ef]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <span>Sign In</span>
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleNavigation("/login")}
                className={`${
                  isScrolled
                    ? "bg-[#00b2ef] hover:bg-[#00a2df] text-white"
                    : "bg-white hover:bg-white/90 text-[#00b2ef]"
                } btn-modern px-4 py-2 rounded-full font-medium text-sm shadow-md transition-all`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Super Modern */}
      <div
        ref={heroRef}
        className="relative pt-24 overflow-hidden bg-gradient-blue px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Abstract geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#e8c745]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4xMCIvPjwvZz48L3N2Zz4=')] opacity-5"></div>

          {/* Animated gradient line at top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00b2ef] via-[#e8c745] to-[#0ca74f] animate-gradient-flow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Column - Enhanced Text Content */}
            <div className="w-full lg:w-1/2 transition-all duration-1000 transform space-y-6 sm:space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-card backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                <div className="w-2 h-2 rounded-full bg-[#e8c745] mr-2 animate-pulse"></div>
                <span className="text-white text-sm font-medium">
                  Military Medical Insurance
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
                Modern Ticket System for{" "}
                <span className="relative">
                  <span className="relative z-10 text-[#e8c745]">
                    Efficient
                  </span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#e8c745]/20 rounded-lg -z-10 transform skew-x-3"></span>
                </span>{" "}
                IT Support
              </h1>

              <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed">
                A secure platform to create, assign, and track tickets across
                your entire organization. Simplify your workflows and resolve
                issues faster.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-5 pt-4">
                <button
                  onClick={() => handleNavigation("/login")}
                  className="btn-modern flex items-center justify-center px-6 py-3 bg-white text-[#00b2ef] rounded-full font-medium shadow-lg hover:shadow-xl transition-all group"
                >
                  <span>Get Started</span>
                  <svg
                    className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleNavigation("/demo")}
                  className="btn-modern flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>View Demo</span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 sm:pt-10">
                <p className="text-white/60 text-sm mb-4">
                  Trusted by leading Security organizations
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                  {["RDF", "NISS", "RIB", "RCS", "RNP"].map((org) => (
                    <div
                      key={org}
                      className="h-8 bg-white/10 backdrop-blur-sm rounded-md px-3 flex items-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/50 mr-2"></div>
                      <span className="text-white/80 text-sm font-medium">
                        {org}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Image with 3D effects */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none perspective-1000">
                {/* Main image with enhanced 3D effects */}
                <div className="relative rounded-xl overflow-hidden transform rotateY-3 shadow-[0_20px_50px_rgba(8,112,184,0.4)] animate-float">
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 z-10"></div>

                  {/* Highlight edge */}
                  <div className="absolute inset-0 border border-white/30 rounded-xl z-20"></div>

                  <img
                    src={logo2}
                    alt="MMI Ticket System Dashboard"
                    className="relative z-0 w-full h-auto object-cover rounded-xl"
                  />

                  {/* Bottom glass effect */}
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-5 -bottom-5 bg-white backdrop-blur-xl rounded-xl p-3 shadow-lg animate-pulse-slow">
                  <div className="h-14 w-14 rounded-lg bg-gradient-blue flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stats indicator - Only show on larger screens */}
                <div className="absolute -left-4 top-1/3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg hidden md:flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-[#e8c745]/20 flex items-center justify-center text-[#e8c745] mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#00b2ef] text-xs font-bold">
                      RESPONSE TIME
                    </p>
                    <p className="text-gray-800 text-sm font-medium">
                      -40% Faster
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Cards */}
      <div
        id="features"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-[#00b2ef] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-[#0ca74f] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#00b2ef]/10 mb-4">
              <span className="text-[#00b2ef] text-sm font-semibold">
                Powerful Capabilities
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-800">
              Features Designed for{" "}
              <span className="text-gradient-blue">Military Medical IT</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our ticket management system provides all the tools you need to
              manage technical support requests efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover-card-lift border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#00b2ef]/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#00b2ef]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-800">
                  Real-time Tracking
                </h3>
              </div>
              <p className="text-gray-600">
                Monitor ticket status, response times, and resolution progress
                in real-time with comprehensive dashboards.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Status updates",
                  "Performance metrics",
                  "SLA monitoring",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-[#0ca74f]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover-card-lift border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#e8c745]/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#e8c745]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-800">
                  Military-Grade Security
                </h3>
              </div>
              <p className="text-gray-600">
                Enterprise-level security features to protect sensitive military
                medical information from unauthorized access.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "End-to-end encryption",
                  "Role-based access",
                  "Audit logging",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-[#0ca74f]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover-card-lift border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#0ca74f]/10 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#0ca74f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-800">
                  Automated Workflows
                </h3>
              </div>
              <p className="text-gray-600">
                Streamline support processes with customizable automated
                workflows and intelligent ticket routing.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Smart assignments",
                  "Escalation rules",
                  "Notification system",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-[#0ca74f]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature highlight */}
          <div className="mt-16 sm:mt-24 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00b2ef]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0ca74f]/5 rounded-full blur-3xl"></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

              <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 mb-6">
                    <span className="text-white text-sm font-semibold">
                      Premium Feature
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Advanced Analytics Dashboard
                  </h3>
                  <p className="text-white/80 mb-8">
                    Gain deep insights into your support operations with our
                    powerful analytics tools. Track performance, identify
                    bottlenecks, and optimize resource allocation.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Real-time performance monitoring",
                      "Custom report builder",
                      "Predictive trend analysis",
                      "Team performance metrics",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-white/70">
                        <svg
                          className="w-5 h-5 mr-2 text-[#e8c745] mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleNavigation("/features")}
                    className="btn-modern flex items-center self-start text-sm px-5 py-3 rounded-lg bg-white text-gray-900 hover:bg-[#e8c745] transition-colors shadow-lg"
                  >
                    <span>Explore Analytics</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00b2ef] via-[#0ca74f] to-[#e8c745] rounded-xl blur opacity-30"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-1">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-[#e8c745]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#0ca74f]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#00b2ef]"></div>
                        </div>
                        <div className="text-white/50 text-xs">
                          Analytics Dashboard
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-medium">
                              Ticket Resolution Time
                            </div>
                            <div className="text-[#0ca74f]">-18%</div>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[72%] bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] rounded-full"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-white/70 text-sm mb-1">
                              Open Tickets
                            </div>
                            <div className="text-white text-xl font-bold">
                              42
                            </div>
                            <div className="text-[#e8c745] text-xs">
                              +5 today
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-white/70 text-sm mb-1">
                              Avg. Response
                            </div>
                            <div className="text-white text-xl font-bold">
                              1.4h
                            </div>
                            <div className="text-[#0ca74f] text-xs">
                              -20 min
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-3 space-y-2">
                          <div className="text-white font-medium">
                            Top Categories
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-white/70">Network Issues</div>
                            <div className="text-white">38%</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-white/70">Software Access</div>
                            <div className="text-white">27%</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-white/70">
                              Hardware Support
                            </div>
                            <div className="text-white">19%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Modern */}
      <div
        id="how-it-works"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
      >
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4yMDQiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#e8c745]/10 mb-4">
              <span className="text-[#e8c745] text-sm font-semibold">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-800">
              How Our <span className="text-gradient-blue">Ticket System</span>{" "}
              Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our streamlined process makes reporting and resolving IT issues
              simple and efficient.
            </p>
          </div>

          <div ref={stepsRef} className="relative">
            {/* Process steps with modern design */}
            <div className="hidden md:block absolute top-36 left-0 right-0 h-1 bg-gradient-to-r from-[#00b2ef] via-[#0ca74f] to-[#e8c745] rounded-full z-0 opacity-30"></div>
            <div className="hidden md:block absolute top-36 left-0 right-0 h-1 bg-gray-200 rounded-full z-0">
              <div className="progress-line h-full w-0 bg-gradient-to-r from-[#00b2ef] via-[#0ca74f] to-[#e8c745] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center step">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#00b2ef] blur-md opacity-20 rounded-2xl transform -rotate-6"></div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-blue rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Report Issue
                </h3>
                <p className="text-gray-600">
                  Submit detailed information about technical problems or
                  service disruptions.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center step">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#e8c745] blur-md opacity-20 rounded-2xl transform -rotate-6"></div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-gold rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Assign & Prioritize
                </h3>
                <p className="text-gray-600">
                  Issues are routed to the appropriate IT team based on
                  severity.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center step">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#0ca74f] blur-md opacity-20 rounded-2xl transform -rotate-6"></div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-green rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Track Resolution
                </h3>
                <p className="text-gray-600">
                  Monitor status updates and progress as technicians work on the
                  issue.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center step">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#00b2ef] blur-md opacity-20 rounded-2xl transform -rotate-6"></div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-blue rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Problem Solved
                </h3>
                <p className="text-gray-600">
                  Verify resolution and document solutions for future reference.
                </p>
              </div>
            </div>
          </div>

          {/* Process highlights in cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {/* Card 1 */}
            <div className="hover-card-lift bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00b2ef]/5 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3"></div>

              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00b2ef]/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#00b2ef]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800">
                  Fast Response Time
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Our system automatically assigns tickets to available
                technicians, reducing response time by up to 40%.
              </p>

              <div className="flex items-center pt-2 mt-auto">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#00b2ef]/10 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-[#00b2ef]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  Average first response: 15 minutes
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hover-card-lift bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0ca74f]/5 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"></div>

              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0ca74f]/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#0ca74f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800">
                  Secure Communications
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                All ticket data is encrypted and compliant with military-grade
                security standards to protect sensitive information.
              </p>

              <div className="flex items-center pt-2 mt-auto">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#0ca74f]/10 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-[#0ca74f]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  HIPAA & NIST 800-171 compliant
                </span>
              </div>
            </div>
          </div>

          {/* Workflow visualization */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00b2ef]/5 to-[#0ca74f]/5 rounded-3xl"></div>
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  Simplified Workflow Visualization
                </h3>
                <p className="text-gray-600 mt-2">
                  See how tickets flow through our system from creation to
                  resolution
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00b2ef] via-[#e8c745] to-[#0ca74f] transform -translate-y-1/2 z-0"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between">
                      {/* Stage 1 */}
                      <div className="flex flex-col items-center mb-8 md:mb-0">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#00b2ef]">
                          <svg
                            className="w-8 h-8 text-[#00b2ef]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </div>
                        <div className="text-center mt-4">
                          <h4 className="font-semibold text-gray-800">
                            Create
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            User submits ticket
                          </p>
                        </div>
                      </div>

                      {/* Stage 2 */}
                      <div className="flex flex-col items-center mb-8 md:mb-0">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#e8c745]">
                          <svg
                            className="w-8 h-8 text-[#e8c745]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-center mt-4">
                          <h4 className="font-semibold text-gray-800">
                            Assign
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            Route to technician
                          </p>
                        </div>
                      </div>

                      {/* Stage 3 */}
                      <div className="flex flex-col items-center mb-8 md:mb-0">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#0ca74f]">
                          <svg
                            className="w-8 h-8 text-[#0ca74f]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-center mt-4">
                          <h4 className="font-semibold text-gray-800">
                            Resolve
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            Fix the issue
                          </p>
                        </div>
                      </div>

                      {/* Stage 4 */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#00b2ef]">
                          <svg
                            className="w-8 h-8 text-[#00b2ef]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-center mt-4">
                          <h4 className="font-semibold text-gray-800">
                            Complete
                          </h4>
                          <p className="text-gray-500 text-sm mt-1">
                            Verify solution
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        ref={testimonialsRef}
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-[#e8c745] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-[#00b2ef] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#0ca74f]/10 mb-4">
              <span className="text-[#0ca74f] text-sm font-semibold">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-gray-800">
              What Our <span className="text-gradient-blue">Clients</span> Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover how our ticket system has transformed IT support across
              military medical facilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#00b2ef]/5 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3"></div>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#00b2ef]/10 flex items-center justify-center mr-4">
                  <span className="text-[#00b2ef] font-bold text-lg">JD</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Peter Kazadi</h4>
                  <p className="text-gray-600 text-sm">
                    IT Director, Base Hospital
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex text-[#e8c745] mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  "This ticket system has drastically reduced our response times
                  and improved coordination between departments. The security
                  features give us peace of mind when handling sensitive data."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#0ca74f] font-medium">
                  <span className="font-bold">94% </span>
                  <span className="text-gray-500">
                    decrease in resolution time
                  </span>
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#0ca74f]/5 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"></div>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#0ca74f]/10 flex items-center justify-center mr-4">
                  <span className="text-[#0ca74f] font-bold text-lg">JS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Jane Smith</h4>
                  <p className="text-gray-600 text-sm">
                    Support Manager, Medical Wing
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex text-[#e8c745] mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  "The analytics dashboard helps us identify common issues and
                  proactively address them. Our staff productivity has improved
                  significantly since implementation."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#0ca74f] font-medium">
                  <span className="font-bold">78% </span>
                  <span className="text-gray-500">
                    improvement in team efficiency
                  </span>
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#e8c745]/5 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3"></div>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#e8c745]/10 flex items-center justify-center mr-4">
                  <span className="text-[#e8c745] font-bold text-lg">RB</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Robert Brown</h4>
                  <p className="text-gray-600 text-sm">
                    CIO, Military Medical Center
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex text-[#e8c745] mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  "The security compliance features have been crucial for our
                  organization. Integration with our existing systems was
                  seamless, and the ROI has been substantial."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#0ca74f] font-medium">
                  <span className="font-bold">65% </span>
                  <span className="text-gray-500">
                    reduction in operational costs
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div
            ref={ctaRef}
            className="mt-16 bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] rounded-2xl p-8 sm:p-10 relative overflow-hidden opacity-100"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4xMCIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative z-10 md:flex items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Ready to transform your IT support?
                </h3>
                <p className="text-white/80 max-w-xl">
                  Join the growing network of military medical facilities using
                  our system to improve efficiency and security.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNavigation("/demo")}
                  className="btn-modern px-6 py-3 bg-white text-[#00b2ef] rounded-lg font-medium hover:bg-[#e8c745] hover:text-white transition-colors shadow-lg"
                >
                  Schedule a Demo
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="btn-modern px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Super Modern */}
      <footer className="bg-gray-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#00b2ef] to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#0ca74f] to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Column 1 - Logo & description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/5">
                  <img
                    src={logo}
                    alt="MMI Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  MMI Tickets
                </h3>
              </div>
              <p className="text-gray-400 max-w-xs">
                Military Medical Insurance ticket management platform. Secure,
                efficient technical support for your organization.
              </p>
              <div className="flex space-x-5">
                {["#", "#", "#"].map((href, i) => (
                  <a
                    key={i}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links columns */}
            {[
              {
                title: "Product",
                links: ["Features", "Security", "Enterprise", "Pricing"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Training", "Case Studies", "Support"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Blog"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-6 text-white">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                      >
                        <svg
                          className="w-3 h-3 mr-2 text-[#00b2ef]"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path
                            d="M10.5 6L6 10.5 7.5 12 13.5 6 7.5 0 6 1.5z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Military Medical Insurance.
                All rights reserved.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GettingStarted;
