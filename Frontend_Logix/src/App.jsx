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
  const dummyAdminAction = {
//   round: {
//     _id: "68c1d68ee1dd1c002aea01cf",
//     name: "Preliminary Round",
//     description: "First round with multiple choice questions.",
//   },
//   question: {
//     description: "Question 1 Center a Div",
//     text: "What is the output of 2 + 2 in JavaScript?",
//     starterCode: `<div class="center-me">I should be centered</div>
// <style>
//   .center-me {
//     /* fix this */
//   }
// </style>`,
//   },
//   time: 600,
};

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EventPage />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event-day" element={<CodeEventUI adminData={dummyAdminAction} />} />
           {/* <Route path="/event-day" element={<EventDayUI />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
