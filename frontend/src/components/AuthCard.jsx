import logo from "../assets/mmi.png";

const AuthCard = ({ title, children }) => {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        {title && (
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h2>
        )}
        {children}
        <div className="text-center text-xs text-gray-400 pt-4">
          Version 1.0.0
        </div>
      </div>
    );
};

export default AuthCard;
