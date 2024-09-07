import { useState } from "react";
import CloudsSun from "../components/welcomeComponents/CloudsSun";
import Content from "../components/welcomeComponents/Content";
import Arrow from "../components/welcomeComponents/Arrow";
import HomePage from "./HomePage";

const WelcomePage = () => {
  // this is for the ui to unmount
  const [secondPageMount, setSecondPageMount] = useState(false);

  //   this is for the next component mount
  const [navigate, setNavigate] = useState(false);
  //   const [startX, setStartX] = useState(0);
  //   const [endX, setEndX] = useState(0);
  //   const [startY, setStartY] = useState(0);
  //   const [endY, setEndY] = useState(0);

  //   useEffect(() => {
  //     window.addEventListener("dragstart", (e) => {
  //       setStartX(e.clientX);
  //       setStartY(e.clientY);
  //     });
  //     window.addEventListener("dragend", (e) => {
  //       setEndX(e.clientX);
  //       setEndY(e.clientY);
  //     });
  //   }, [startX, endX, startY, endY]);

  const handleMountNextPage = () => {
    setSecondPageMount(true);
    setTimeout(() => setNavigate(true), 1000);
  };

  return (
    <>
      {navigate ? (
        <HomePage />
      ) : (
        <>
          {/* <div
          draggable
          style={{
            position: "relative",
            top: `${endY - startY}px `,
            left: `${endX - startX}px `,
            transition: "0.2s",
            }}
            > */}
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
        </>
      )}
    </>
  );
};

export default WelcomePage;
