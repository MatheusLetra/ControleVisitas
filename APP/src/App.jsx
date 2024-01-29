import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login'
import CadastrarVisitantes from './pages/CadastrarVisitantes'
import Main from './pages/Main'
import ListarVisitas from './pages/ListarVisitas'
import ListarFuncionarios from './pages/ListarFuncionarios'
import CadastrarFuncionarios from "./pages/CadastrarFuncionarios";
import EditarFuncionarios from "./pages/EditarFuncionarios";
import ListarVisitantes from "./pages/ListarVisitantes";
import EditarVisitantes from "./pages/EditarVisitantes";
import CadastrarVisitas from "./pages/CadastrarVisitas";

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
        element: <ListarVisitas />,
      },{
        path: "/main/visitas/cadastrar",
        element: <CadastrarVisitas />,
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