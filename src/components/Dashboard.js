import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import PrioritiesPieChart from "./PrioritiesPieChart";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const taskPriorities = (data) => {
    return data.map((t) => t.priority);
  };

  const prioritiesArray = taskPriorities(tasks);

  useEffect(() => {
    axios
      .get("https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleMarkAsDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const priorities = {
    HIGH: "red",
    MEDIUM: "yellow",
    LOW: "blue",
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-title">
          <h2>Acmy Solutions</h2>
        </div>
        <div className="menu-item">
          <img src="/Frame 56.png" alt="" />
        </div>
      </div>
      <div className="main-content">
        <nav className="navbar">
          <div className="navbar-title">Dashboard</div>
          <div className="navbar-icons">
            <div className="navbar-icon bell-icon">
              <img src="/Bell-off.svg" alt="" />
            </div>
            <div className="navbar-icon avatar-icon">
              <img src="/Ellipse 6.svg" alt="" />
            </div>
          </div>
        </nav>
        <header>
          <h1>Welcome back, John Doe</h1>
          <p>
            The end of the year is coming. Are you planning your performance
            interviews? You can do this super efficiently with Acmy. <br />{" "}
            <a href="/">Look here for more information</a>
          </p>
        </header>
        <div className="content">
          <div className="tasks">
            <h3>Tasks</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${
                  task.completed ? "done" : "in-progress"
                }`}
              >
                <div className="task-header">
                  <span
                    className={`priority-indicator ${
                      priorities[task.priority]
                    }`}
                  ></span>
                  {task.todo}
                </div>
                {!task.completed && (
                  <button
                    onClick={() => handleMarkAsDone(task.id)}
                    className="mark-as-done"
                  >
                    Mark as done
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="activity-feed-task-priorities">
            <div className="activity-feed">
              <h3>Activity Feed</h3>
              <div className="activity-item">
                <p>
                  <strong>Kushantha Charuka</strong> created Contract #00124
                  need John Beige's signature
                </p>
                <span>Sep 16, 2022 at 11:30 AM</span>
              </div>
              <div className="activity-item">
                <p>
                  Lorem ipsum <strong>dolor sit amet</strong>, consectetur
                  adipiscing elit. Maecenas pretium neque.
                </p>
                <span>Sep 16, 2022 at 11:45 AM</span>
              </div>
            </div>
            <div className="task-priorities">
              <h3>Tasks Priorities</h3>
              <div className="chart-container">
                <div className="priority-chart">
                  <PrioritiesPieChart priorities={prioritiesArray} />
                </div>
                <div className="labels">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "red",
                        marginRight: "8px",
                      }}
                    ></div>
                    <span>High</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "yellow",
                        marginRight: "8px",
                      }}
                    ></div>
                    <span>Medium</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "blue",
                        marginRight: "8px",
                      }}
                    ></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
