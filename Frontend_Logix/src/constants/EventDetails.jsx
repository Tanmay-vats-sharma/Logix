import { FaUserEdit, FaCalendarDay, FaMicrophone, FaSignInAlt, FaTrophy } from "react-icons/fa";

export const steps = [
  {
    icon: <FaUserEdit className="text-3xl text-purple-400" />,
    title: "Step 1: Registration",
    description: "Secure your spot in the Keyboard Breaker typing competition.",
    details: [
      "Fill out the registration form",
      "Submit basic participant information",
      "Agree to the event terms and conditions",
      "Receive confirmation email with your team ID"
    ],
    color: "bg-purple-900/60"
  },
  {
    icon: <FaCalendarDay className="text-3xl text-blue-400" />,
    title: "Step 2: Event Day Preparation",
    description: "Prepare your keyboard and typing setup before the event.",
    details: [
      "Practice touch typing and improve accuracy",
      "Use a stable keyboard and internet connection",
      "Warm up with short timed typing tests",
      "Keep your system charged and browser updated"
    ],
    color: "bg-blue-900/60"
  },
  {
    icon: <FaMicrophone className="text-3xl text-green-400" />,
    title: "Step 3: Event Day Schedule",
    description: "Be ready for the Keyboard Breaker challenge.",
    details: [
      "Date: 19/03/2026",
      "Time: 1:20 PM – 4:30 PM",
      "Venue: Seminar Hall, D Block",
      "Arrive 30 minutes early for check-in"
    ],
    color: "bg-green-900/60"
  },
  {
    icon: <FaSignInAlt className="text-3xl text-yellow-400" />,
    title: "Step 4: Login",
    description: "Access the typing platform on event day.",
    details: [
      "Login with your team name",
      "Enter leader’s roll number for verification",
      "Access typing rounds via the event portal"
    ],
    color: "bg-yellow-900/60"
  },
  {
    icon: <FaTrophy className="text-3xl text-red-400" />,
    title: "Step 5: Final Award Ceremony",
    description: "Celebrate the winners and top performers.",
    details: [
      "Results announced after evaluation",
      "Top 3 fastest and most accurate teams awarded certificates & prizes",
      "Group photo session with participants and organizers"
    ],
    color: "bg-red-900/60"
  }
];

export default steps;
