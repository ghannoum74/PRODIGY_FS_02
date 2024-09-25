import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  faBriefcase,
  faCartShopping,
  faHeartPulse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const UpdateTaskDataPopup = ({
  activeTask,
  setActiveTask,
  setTaskUpdated,
  taskUpdated,
}) => {
  const icons = {
    work: [faBriefcase, "#007bff"],
    personal: [faUser, "#f5c542"],
    shopping: [faCartShopping, "#4a9d40"],
    health: [faHeartPulse, "#b02d5c"],
  };
  const iconKeys = Object.keys(icons);

  const [isPending, setIsPending] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    iconKeys.indexOf([activeTask.type][0])
  );

  const castStringToDate = () => {
    const dateObject = new Date(activeTask.dueDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const {
    register,
    clearErrors,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: activeTask.title,
      description: activeTask.description,
      dueDate: castStringToDate(),
      type: icons[activeTask.type][0],
    },
  });

  const onSubmit = async (data) => {
    setIsPending(true);

    // to trim
    for (const key in data) {
      if (key === "dueDate") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }
    data = { ...data, taskId: activeTask._id };
    const type = iconKeys.find(
      (key) => icons[key][0].iconName === data.type.iconName
    );
    data["type"] = type;
    try {
      const result = await axios.patch(
        import.meta.env.VITE_REACT_APP_GET_UPDATE_TASK,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Task Updated Successfuly!", {
          hideProgressBar: true,
        });
        reset();
        setTaskUpdated(!taskUpdated);
        setActiveTask(false);
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

  const updateFormType = (index) => {
    const selectedIconKey = iconKeys[index];
    setValue("type", icons[selectedIconKey][0]);
  };

  const prevSlide = () => {
    const currIndx =
      currentIndex === 0 ? iconKeys.length - 1 : currentIndex - 1;
    setCurrentIndex(currIndx);
    updateFormType(currIndx);
  };

  const nextSlide = () => {
    const currIndx =
      currentIndex === iconKeys.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(currIndx);
    updateFormType(currIndx);
  };

  return (
    <>
      <ToastContainer />
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
        <>
          <form
            onChange={() => clearErrors("apiError")}
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="auth-form bithday-page"
          >
            <div className="carousel-container">
              <div className="carusal-btn prev" onClick={prevSlide}>
                &#10094;
              </div>

              {iconKeys.map((key, index) => (
                <FontAwesomeIcon
                  key={iconKeys[index]}
                  className={`icons ${index === currentIndex ? "" : "hidden"}`}
                  icon={icons[iconKeys[index]][0]}
                  style={{
                    color: icons[iconKeys[index]][1],
                    fontSize: "7rem",
                    marginBottom: "1rem",
                  }}
                />
              ))}

              <div className="carusal-btn next" onClick={nextSlide}>
                &#10095;
              </div>
              <input type="hidden" {...register("type")} />
            </div>
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
                onClick={() => setActiveTask(false)}
                style={{
                  cursor: "pointer",
                }}
              >
                Back
              </div>
              <button type="submit" className="switch-bttn no">
                Update
              </button>
            </div>
            {/* general error comes from API */}
          </form>
        </>
      </motion.div>
    </>
  );
};

UpdateTaskDataPopup.propTypes = {
  activeTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  setActiveTask: PropTypes.func.isRequired,
  setTaskUpdated: PropTypes.func.isRequired,
  taskUpdated: PropTypes.bool.isRequired,
};

export default UpdateTaskDataPopup;
