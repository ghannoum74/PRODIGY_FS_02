import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoxHeader = () => {
  return (
    <div className="header-box">
      <h3 className="header">Manage your time with TaskNest</h3>
      <FontAwesomeIcon
        icon={faBusinessTime}
        style={{ color: "#ffffff", fontSize: "3rem" }}
      />
    </div>
  );
};

export default BoxHeader;
