import {
  faBriefcase,
  faCartShopping,
  faHeartPulse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddTaskpupop from "./addTaskpupop";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const Category = ({ setAddTaskPupopAppear, addTaskPupopAppear }) => {
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  const createTask = (e) => {
    setAddTaskPupopAppear(true);
    setIcon(e.currentTarget.dataset.icon);
    setColor(e.currentTarget.dataset.color);
    setType(e.currentTarget.dataset.type);
  };

  return (
    <>
      <AnimatePresence>
        {addTaskPupopAppear && (
          <div className="blured-backg">
            <AddTaskpupop
              icon={icon}
              color={color}
              type={type}
              setAddTaskPupopAppear={setAddTaskPupopAppear}
            />
          </div>
        )}
      </AnimatePresence>
      <div className="category">
        <h5 className="category-header">Categories</h5>
        <div className="catrgory-container">
          <div
            className="catg"
            data-icon="briefcase"
            data-color="#85afee"
            data-type="work"
            onClick={createTask}
          >
            <div className="each-categ" data-color="blue">
              <FontAwesomeIcon
                className="icon"
                icon={faBriefcase}
                style={{ color: "#85afee" }}
              />
            </div>
            <div className="caption">Work</div>
          </div>
          <div
            className="catg"
            data-icon="user"
            data-type="personal"
            data-color="#e5ba1f"
            onClick={createTask}
          >
            <div className="each-categ" data-color="yellow">
              <FontAwesomeIcon
                className="icon"
                icon={faUser}
                style={{ color: "#e5ba1f" }}
              />
            </div>
            <div className="caption">Personal</div>
          </div>
          <div
            className="catg"
            data-icon="cartShopping"
            data-type="shopping"
            data-color="#51c44f"
            onClick={createTask}
          >
            <div className="each-categ" data-color="green">
              <FontAwesomeIcon
                className="icon"
                icon={faCartShopping}
                style={{ color: "#51c44f" }}
              />
            </div>
            <div className="caption">Shopping</div>
          </div>
          <div
            className="catg"
            data-icon="heartPulse"
            data-type="health"
            data-color="#c73d74"
            onClick={createTask}
          >
            <div className="each-categ" data-color="red">
              <FontAwesomeIcon
                className="icon"
                icon={faHeartPulse}
                style={{ color: "#c73d74" }}
              />
            </div>
            <div className="caption">Health</div>
          </div>
        </div>
      </div>
    </>
  );
};

Category.propTypes = {
  setAddTaskPupopAppear: PropTypes.func,
  addTaskPupopAppear: PropTypes.bool,
};

export default Category;
