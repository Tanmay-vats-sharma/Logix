import React, { useState } from "react";
import DashboardTab from "./DashboardTab";
import TeamsTab from "./TeamsTab";
import StudentsTab from "./StudentsTab";
import EventControlTab from "./EventControl";
import SubmissionsTab from "./SubmissionsTab";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardTab />;
      case "teams": return <TeamsTab />;
      case "students": return <StudentsTab />;
      case "event-control": return <EventControlTab />;
      case "submissions": return <SubmissionsTab />;
      default: return null;
    }
  };

  return (
    <div style={styles.body}>
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <i className="fas fa-bolt" style={styles.logoIcon}></i>
          <h1 style={styles.logoText}>Style Sprint Admin</h1>
        </div>
        {["dashboard", "teams", "students", "event-control", "submissions"].map(tab => (
          <div
            key={tab}
            style={{
              ...styles.menuItem,
              ...(activeTab === tab ? styles.menuItemActive : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            <i className={getTabIcon(tab)} style={styles.menuIcon}></i>
            <span>{getTabName(tab)}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>{getTabName(activeTab)}</h2>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>AD</div>
            <span>Admin User</span>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

// Helper functions
const getTabIcon = (tab) => {
  switch (tab) {
    case "dashboard": return "fas fa-home";
    case "teams": return "fas fa-users";
    case "students": return "fas fa-user-graduate";
    case "event-control": return "fas fa-cogs";
    case "submissions": return "fas fa-check-circle";
    default: return "fas fa-circle";
  }
};

const getTabName = (tab) => {
  switch (tab) {
    case "dashboard": return "Dashboard";
    case "teams": return "Team Management";
    case "students": return "Student Details";
    case "event-control": return "Event Controls";
    case "submissions": return "Submissions";
    default: return tab;
  }
};

const styles = {
  body: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    display: "flex"
  },
  sidebar: {
    width: "18svw",
    backgroundColor: "#1e1e1e",
    padding: "20px 0",
    height: "100vh",
    position: "fixed",
    borderRight: "1px solid #333"
  },
  logo: {
    padding: "0 20px 20px",
    borderBottom: "1px solid #333",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logoIcon: {
    color: "#7e57c2",
    fontSize: "24px"
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "600"
  },
  menuItem: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
    borderLeft: "4px solid transparent"
  },
  menuItemActive: {
    backgroundColor: "#2d2d2d",
    borderLeftColor: "#7e57c2",
    color: "#9575cd"
  },
  menuIcon: {
    width: "20px",
    textAlign: "center"
  },
  mainContent: {
    flex: 1,
    marginLeft: "17.8svw",
    width: "81svw",
    padding: "20px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #333"
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "500"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  userAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#7e57c2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  }
};

export default AdminPanel;
