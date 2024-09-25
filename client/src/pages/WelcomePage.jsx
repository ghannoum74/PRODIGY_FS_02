import { useState } from "react";
import CloudsSun from "../components/welcomeComponents/CloudsSun";
import Content from "../components/welcomeComponents/Content";
import Arrow from "../components/welcomeComponents/Arrow";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleComponent } from "../redux/toggleSlice";

const WelcomePage = () => {
  // this is for the ui to unmount
  const [secondPageMount, setSecondPageMount] = useState(false);
  const navigate = useNavigate();

  const handleMountNextPage = () => {
    setSecondPageMount(true);
    setTimeout(() => {
      navigate("/homePage");
    }, 1000);
  };

  return (
    <div className="welcome">
      <div
        className={`sky-ui ${secondPageMount ? "unmout-component" : ""}`}
        draggable
      >
        <CloudsSun />
      </div>
      <Content />
      <button className="welcome-btn" onClick={handleMountNextPage}>
        Start your Journey
      </button>
      <Arrow />
    </div>
  );
};

export default WelcomePage;
