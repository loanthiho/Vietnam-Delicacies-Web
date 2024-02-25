import Component from "./components";
import AboutUs from "./page/AboutUs";
import Contact from "./page/Contact";
import ModalHeader from "../src/components/ModalHeader";
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <section className="section_header">
          <ModalHeader></ModalHeader>
          <Navigation></Navigation>
        </section>
        <Routes>
          <Route exact path="/" element={<Component />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App
