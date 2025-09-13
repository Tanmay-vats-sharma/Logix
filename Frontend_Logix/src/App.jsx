import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import EventPage from "./components/pages/eventPage/EventPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import EventDetailsPage from "./components/pages/eventDetailsPage/EventDetailsPage";
import Registeration from "./components/pages/registrationPage/Registration";
import EventDayUI from "./components/pages/eventPage/BidEvent/EventDayUi.jsx";
import CodeEventUI from "./components/pages/eventPage/CodeEvent/CodeEventUI.jsx";
import Login from "./components/pages/registrationPage/Login";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EventPage />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event-day" element={<CodeEventUI isPublic={false} />} />
          <Route path="/code-editor" element={<CodeEventUI isPublic={true} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
