import { Outlet } from "react-router-dom";

import './main.css'
import Navbar from "../../components/Navbar";

export default function Main() {
  return (
    <div className="main">
      <Navbar />
      <Outlet />
    </div>
  )
}