import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  }, {
    path: "/cadastro",
    element: <Cadastro />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);