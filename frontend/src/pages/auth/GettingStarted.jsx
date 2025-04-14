import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { support } from "../../assets";

const GettingStarted = () => {
  const [isVisible, setIsVisible] = useState(false);
  const stepsRef = useRef(null);
  const issuesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === stepsRef.current) {
              stepsRef.current.classList.add("animate-steps");
            }
            if (entry.target === issuesRef.current) {
              issuesRef.current.classList.add("animate-fade-in");
            }
            if (entry.target === testimonialsRef.current) {
              testimonialsRef.current.classList.add("animate-fade-in");
            }
            if (entry.target === ctaRef.current) {
              ctaRef.current.classList.add("animate-fade-in");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (stepsRef.current) observer.observe(stepsRef.current);
    if (issuesRef.current) observer.observe(issuesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (stepsRef.current) observer.unobserve(stepsRef.current);
      if (issuesRef.current) observer.unobserve(issuesRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - Modernized */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#00b2ef] via-[#0080c8] to-[#006cb0] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Background Patterns - Updated for modern global feel */}
        <div className="absolute inset-0">
          {/* World map pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMiI+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSIzMDAiLz48L2c+PC9zdmc+')] opacity-10"></div>

          {/* Network/connection lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4yMDQiLz48cGF0aCBkPSJNMzAgMGMyLjc2NCAwIDUgMi4yMzYgNSA1cy0yLjIzNiA1LTUgNS01LTIuMjM2LTUtNSAyLjIzNi01IDUtNXptMCA1MEMyNy4yMzYgNTAgMjUgNDcuNzY0IDI1IDQ1czIuMjM2LTUgNS01IDUgMi4yMzYgNSA1LTIuMjM2IDUtNSA1ek01MCAxMGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXptMCA0MGMyLjc2NCAwIDUtMi4yMzYgNS01cy0yLjIzNi01LTUtNS01IDIuMjM2LTUgNSAyLjIzNiA1IDUgNXpNMTAgNTBjMi43NjQgMCA1LTIuMjM2IDUtNXMtMi4yMzYtNS01LTUtNSAyLjIzNi01IDVjMCAyLjc2NCAyLjIzNiA1IDUgNXptMC00MGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjQwOCIvPjxwYXRoIGQ9Ik0zMCAwYzIuNzY0IDAgNSAyLjIzNiA1IDVzLTIuMjM2IDUtNSA1LTUtMi4yMzYtNS01IDIuMjM2LTUgNS01em0wIDUwYy0yLjc2NCAwLTUtMi4yMzYtNS01czIuMjM2LTUgNS01IDUgMi4yMzYgNSA1LTIuMjM2IDUtNSA1ek01MCAxMGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXptMCA0MGMyLjc2NCAwIDUtMi4yMzYgNS01cy0yLjIzNi01LTUtNS01IDIuMjM2LTUgNSAyLjIzNiA1IDUgNXpNMTAgNTBjMi43NjQgMCA1LTIuMjM2IDUtNXMtMi4yMzYtNS01LTUtNSAyLjIzNi01IDVjMCAyLjc2NCAyLjIzNiA1IDUgNXptMC00MGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIuMTAyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          </div>

          {/* Light effects */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#e8c745]/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10">
            {/* Left Column - Text Content */}
            <div
              className={`w-full lg:w-1/2 transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
                <div className="w-2 h-2 rounded-full bg-[#e8c745] mr-2 animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm font-medium">
                  Military Medical Insurance
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
                Modern Ticket System for{" "}
                <span className="text-[#e8c745]">Efficient</span> IT Support
              </h1>
              <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg">
                A secure platform to create, assign, and track tickets across
                your entire organization. Simplify your workflows and resolve
                issues faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  title="Get Started"
                  onClick={() => handleNavigation("/login")}
                  buttonBg="bg-white text-[#00b2ef]"
                />
                <Button
                  title="View Demo"
                  onClick={() => handleNavigation("/demo")}
                  buttonBg="bg-transparent border-2 border-white text-white"
                />
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              className={`w-full lg:w-1/2 mt-10 lg:mt-0 transition-all duration-1000 transform delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Modern floating effect with subtle shadow */}
                <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(8,112,184,0.3)] animate-float">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00b2ef]/20 to-transparent z-10 mix-blend-overlay"></div>
                  <img
                    src={support}
                    alt="MMI Ticket System Dashboard"
                    className="relative z-0 w-full h-auto object-cover rounded-xl"
                  />
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20"></div>
                </div>

                {/* Feature indicator */}
                <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 bg-white/90 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-lg">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg bg-gradient-to-br from-[#00b2ef] to-[#0080c8] flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-8 sm:w-8"
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

      {/* Features Section - Improved responsiveness */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-[#00b2ef] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-[#0ca74f] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] bg-clip-text text-transparent text-xs sm:text-sm font-bold uppercase tracking-wider">
              Powerful Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-3 sm:mb-4 text-gray-800">
              Features Designed for Military Medical IT
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Our ticket management system provides all the tools you need to
              manage technical support requests efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature cards - Remaining the same but with responsive adjustments */}
            {/* ... existing feature cards ... */}
          </div>
        </div>
      </div>

      {/* How It Works Section - Improved responsiveness */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDYwQzEzLjQzIDYwIDAgNDYuNTcgMCAzMFMxMy40MyAwIDMwIDBzMzAgMTMuNDMgMzAgMzAtMTMuNDMgMzAtMzAgMzB6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4yMDQiLz48cGF0aCBkPSJNMzAgMGMyLjc2NCAwIDUgMi4yMzYgNSA1cy0yLjIzNiA1LTUgNS01LTIuMjM2LTUtNSAyLjIzNi01IDUtNXptMCA1MEMyNy4yMzYgNTAgMjUgNDcuNzY0IDI1IDQ1czIuMjM2LTUgNS01IDUgMi4yMzYgNSA1LTIuMjM2IDUtNSA1ek01MCAxMGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXptMCA0MGMyLjc2NCAwIDUtMi4yMzYgNS01cy0yLjIzNi01LTUtNS01IDIuMjM2LTUgNSAyLjIzNiA1IDUgNXpNMTAgNTBjMi43NjQgMCA1LTIuMjM2IDUtNXMtMi4yMzYtNS01LTUtNSAyLjIzNi01IDVjMCAyLjc2NCAyLjIzNiA1IDUgNXptMC00MGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjQwOCIvPjxwYXRoIGQ9Ik0zMCAwYzIuNzY0IDAgNSAyLjIzNiA1IDVzLTIuMjM2IDUtNSA1LTUtMi4yMzYtNS01IDIuMjM2LTUgNS01em0wIDUwYy0yLjc2NCAwLTUtMi4yMzYtNS01czIuMjM2LTUgNS01IDUgMi4yMzYgNSA1LTIuMjM2IDUtNSA1ek01MCAxMGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXptMCA0MGMyLjc2NCAwIDUtMi4yMzYgNS01cy0yLjIzNi01LTUtNS01IDIuMjM2LTUgNSAyLjIzNiA1IDUgNXpNMTAgNTBjMi43NjQgMCA1LTIuMjM2IDUtNXMtMi4yMzYtNS01LTUtNSAyLjIzNi01IDVjMCAyLjc2NCAyLjIzNiA1IDUgNXptMC00MGMtMi43NjQgMC01LTIuMjM2LTUtNXMyLjIzNi01IDUtNSA1IDIuMjM2IDUgNS0yLjIzNiA1LTUgNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIuMTAyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] bg-clip-text text-transparent text-xs sm:text-sm font-bold uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-3 sm:mb-4 text-gray-800">
              How Our Ticket System Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Our streamlined process makes reporting and resolving IT issues
              simple and efficient.
            </p>
          </div>

          <div ref={stepsRef} className="flex flex-col mb-12 sm:mb-16">
            <div className="relative">
              {/* Process line - Only visible on larger screens */}
              <div className="hidden md:block absolute top-16 left-[70px] right-[70px] h-1 bg-gray-200 z-0">
                <div className="progress-line h-full w-0 bg-gradient-to-r from-[#00b2ef] via-[#0ca74f] to-[#e8c745]"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center step">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-[#00b2ef] rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                    Report Issue
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Submit detailed information about technical problems or
                    service disruptions.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center step">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-[#e8c745] rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                    Assign & Prioritize
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Issues are routed to the appropriate IT or support team
                    based on severity.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center step">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-[#0ca74f] rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                    Track Resolution
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Monitor status updates and progress as technicians work on
                    the issue.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center step">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-[#00b2ef] rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3">
                    4
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                    Problem Solved
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Verify resolution and document solutions for future
                    reference.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards below the process steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-[#00b2ef]/5 rounded-2xl p-6 sm:p-8 border border-[#00b2ef]/10">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#00b2ef]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold ml-3 text-gray-800">
                  Fast Response Time
                </h3>
              </div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Our system automatically assigns tickets to available
                technicians, reducing response time by up to 40%.
              </p>
            </div>

            <div className="bg-[#0ca74f]/5 rounded-2xl p-6 sm:p-8 border border-[#0ca74f]/10">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#0ca74f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold ml-3 text-gray-800">
                  Secure Communications
                </h3>
              </div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                All ticket data is encrypted and compliant with military-grade
                security standards to protect sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Issues Section - Improved responsiveness */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-[#e8c745] to-[#0ca74f] bg-clip-text text-transparent text-xs sm:text-sm font-bold uppercase tracking-wider">
              Support Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-3 sm:mb-4 text-gray-800">
              Common Issues We Handle
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Our system is designed to address various technical and service
              issues efficiently.
            </p>
          </div>

          <div
            ref={issuesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00b2ef] to-[#00b2ef]/50 rounded-t-2xl"></div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#00b2ef] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                IT Infrastructure
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Server outages and performance issues
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Network connectivity problems
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Database errors and slowdowns
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Software application failures
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e8c745] to-[#e8c745]/50 rounded-t-2xl"></div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#e8c745] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Insurance Systems
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Claims processing system errors
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Member enrollment system issues
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Provider portal access problems
                  </span>
                </li>
                <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                  <span className="flex-shrink-0 p-1 rounded-full bg-[#0ca74f]/10 text-[#0ca74f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="ml-3 text-gray-700">
                    Benefit verification system failures
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Improved responsiveness */}
      <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white bg-gradient-mesh relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-[#00b2ef] to-[#0ca74f] bg-clip-text text-transparent text-xs sm:text-sm font-bold uppercase tracking-wider">
              User Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-3 sm:mb-4 text-gray-800">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Don't just take our word for it. See what teams are achieving with
              our ticket system.
            </p>
          </div>

          <div
            ref={testimonialsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Testimonial 1 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6 sm:p-8 hover:-translate-y-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00b2ef] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-[#00b2ef]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#00b2ef] font-bold text-base sm:text-xl">
                      JD
                    </span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Wiron Ruzindana
                  </h4>
                  <p className="text-gray-500 text-sm">
                    IT Manager, Kigali city
                  </p>
                </div>
              </div>
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 text-[#00b2ef]/20 h-6 w-6 sm:h-8 sm:w-8 -translate-x-3 -translate-y-2 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-gray-600 italic text-sm sm:text-base">
                  "This ticket system has transformed how our IT department
                  operates. Response times are down 40% and customer
                  satisfaction is up. The interface is intuitive and modern."
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6 sm:p-8 hover:-translate-y-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#e8c745] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-[#e8c745]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#e8c745] font-bold text-base sm:text-xl">
                      SJ
                    </span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Sarah Johnson
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Systems Administrator, Central Office
                  </p>
                </div>
              </div>
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 text-[#e8c745]/20 h-6 w-6 sm:h-8 sm:w-8 -translate-x-3 -translate-y-2 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-gray-600 italic text-sm sm:text-base">
                  "The analytics and reporting features have given us incredible
                  insights into our support operations and helped us optimize
                  resources across multiple departments."
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 p-6 sm:p-8 hover:-translate-y-2">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0ca74f] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-[#0ca74f]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#0ca74f] font-bold text-base sm:text-xl">
                      MR
                    </span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Mike Rodriguez
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Network Engineer, East Region
                  </p>
                </div>
              </div>
              <div className="relative">
                <svg
                  className="absolute top-0 left-0 text-[#0ca74f]/20 h-6 w-6 sm:h-8 sm:w-8 -translate-x-3 -translate-y-2 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-gray-600 italic text-sm sm:text-base">
                  "The integration with our existing tools made adoption
                  seamless. My team loves how easy it is to track and update
                  tickets from any device, anytime."
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Improved responsiveness */}
      <div
        ref={ctaRef}
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8c745] via-[#dcb93d] to-[#c9a830]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE0IiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDExNCAxODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4zIj48cGF0aCBkPSJNMCAwaDU3djU3aC01N3pNNTcgMGg1N3Y1N2gtNTd6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-[length:40px] opacity-10"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block rounded-full bg-white/20 px-4 sm:px-6 py-1 sm:py-2 mb-6 sm:mb-8 backdrop-blur-sm">
            <span className="text-white font-semibold text-sm sm:text-base">
              Ready to revolutionize your IT support?
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Streamline Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Ticket Management</span>
              <div className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#00b2ef]/30 rounded-full"></div>
            </span>
          </h2>
          <p className="text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg">
            Join thousands of teams already using our platform to improve their
            support operations and deliver faster resolutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              title="Start Using MMI Ticket System"
              onClick={() => handleNavigation("/signup")}
              buttonBg="bg-white text-[#e8c745]"
            />
            <Button
              title="Schedule a Demo"
              onClick={() => handleNavigation("/contact")}
              buttonBg="bg-transparent border-2 border-white text-white"
            />
          </div>

          <div className="mt-10 sm:mt-16 inline-flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-3 rounded-full text-white text-sm">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Military-grade security</span>
            <span className="hidden xs:inline-block mx-1 sm:mx-2">•</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>24/7 Support</span>
            <span className="hidden xs:inline-block mx-1 sm:mx-2">•</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Easy deployment</span>
          </div>
        </div>
      </div>

      {/* Footer - with responsive adjustments */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-[#00b2ef] blur-3xl"></div>
          <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-[#0ca74f] blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-md">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                      fill="#00b2ef"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  MMI Ticket System
                </h3>
              </div>
              <p className="text-gray-400 max-w-xs">
                Military Medical Insurance ticket management platform. Secure,
                efficient technical support for your organization.
              </p>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#00b2ef]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Submit Ticket
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Check Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#e8c745]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Training Videos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    User Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#0ca74f]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Help Desk</p>
                    <a
                      href="tel:8005551234"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      (800) 555-1234
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a
                      href="mailto:support@mmits.org"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      support@mmits.org
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 mt-0.5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.414V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Hours</p>
                    <p className="text-gray-400">24/7 Support</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer section - bottom part */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-left md:text-left">
                <p className="text-gray-400 text-sm hidden md:block">
                  &copy; {new Date().getFullYear()} MMI Ticket System. All
                  rights reserved.
                </p>
                <p className="text-gray-400 text-sm md:hidden text-center">
                  &copy; {new Date().getFullYear()} MMI Ticket System . ALL RIGHTS RESERVED
                </p>
              </div>

              <div className="text-center hidden md:block">
                <p className="text-gray-400 text-sm font-medium">
                  Developed and created by Wiron Ruzindana
                </p>
              </div>

              <div className="hidden md:flex justify-center md:justify-end space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
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
