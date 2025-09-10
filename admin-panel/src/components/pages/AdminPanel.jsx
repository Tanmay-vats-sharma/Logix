import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [activeRound, setActiveRound] = useState('Round 1');

  // Sample data
  const teams = [
    { id: 1, name: 'HTML Heroes', members: 3, status: 'Active' },
    { id: 2, name: 'CSS Masters', members: 3, status: 'Disqualified' },
    { id: 3, name: 'Style Sprinters', members: 3, status: 'Active' },
    { id: 4, name: 'Web Warriors', members: 3, status: 'Active' }
  ];

  const students = [
    { id: 101, name: 'John Smith', email: 'john@example.com', team: 'HTML Heroes', college: 'Tech University' },
    { id: 102, name: 'Emma Johnson', email: 'emma@example.com', team: 'HTML Heroes', college: 'Tech University' },
    { id: 103, name: 'Michael Brown', email: 'michael@example.com', team: 'HTML Heroes', college: 'Tech University' },
    { id: 104, name: 'Sarah Williams', email: 'sarah@example.com', team: 'CSS Masters', college: 'Design Institute' }
  ];

  const submissions = [
    { team: 'HTML Heroes', round: 2, question: 3, time: '09:58:42', status: 'On Time' },
    { team: 'Web Warriors', round: 2, question: 3, time: '09:59:21', status: 'On Time' },
    { team: 'Style Sprinters', round: 2, question: 3, time: '10:00:05', status: '5s Late' },
    { team: 'CSS Masters', round: 2, question: 3, time: '10:02:15', status: 'Too Late' }
  ];

  const questions = [
    'Question 1: Create a responsive navbar',
    'Question 2: Style a registration form',
    'Question 3: Implement a CSS grid layout',
    'Question 4: Create a animated button',
    'Question 5: Build a card component'
  ];

  const rounds = ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'];

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(600);
    setIsTimerRunning(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'On Time':
        return <span className="badge badge-success">{status}</span>;
      case 'Disqualified':
      case 'Too Late':
        return <span className="badge badge-danger">{status}</span>;
      case '5s Late':
        return <span className="badge badge-warning">{status}</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="stats">
              <div className="stat-card">
                <div className="stat-label">Total Teams</div>
                <div className="stat-value">24</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Students</div>
                <div className="stat-value">72</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Current Round</div>
                <div className="stat-value">2/5</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Active Question</div>
                <div className="stat-value">3</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Recent Activity</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Activity</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:23 AM</td>
                    <td>Round 2 Started</td>
                    <td>Question 3 displayed</td>
                  </tr>
                  <tr>
                    <td>10:15 AM</td>
                    <td>Team Disqualified</td>
                    <td>Team "CSS Masters" failed to submit in time</td>
                  </tr>
                  <tr>
                    <td>10:05 AM</td>
                    <td>Round 2 Question 2</td>
                    <td>Completed by 18 teams</td>
                  </tr>
                  <tr>
                    <td>09:45 AM</td>
                    <td>Round 2 Started</td>
                    <td>Question 2 displayed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
      case 'teams':
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Registered Teams</div>
              <button className="btn btn-primary" id="add-team-btn">Add New Team</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Team Name</th>
                  <th>Members</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                    <td>{team.members}</td>
                    <td>{getStatusBadge(team.status)}</td>
                    <td>
                      <button className="btn btn-danger">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'students':
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-title">All Participating Students</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>College</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.team}</td>
                    <td>{student.college}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'event-control':
        return (
          <>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Round Selection</div>
              </div>
              <div className="round-selector">
                {rounds.map(round => (
                  <button
                    key={round}
                    className={`round-btn ${activeRound === round ? 'active' : ''}`}
                    onClick={() => setActiveRound(round)}
                  >
                    {round}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Question Controls</div>
              </div>
              <div className="timer-container">
                <div>Time Remaining</div>
                <div className="timer" style={{ color: timeLeft === 0 ? 'var(--danger)' : 'var(--primary)' }}>
                  {formatTime(timeLeft)}
                </div>
                <div className="controls">
                  <button className="btn btn-success" onClick={startTimer}>Start Question</button>
                  <button className="btn btn-warning">Skip Question</button>
                  <button className="btn btn-danger" onClick={resetTimer}>Reset Timer</button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="question-select">Select Question</label>
                <select className="form-control" id="question-select">
                  {questions.map((question, index) => (
                    <option key={index} value={index + 1}>{question}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="time-input">Set Time (minutes)</label>
                <input type="number" className="form-control" id="time-input" defaultValue="10" min="1" max="60" />
              </div>

              <button className="btn btn-primary">Apply Settings</button>
            </div>
          </>
        );
      case 'submissions':
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-title">Team Submissions</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Round</th>
                  <th>Question</th>
                  <th>Submission Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={index}>
                    <td>{submission.team}</td>
                    <td>{submission.round}</td>
                    <td>{submission.question}</td>
                    <td>{submission.time}</td>
                    <td>{getStatusBadge(submission.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
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
        {['dashboard', 'teams', 'students', 'event-control', 'submissions'].map(tab => (
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

      <style>{`
        :root {
          --dark-bg: #121212;
          --dark-surface: #1e1e1e;
          --dark-card: #252525;
          --dark-hover: #2d2d2d;
          --primary: #7e57c2;
          --primary-light: #9575cd;
          --secondary: #26a69a;
          --text-primary: #e0e0e0;
          --text-secondary: #9e9e9e;
          --success: #66bb6a;
          --warning: #ffa726;
          --danger: #ef5350;
          --border-radius: 8px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background-color: var(--dark-bg);
          color: var(--text-primary);
          min-height: 100vh;
          display: flex;
        }

        .sidebar {
          width: 25svw;
          background-color: var(--dark-surface);
          padding: 20px 0;
          height: 100vh;
          position: fixed;
          border-right: 1px solid #333;
        }

        .logo {
          padding: 0 20px 20px;
          border-bottom: 1px solid #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo i {
          color: var(--primary);
          font-size: 24px;
        }

        .logo h1 {
          font-size: 22px;
          font-weight: 600;
        }

        .menu-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }

        .menu-item:hover {
          background-color: var(--dark-hover);
        }

        .menu-item.active {
          background-color: var(--dark-hover);
          border-left-color: var(--primary);
          color: var(--primary-light);
        }

        .menu-item i {
          width: 20px;
          text-align: center;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #333;
        }

        .header h2 {
          font-size: 24px;
          font-weight: 500;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }

        .card {
          background-color: var(--dark-card);
          border-radius: var(--border-radius);
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 500;
        }

        .btn {
          padding: 8px 16px;
          border-radius: var(--border-radius);
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--primary-light);
        }

        .btn-success {
          background-color: var(--success);
          color: white;
        }

        .btn-danger {
          background-color: var(--danger);
          color: white;
        }

        .btn-warning {
          background-color: var(--warning);
          color: white;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #333;
        }

        th {
          color: var(--text-secondary);
          font-weight: 500;
        }

        tr:hover {
          background-color: var(--dark-hover);
        }

        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-success {
          background-color: var(--success);
          color: white;
        }

        .badge-warning {
          background-color: var(--warning);
          color: white;
        }

        .badge-danger {
          background-color: var(--danger);
          color: white;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-label {
          display: block;
          margin-bottom: 5px;
          color: var(--text-secondary);
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border-radius: var(--border-radius);
          background-color: var(--dark-surface);
          border: 1px solid #333;
          color: var(--text-primary);
        }

        .timer-container {
          background-color: var(--dark-surface);
          padding: 20px;
          border-radius: var(--border-radius);
          text-align: center;
          margin-bottom: 20px;
        }

        .timer {
          font-size: 48px;
          font-weight: 700;
          margin: 10px 0;
          color: var(--primary);
        }

        .controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        .round-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .round-btn {
          padding: 10px 20px;
          background-color: var(--dark-card);
          border: none;
          border-radius: var(--border-radius);
          color: var(--text-primary);
          cursor: pointer;
        }

        .round-btn.active {
          background-color: var(--primary);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background-color: var(--dark-card);
          padding: 20px;
          border-radius: var(--border-radius);
          text-align: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          margin: 10px 0;
          color: var(--primary);
        }

        .stat-label {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};

// Helper functions
const getTabIcon = (tab) => {
  switch (tab) {
    case 'dashboard': return 'fas fa-home';
    case 'teams': return 'fas fa-users';
    case 'students': return 'fas fa-user-graduate';
    case 'event-control': return 'fas fa-cogs';
    case 'submissions': return 'fas fa-check-circle';
    default: return 'fas fa-circle';
  }
};

const getTabName = (tab) => {
  switch (tab) {
    case 'dashboard': return 'Dashboard';
    case 'teams': return 'Team Management';
    case 'students': return 'Student Details';
    case 'event-control': return 'Event Controls';
    case 'submissions': return 'Submissions';
    default: return tab;
  }
};

// Inline styles for the React components
const styles = {
  body: {
    backgroundColor: '#121212',
    color: '#e0e0e0',
    minHeight: '100vh',
    display: 'flex'
  },
  sidebar: {
    width: '20svw',
    backgroundColor: '#1e1e1e',
    padding: '20px 0',
    height: '100vh',
    position: 'fixed',
    borderRight: '1px solid #333'
  },
  logo: {
    padding: '0 20px 20px',
    borderBottom: '1px solid #333',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    color: '#7e57c2',
    fontSize: '24px'
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '600'
  },
  menuItem: {
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    borderLeft: '4px solid transparent'
  },
  menuItemActive: {
    backgroundColor: '#2d2d2d',
    borderLeftColor: '#7e57c2',
    color: '#9575cd'
  },
  menuIcon: {
    width: '20px',
    textAlign: 'center'
  },
  mainContent: {
    flex: 1,
    marginLeft: 'calc(20svw + 1px)',
    width: '75svw',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #333'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '500'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#7e57c2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
};

export default AdminPanel;