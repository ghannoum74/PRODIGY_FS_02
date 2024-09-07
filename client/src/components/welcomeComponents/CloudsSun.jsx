import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSun } from "@fortawesome/free-solid-svg-icons";

const CloudsSun = () => {
  const classes = ["cloud left", "cloud middle", "cloud right"];

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
        className="sun"
        icon={faSun}
        style={{ color: "#ffdf3d" }}
      />
    </>
  );
};

export default CloudsSun;
