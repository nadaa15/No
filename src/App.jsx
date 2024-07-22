import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'


function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </RecoilRoot>
    </>
  );
}

export default App
