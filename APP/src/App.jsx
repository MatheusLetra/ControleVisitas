import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login'
import CadastrarVisitantes from './pages/CadastrarVisitantes'
import Main from './pages/Main'
import Visitas from './pages/Visitas'
import ListarFuncionarios from './pages/ListarFuncionarios'
import CadastrarFuncionarios from "./pages/CadastrarFuncionarios";
import EditarFuncionarios from "./pages/EditarFuncionarios";
import ListarVisitantes from "./pages/ListarVisitantes";
import EditarVisitantes from "./pages/EditarVisitantes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  }, {
    path: "/main",
    element: <Main />,
    children: [
      {
        path: "/main/visitantes",
        element: <ListarVisitantes />,
      },{
        path: "/main/visitantes/cadastrar",
        element: <CadastrarVisitantes />,
      },{
        path: "/main/visitantes/editar/:id",
        element: <EditarVisitantes />,
      },{
        path: "/main/visitas",
        element: <Visitas />,
      },{
        path: "/main/funcionarios",
        element: <ListarFuncionarios />,
      },{
        path: "/main/funcionarios/cadastrar",
        element: <CadastrarFuncionarios />,
      },{
        path: "/main/funcionarios/editar/:id",
        element: <EditarFuncionarios />,
      }
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);