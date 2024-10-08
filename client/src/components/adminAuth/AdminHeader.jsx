import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setShowUsersData, setNewInputIsAppear }) => {
  const [pagActive, setPagActive] = useState("pagUsers");
  const navigate = useNavigate();
  const handlePagActive = (e) => {
    const { name } = e.target.dataset;
    // so when the users click id it's true so i display the users data
    if (name === "pagUsers") {
      setShowUsersData(true);
    } else {
      setShowUsersData(false);
    }
    setPagActive(name);
  };

  const handleLogoutAdmin = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="adminHeader">
      <div className="title">
        <h3 className="header-type">
          List of {pagActive === "pagUsers" ? "users" : "tasks"}
        </h3>
        <div className="header-bttns">
          <button className="header-btn logout" onClick={handleLogoutAdmin}>
            Log out
          </button>
          <button
            className="header-btn"
            onClick={() =>
              setNewInputIsAppear(pagActive === "pagUsers" ? "users" : "tasks")
            }
          >
            Add new {pagActive === "pagUsers" ? "user" : "task"}
          </button>
        </div>
      </div>
      <div className="pagination">
        <div
          className={`pag-users ${pagActive === "pagUsers" ? "active" : ""}`}
          data-name="pagUsers"
          onClick={handlePagActive}
        >
          Users Data
        </div>
        <div
          className={`pag-tasks ${pagActive === "pagTasks" ? "active" : ""}`}
          data-name="pagTasks"
          onClick={handlePagActive}
        >
          Tasks Data
        </div>
      </div>
    </div>
  );
};

AdminHeader.propTypes = {
  setShowUsersData: PropTypes.func,
  setNewInputIsAppear: PropTypes.func,
};

export default AdminHeader;
