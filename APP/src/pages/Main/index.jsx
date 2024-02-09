import { Outlet } from "react-router-dom";

import './main.css'
import Navbar from "../../components/Navbar";

export default function Main() {
  return (
    <div className="main">
      <Navbar />
      <Outlet />

      <div className="dados-container">
        <h6>DESENVOLVIDO POR: Matheus Letra</h6>
      </div>
    </div>
  )
}