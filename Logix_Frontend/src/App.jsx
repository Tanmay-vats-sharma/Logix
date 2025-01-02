import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./components/pages/blogPage/BlogPage";
import Layout from "./components/Layout";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
