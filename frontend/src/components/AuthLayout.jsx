const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00b2ef] via-[#0098d4] to-[#0080b8] px-4 py-12">
      {children}
    </div>
  );
};

export default AuthLayout;
