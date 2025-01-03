import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./components/pages/blogPage/BlogPage";
import Layout from "./components/Layout";
import EventPage from "./components/pages/eventPage/EventPage";
import HomePage from "./components/pages/homePage/HomePage";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/events" element={<EventPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
