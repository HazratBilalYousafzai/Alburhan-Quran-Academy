import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import ForgotPass from "./pages/auth/ForgotPass";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Cources from "./pages/Cources";
import Private from "./Components/route/Private";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Massage from "./pages/admin/Massages";
import Price from "./pages/admin/Price";
import Courses from "./pages/admin/Courses";
import Intro from "./pages/admin/Intro";
import Carousel from "./pages/admin/Carousel";
import ChangePassword from "./pages/auth/ChangePassword";
import About from "./pages/About";
function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<Private />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="massages" element={<Massage />} />
          <Route path="price" element={<Price />} />
          <Route path="courses" element={<Courses />} />
          <Route path="intro" element={<Intro />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="register" element={<Register />} />
          <Route path="change-password" element={<ChangePassword />} />
          {/* <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} /> */}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Cources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
