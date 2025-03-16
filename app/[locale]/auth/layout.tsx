const AuthLayout = ({
  children
} : {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center bg-color">
      {children}
    </div>
  );
}

export default AuthLayout;