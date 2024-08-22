import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from './routes/login.tsx';
import Home from './routes/home.tsx';
import OAuthLogin from './routes/oauthLogin.tsx';
import RegisterUser from './routes/registerUser.tsx';

import { useAuthStore } from './stores/AuthStore.ts';

type ChildrenProps = {
  children?: React.ReactNode
}

const RequireAuth = ({ children }: ChildrenProps) => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? children : <Navigate to="/userLogin" />
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <OAuthLogin />,
  },
  {
    path: "/userLogin",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/registerUser",
    element: <RegisterUser />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
