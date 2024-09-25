import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
const CloudsSun = () => {
  const classes = ["cloud left", "cloud middle", "cloud right"];
  const [isAdminAppear, setIsAdminAppear] = useState(false);

  return (
    <>
      {classes.map((className, index) => (
        <FontAwesomeIcon
          key={index}
          className={className}
          icon={faCloud}
          style={{ color: "#ffffff" }}
        />
      ))}
      <FontAwesomeIcon
        className={`sun ${isAdminAppear ? "admin" : ""}`}
        icon={faSun}
        onDoubleClick={() => {
          setIsAdminAppear(true);
        }}
        style={{ color: "#ffdf3d" }}
      />
      <Link to="/admin" className="admin-word">
        welcome boss
      </Link>
    </>
  );
};

export default CloudsSun;
