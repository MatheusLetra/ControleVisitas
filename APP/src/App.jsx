import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Main from './pages/Main'
import Visitas from './pages/Visitas'
import Funcionarios from './pages/Funcionarios'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  }, {
    path: "/main",
    element: <Main />,
    children: [
      {
        path: "/main/cadastro",
        element: <Cadastro />,
      },{
        path: "/main/visitas",
        element: <Visitas />,
      },{
        path: "/main/funcionarios",
        element: <Funcionarios />,
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);