import { useForm } from "react-hook-form";
import {
  faBriefcase,
  faCartShopping,
  faHeartPulse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import ImageLogo from "../authenticationComponents/ImageLogo";
import { useDispatch } from "react-redux";
import { renderWithTheNewTask } from "../../redux/taskAddedSuccessfuly";

const AddTaskpupop = ({ icon, color, type, setAddTaskPupopAppear }) => {
  const icons = {
    briefcase: faBriefcase,
    user: faUser,
    cartShopping: faCartShopping,
    heartPulse: faHeartPulse,
  };

  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      type: "",
    },
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    data = { ...data, type };
    // to trim
    for (const key in data) {
      if (key === "dueDate") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }

    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_CREATE_USER_TASK,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Task Created Successfuly!", {
          hideProgressBar: true,
        });
        // this is to render the task component with the new task
        dispatch(renderWithTheNewTask());
        reset();
      } else {
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data?.message) {
          setError("apiError", {
            type: "server",
            message: error.response.data.message,
          });
        } else {
          setError("apiError", {
            type: "server",
            message: error.response.data,
          });
        }
      } else {
        // Handle cases where error.response is not available
        setError("apiError", {
          type: "server",
          message: "An unknown error occurred.",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {/* <AnimatePresence> */}
      {/* globale state for toggling between login and sign in */}

      <motion.div
        key="addTaskPopup"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="container-authPage"
      >
        {isPending && (
          <div className="loading">
            <div></div>
          </div>
        )}

        <div className="icon addTask">
          <FontAwesomeIcon
            className="icon"
            icon={icons[icon]}
            style={{ color: color, fontSize: "7rem" }}
          />
        </div>
        <>
          <ImageLogo header="Create Your Task" desc="Enter your Information" />
          <form
            onChange={() => clearErrors("apiError")}
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="auth-form bithday-page"
          >
            <div
              //   className={`cont-input ${errors[input.name] ? "invalid" : ""}`}
              className="cont-input"
            >
              <input
                type="text"
                name="input"
                id="id"
                className="input"
                placeholder=""
                {...register("title", {
                  required: "Sorry, title is required",
                  // pattern: {
                  //   value: inputsData[3].match,
                  //   message: inputsData[3].messageerror,
                  // },
                })}
              />
              <label className="each-label">Title</label>

              <div
                className={`error-message $
                    // errors[input.name] ? "show" : ""
                `}
              ></div>
            </div>
            <div
              // className={`cont-input ${errors[input.name] ? "invalid" : ""}`}
              className="cont-input"
            >
              <textarea
                className="input"
                placeholder=""
                {...register("description", {
                  required: "Sorry, task description is required",
                })}
              ></textarea>

              <label className="each-label">your Task</label>

              {/* <div
                className={`error-message $
                    // errors[input.name] ? "show" : ""
                `}
              ></div> */}
            </div>

            <div
              // className={`cont-input ${errors[input.name] ? "invalid" : ""}`}
              className="cont-input"
            >
              <input
                className="input"
                type="datetime-local"
                name="input"
                id="id"
                placeholder=""
                {...register("dueDate", {
                  required: "Sorry, task description is required",
                  // pattern: {
                  //   value: inputsData[3].match,
                  //   message: inputsData[3].messageerror,
                  // },
                })}
              />

              <label className="each-label">Task Time</label>

              {/* <div
                className={`error-message $
                    // errors[input.name] ? "show" : ""
                `}
              ></div> */}
            </div>

            {/* general error comes from API */}
            {errors.apiError && (
              <div className={`error-message-Api show`}>
                {errors?.apiError?.message}
              </div>
            )}

            <div className="last-one">
              <div
                className="switch-bttn yes"
                onClick={() => setAddTaskPupopAppear(false)}
                style={{
                  cursor: "pointer",
                }}
              >
                Back
              </div>
              <button type="submit" className="switch-bttn no">
                Create
              </button>
            </div>
            {/* general error comes from API */}
          </form>
        </>
      </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};

AddTaskpupop.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  setAddTaskPupopAppear: PropTypes.func,
};
export default AddTaskpupop;
