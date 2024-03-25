import Component from "./components";
import AboutUs from "./page/AboutUs";
import Contact from "./page/Contact";
import ModalHeader from "../src/components/ModalHeader";
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
import Dryfood from "./categoryProduct/dryfood";
import Vegetable from "../src/categoryProduct/Vegetable";
import ProcessedFood from "../src/categoryProduct/ProcessedFood";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <section className="section_header">
            <ModalHeader></ModalHeader>
            <Navigation></Navigation>
          </section>
          <Routes>
            <Route exact path="/" element={<Component />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/Dryfood" element={<Dryfood />} />
            <Route exact path="/Vegetable" element={<Vegetable />} />
            <Route exact path="/ProcessedFood" element={<ProcessedFood />} />
          </Routes>
          <Footer></Footer>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
