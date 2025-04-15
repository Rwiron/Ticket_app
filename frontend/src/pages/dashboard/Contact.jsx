import React from "react";
import DashboardLayout from "../../components/ui/DashboardLayout";
import {
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaUserMd,
  FaHospital,
  FaAmbulance,
  FaQuestionCircle,
  FaFileAlt,
  FaShieldAlt,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";

const Contact = () => {
  const contactInfo = {
    supportEmail: "support@mmi.com",
    techSupportPhone: "+250 780 961 542",
    billingEmail: "billing@mmi.com",
    billingPhone: "+250 780 961 542",
    appointmentsEmail: "appointments@mmi.com",
    appointmentsPhone: "+250 780 961 542",
    recordsEmail: "records@mmi.com",
    recordsPhone: "+250 780 961 542",
    emergencyPhone: "+250 780 961 542",
    officePhone: "+250 780 961 542",
    officeHours: "Monday-Friday: 8:00 AM - 5:00 PM",
    weekendHours: "Saturday: 9:00 AM - 1:00 PM",
    address: "123 Military Medical Insurance, Kigali, Rwanda",
    website: "www.mmi.gov",
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold mb-8 border-b pb-4"
          style={{ color: "#00b2ef" }}
        >
          Contact Support
        </h2>

        <div className="space-y-6">
          {/* Introduction Section */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm"
            style={{ borderLeft: "4px solid #00b2ef" }}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: "rgba(0, 178, 239, 0.1)" }}
              >
                <FaHeadset style={{ color: "#00b2ef" }} className="text-2xl" />
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: "#00b2ef" }}
              >
                We're Here to Help
              </h3>
            </div>
            <p className="text-gray-700">
              Our dedicated support team is available to assist you with any
              questions or technical issues you may encounter while using our
              platform. We offer multiple channels of support to ensure you can
              reach us in the way that's most convenient for you. Please don't
              hesitate to contact us using any of the methods below.
            </p>
          </div>

          {/* Main Contact Cards Section */}
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: "#0ca74f" }}
          >
            Support Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tech Support Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: "4px solid #00b2ef" }}
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(0, 178, 239, 0.1)" }}
                >
                  <FaEnvelope
                    style={{ color: "#00b2ef" }}
                    className="text-xl"
                  />
                </div>
                <div>
                  <h4
                    className="font-medium text-lg"
                    style={{ color: "#00b2ef" }}
                  >
                    Technical Support
                  </h4>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`mailto:${contactInfo.supportEmail}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.supportEmail}
                    </a>
                  </p>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`tel:${contactInfo.techSupportPhone}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.techSupportPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For platform technical issues
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Support Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: "4px solid #e8c745" }}
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(232, 199, 69, 0.1)" }}
                >
                  <FaFileAlt style={{ color: "#e8c745" }} className="text-xl" />
                </div>
                <div>
                  <h4
                    className="font-medium text-lg"
                    style={{ color: "#e8c745" }}
                  >
                    Billing Support
                  </h4>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`mailto:${contactInfo.billingEmail}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.billingEmail}
                    </a>
                  </p>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`tel:${contactInfo.billingPhone}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.billingPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For billing and payment inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Appointments Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: "4px solid #0ca74f" }}
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(12, 167, 79, 0.1)" }}
                >
                  <FaCalendarAlt
                    style={{ color: "#0ca74f" }}
                    className="text-xl"
                  />
                </div>
                <div>
                  <h4
                    className="font-medium text-lg"
                    style={{ color: "#0ca74f" }}
                  >
                    Appointments
                  </h4>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`mailto:${contactInfo.appointmentsEmail}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.appointmentsEmail}
                    </a>
                  </p>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`tel:${contactInfo.appointmentsPhone}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.appointmentsPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For scheduling or rescheduling appointments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Medical Records Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: "4px solid #00b2ef" }}
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(0, 178, 239, 0.1)" }}
                >
                  <FaIdCard style={{ color: "#00b2ef" }} className="text-xl" />
                </div>
                <div>
                  <h4
                    className="font-medium text-lg"
                    style={{ color: "#00b2ef" }}
                  >
                    Medical Records
                  </h4>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`mailto:${contactInfo.recordsEmail}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.recordsEmail}
                    </a>
                  </p>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`tel:${contactInfo.recordsPhone}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.recordsPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For accessing or transferring medical records
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: "4px solid #e8c745" }}
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(232, 199, 69, 0.1)" }}
                >
                  <FaAmbulance
                    style={{ color: "#e8c745" }}
                    className="text-xl"
                  />
                </div>
                <div>
                  <h4
                    className="font-medium text-lg"
                    style={{ color: "#e8c745" }}
                  >
                    Emergency Contact
                  </h4>
                  <p className="mt-2 font-medium hover:underline">
                    <a
                      href={`tel:${contactInfo.emergencyPhone}`}
                      style={{ color: "#0ca74f" }}
                    >
                      {contactInfo.emergencyPhone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For urgent medical situations (available 24/7)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    For life-threatening emergencies, please call 911
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Cards */}
          <h3
            className="text-xl font-semibold mt-6 mb-3"
            style={{ color: "#00b2ef" }}
          >
            Department Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Care Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderLeft: "4px solid #0ca74f" }}
            >
              <h4
                className="font-medium text-lg mb-3"
                style={{ color: "#0ca74f" }}
              >
                <FaUserMd
                  className="inline-block mr-2"
                  style={{ color: "#0ca74f" }}
                />
                Primary Care
              </h4>
              <p className="text-gray-700 mb-2">
                Department for general health services and routine check-ups.
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                primarycare@militarymedical.com
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                +250 780 961 542
              </p>
            </div>

            {/* Specialty Services Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderLeft: "4px solid #e8c745" }}
            >
              <h4
                className="font-medium text-lg mb-3"
                style={{ color: "#e8c745" }}
              >
                <FaHospital
                  className="inline-block mr-2"
                  style={{ color: "#e8c745" }}
                />
                Specialty Services
              </h4>
              <p className="text-gray-700 mb-2">
                Department for specialized medical treatments and consultations.
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                specialty@militarymedical.com
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                +250 780 961 542
              </p>
            </div>

            {/* Mental Health Card */}
            <div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              style={{ borderLeft: "4px solid #00b2ef" }}
            >
              <h4
                className="font-medium text-lg mb-3"
                style={{ color: "#00b2ef" }}
              >
                <FaShieldAlt
                  className="inline-block mr-2"
                  style={{ color: "#00b2ef" }}
                />
                Mental Health Services
              </h4>
              <p className="text-gray-700 mb-2">
                Department for mental health support and counseling.
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                mentalhealth@militarymedical.com
              </p>
              <p className="font-medium" style={{ color: "#00b2ef" }}>
                +250 780 961 542
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm mt-6"
            style={{ borderLeft: "4px solid #0ca74f" }}
          >
            <h4
              className="font-medium text-lg mb-4 pb-2"
              style={{ color: "#0ca74f", borderBottom: "1px solid #e5e7eb" }}
            >
              Office Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="mr-3" style={{ color: "#0ca74f" }}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-gray-700">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-3" style={{ color: "#0ca74f" }}>
                  <FaClock />
                </div>
                <div>
                  <p className="text-gray-700">
                    {contactInfo.officeHours}
                    <br />
                    {contactInfo.weekendHours}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-3" style={{ color: "#0ca74f" }}>
                  <FaGlobe />
                </div>
                <div>
                  <p className="text-gray-700">
                    <a
                      href={`https://${contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#00b2ef" }}
                      className="hover:underline"
                    >
                      {contactInfo.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Help Resources */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm"
            style={{ borderLeft: "4px solid #e8c745" }}
          >
            <h4
              className="font-medium text-lg mb-4 flex items-center"
              style={{ color: "#e8c745" }}
            >
              <FaHeadset className="mr-2" />
              Self-Help Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2" style={{ color: "#00b2ef" }}>
                  Knowledge Resources
                </h5>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        Knowledge Base & FAQs
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        Video Tutorials
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        User Guides & Documentation
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2" style={{ color: "#00b2ef" }}>
                  Additional Services
                </h5>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        Online Chat Support
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        Request Callback
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline flex items-center text-gray-700 group"
                    >
                      <span
                        className="mr-2 transition-all"
                        style={{ color: "#e8c745" }}
                      >
                        •
                      </span>
                      <span className="group-hover:text-gray-900">
                        Submit Support Ticket
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            className="bg-white p-6 rounded-lg shadow-sm mt-6"
            style={{ borderLeft: "4px solid #00b2ef" }}
          >
            <h4
              className="font-medium text-lg mb-4 flex items-center"
              style={{ color: "#00b2ef" }}
            >
              <FaQuestionCircle className="mr-2" />
              Frequently Asked Questions
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium" style={{ color: "#0ca74f" }}>
                  How do I reset my password?
                </h5>
                <p className="text-gray-700 mt-1">
                  You can reset your password by clicking on the "Forgot
                  Password" link on the login page or contacting our technical
                  support team.
                </p>
              </div>
              <div>
                <h5 className="font-medium" style={{ color: "#0ca74f" }}>
                  How do I update my personal information?
                </h5>
                <p className="text-gray-700 mt-1">
                  You can update your personal information through your profile
                  settings or by contacting our records department.
                </p>
              </div>
              <div>
                <h5 className="font-medium" style={{ color: "#0ca74f" }}>
                  What should I do if I experience technical issues?
                </h5>
                <p className="text-gray-700 mt-1">
                  If you experience any technical issues, please contact our
                  technical support team via email or phone, providing as much
                  detail as possible about the issue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
