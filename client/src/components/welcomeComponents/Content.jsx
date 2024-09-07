import TypeWriterEffect from "react-typewriter-effect";

const Content = () => {
  return (
    <>
      <div className="welcome-content">
        <h1 className="welcome-header">Welcome to TaskNest</h1>

        <TypeWriterEffect
          textStyle={{
            fontFamily: "Arial, sans-serif",
            color: "#3F3D56",
            fontWeight: 600,
            fontSize: "1.1em",
            width: "70%",
            textAlign: "center",
            margin: "auto",
          }}
          startDelay={1500}
          text="will helps you to stay organized and perform your tasks much faster"
          typeSpeed={50}
          cursorColor="transparent"
        />
      </div>
    </>
  );
};

export default Content;
