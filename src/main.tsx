import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login.tsx';
import Home from './routes/home.tsx';
import OAuthLogin from './routes/oauthLogin.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google"

const router = createBrowserRouter([
  {
    path: "/",
    element: <OAuthLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='566701837142-l2um7kls93h7l10qhh6pt23bh3cf9t45.apps.googleusercontent.com'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
)
