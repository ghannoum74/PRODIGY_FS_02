import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LogoutPupop = ({ setLogoutPupop }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user-authenticate");
    navigate("/");
  };
  return (
    <div className="blured-backg">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="container-authPage"
        >
          <h5>Are you sure do you want leave us?</h5>
          <div className="btn-logout-pupop">
            <button className="switch-bttn yes" onClick={handleLogout}>
              Yes
            </button>
            <button
              className="switch-bttn no"
              onClick={() => setLogoutPupop(false)}
            >
              No
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

LogoutPupop.propTypes = {
  setLogoutPupop: PropTypes.func,
};

export default LogoutPupop;
