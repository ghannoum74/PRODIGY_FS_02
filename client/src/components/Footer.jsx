import {
  faFileLines,
  faGear,
  faHouse,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LogoutPupop from "../utilities/LogoutPupop";
import PropTypes from "prop-types";

const Footer = ({ setAddTaskPupopAppear }) => {
  const [logoutPupop, setLogoutPupop] = useState(false);
  const handleLogout = () => {
    setLogoutPupop(true);
  };

  return (
    <>
      {logoutPupop && (
        <LogoutPupop
          setLogoutPupop={setLogoutPupop}
          logoutPupop={logoutPupop}
        />
      )}
      <div className="footer">
        <div className="house" onClick={() => handleLogout()}>
          <FontAwesomeIcon
            className="icon"
            icon={faHouse}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="data">
          <FontAwesomeIcon
            className="icon"
            icon={faFileLines}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="add-task" onClick={() => setAddTaskPupopAppear(true)}>
          <FontAwesomeIcon
            className="icon"
            icon={faPlus}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="setting">
          <FontAwesomeIcon
            className="icon"
            icon={faGear}
            style={{ color: "#fff" }}
          />
        </div>
      </div>
    </>
  );
};

Footer.propTypes = {
  setAddTaskPupopAppear: PropTypes.func,
};
export default Footer;
