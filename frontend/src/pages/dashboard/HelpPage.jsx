import { useState } from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import {
  FaSearch,
  FaQuestionCircle,
  FaHeadset,
  FaFileAlt,
  FaComment,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaTicketAlt,
  FaBook,
  FaRocket,
  FaInfoCircle,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";

const HelpPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  // FAQs data
  const faqs = [
    {
      id: 1,
      question: "How do I create a new ticket?",
      answer:
        "To create a new ticket, navigate to the Dashboard and click on the 'Create Ticket' button. Fill in the required information including title, description, and priority level. You can also attach relevant files to provide more context.",
      category: "tickets",
    },
    {
      id: 2,
      question: "How can I check the status of my ticket?",
      answer:
        "You can check the status of your ticket by going to the Dashboard and viewing the 'My Tickets' section. Each ticket will display its current status: Open, In Progress, Resolved, or Closed.",
      category: "tickets",
    },
    {
      id: 3,
      question: "How do I update my profile information?",
      answer:
        "To update your profile information, click on your profile picture in the top right corner, then select 'My Profile'. On the profile page, you can edit your personal information and save the changes.",
      category: "account",
    },
    {
      id: 4,
      question: "Can I change my password?",
      answer:
        "Yes, you can change your password from the Profile page. Navigate to My Profile, scroll down to the password section, enter your current password and the new password twice, then click 'Save Changes'.",
      category: "account",
    },
    {
      id: 5,
      question: "How do I enable notifications?",
      answer:
        "To manage your notifications, go to Settings by clicking on your profile picture and selecting 'Settings'. Navigate to the 'Notifications' tab where you can toggle different notification types on or off.",
      category: "notifications",
    },
  ];

  // Knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn the basics of using the MMI Ticket System",
      icon: <FaRocket className="text-[#00b2ef]" />,
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Ticket Management",
      description: "How to efficiently manage your support tickets",
      icon: <FaTicketAlt className="text-[#00b2ef]" />,
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Account Security",
      description: "Best practices for keeping your account secure",
      icon: <FaInfoCircle className="text-[#00b2ef]" />,
      readTime: "4 min read",
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Help Center Header */}
        <div className="bg-gradient-to-r from-[#00b2ef] to-[#0077b6] rounded-xl shadow-lg p-8 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-12 -mr-12 z-0"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -mb-10 -ml-10 z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              How can we help you today?
            </h1>
            <p className="text-blue-100 mb-6 md:text-lg">
              Find answers, browse tutorials, or contact support
            </p>

            {/* Search Bar */}
            <div className="relative mt-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 bg-white/10 backdrop-blur-sm text-white placeholder-blue-100 border border-white/20"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 flex items-center group cursor-pointer">
            <div className="mr-4 bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-all">
              <FaHeadset className="text-2xl text-[#00b2ef]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Contact Support
              </h3>
              <p className="text-sm text-gray-500">
                Get help from our support team
              </p>
            </div>
            <FaChevronRight className="ml-auto text-gray-400 group-hover:text-[#00b2ef] transition-all" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 flex items-center group cursor-pointer">
            <div className="mr-4 bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-all">
              <FaFileAlt className="text-2xl text-[#00b2ef]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Documentation
              </h3>
              <p className="text-sm text-gray-500">
                Browse our detailed guides
              </p>
            </div>
            <FaChevronRight className="ml-auto text-gray-400 group-hover:text-[#00b2ef] transition-all" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 flex items-center group cursor-pointer">
            <div className="mr-4 bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-all">
              <FaComment className="text-2xl text-[#00b2ef]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Live Chat</h3>
              <p className="text-sm text-gray-500">Chat with a support agent</p>
            </div>
            <FaChevronRight className="ml-auto text-gray-400 group-hover:text-[#00b2ef] transition-all" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* FAQs Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <FaQuestionCircle className="mr-3 text-[#00b2ef]" />
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="p-6">
                {filteredFaqs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border border-gray-100 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className={`w-full flex justify-between items-center p-4 text-left font-medium ${
                            expandedFaq === faq.id
                              ? "bg-blue-50 text-[#00b2ef]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <FaChevronUp className="text-[#00b2ef]" />
                          ) : (
                            <FaChevronDown className="text-gray-400" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="p-4 bg-white border-t border-gray-100">
                            <p className="text-gray-600">{faq.answer}</p>
                            <div className="mt-3 flex items-center">
                              <span className="text-xs text-gray-500 italic">
                                Category: {faq.category}
                              </span>
                              <div className="ml-auto">
                                <span className="text-xs text-blue-500 cursor-pointer hover:underline">
                                  Was this helpful?
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaSearch className="mx-auto text-4xl text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-600 mb-1">
                      No results found
                    </h3>
                    <p className="text-gray-500">
                      Try searching with different keywords or browse our
                      categories
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Knowledge Base */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FaBook className="mr-2 text-[#00b2ef]" />
                  Knowledge Base
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {knowledgeBaseArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-3 border border-gray-100 rounded-lg hover:border-[#00b2ef]/30 hover:bg-blue-50/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">{article.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">
                            {article.description}
                          </p>
                          <span className="inline-flex items-center text-xs text-gray-400">
                            <FaClock className="mr-1" /> {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-[#00b2ef] hover:underline text-sm font-medium flex items-center justify-center mx-auto">
                    View all articles{" "}
                    <FaChevronRight className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FaHeadset className="mr-2 text-[#00b2ef]" />
                  Contact Us
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 text-lg text-gray-400">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us at</p>
                    <a
                      href="mailto:support@mmi.gov.rw"
                      className="text-[#00b2ef] hover:underline"
                    >
                      support@mmi.gov.rw
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-3 text-lg text-gray-400">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us at</p>
                    <a
                      href="tel:+250780000000"
                      className="text-gray-800 font-medium"
                    >
                      +250 780 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-3 text-lg text-gray-400">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <a
                      href="https://wa.me/250780000000"
                      className="text-gray-800 font-medium"
                    >
                      +250 780 000 000
                    </a>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button className="w-full py-3 bg-[#00b2ef] text-white rounded-lg hover:bg-[#0092c5] transition-colors flex items-center justify-center">
                    <FaTicketAlt className="mr-2" />
                    Create Support Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
