import { useState } from "react";
// import Footer from "../components/Footer";
import BoxHeader from "../components/homeComponents/BoxHeader";
import Category from "../components/homeComponents/Category";
import Tasks from "../components/homeComponents/Tasks";
import AuthenticationPage from "./AuthenticationPage";
import ProfileHeader from "../components/homeComponents/ProfileHeader";
import { AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  // this is to share it with category and the icon plus in the footer
  const [addTaskPupopAppear, setAddTaskPupopAppear] = useState(false);
  return (
    <>
      <div className="homePage">
        <AnimatePresence>
          {!isUserAuthenticated &&
            !localStorage.getItem("user-authenticate") && (
              <div className="blured-backg">
                <AuthenticationPage
                  setIsUserAuthenticated={setIsUserAuthenticated}
                />
              </div>
            )}
        </AnimatePresence>
        <ProfileHeader />
        <BoxHeader />
        <Category
          setAddTaskPupopAppear={setAddTaskPupopAppear}
          addTaskPupopAppear={addTaskPupopAppear}
        />
        <Tasks />
      </div>
      {/* <Footer setAddTaskPupopAppear={setAddTaskPupopAppear} /> */}
    </>
  );
};

export default HomePage;
