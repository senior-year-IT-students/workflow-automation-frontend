
import { Navigate, Outlet } from "react-router-dom";
import { userStorage } from "../../features/auth/storage";


export default function ProtectedRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const token = userStorage.get();

  if (!token) {

    return <Navigate to="/login" replace />;
  }

 
  return children ? <>{children}</> : <Outlet />;
}
