import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import EventPage from "./components/pages/eventPage/EventPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import EventDetailsPage from "./components/pages/eventDetailsPage/EventDetailsPage";
import Registeration from "./components/pages/registrationPage/Registration";
import EventDayUI from "./components/pages/eventPage/BidEvent/EventDayUi.jsx";
import CodeEventUI from "./components/pages/eventPage/CodeEvent/CodeEventUI.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EventPage />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/event-day" element={<CodeEventUI />} />
           {/* <Route path="/event-day" element={<EventDayUI />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
