import styles from "./styleModules/reset.module.css";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import About from "./components/About";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";

function App() {
  const blogName = "My Blog";
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home blogName={blogName} />} />
        <Route exact path="/blog/:id" element={<Blog />} />
        <Route exact path="/blogs" element={<BlogList />} />
        <Route exact path="/about" element={<About blogName={blogName} />} />
        <Route
          exact
          path="/newsletter"
          element={<Newsletter blogName={blogName} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
