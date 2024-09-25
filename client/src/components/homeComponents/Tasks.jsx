import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import UpdateTaskDataPopup from "./UpdateTaskDataPopup";
import { motion } from "framer-motion";

const Tasks = () => {
  const [isPending, setIsPending] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState({});
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByType, setSortByType] = useState(false);
  const [activeTask, setActiveTask] = useState();
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState("");
  const [taskDeleted, setTaskDeleted] = useState("");

  const taskAdded = useSelector(
    (state) => state.taskAddedSuccessfuly.isTaskAdded
  );

  const fetchingTasks = async () => {
    if (localStorage.getItem("user-authenticate")) {
      setIsPending(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_REACT_APP_GET_USER_TASK}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (result) {
          setTasks(result.data[0].tasks);
          setSortedTasks(result.data[0].tasks);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data?.message) {
            toast.error(error.response.data.message, {
              hideProgressBar: true,
            });
          } else {
            toast.error(error.response.data, {
              hideProgressBar: true,
            });
          }
        } else {
          toast.error("An unknown error occurred.", {
            hideProgressBar: true,
          });
        }
      } finally {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    fetchingTasks();
    setSortByDate(false);
    setSortByType(false);
  }, [localStorage.getItem("user-authenticate"), taskAdded, taskUpdated]);

  const handleSorting = (sortBy) => {
    if (sortBy === "date") {
      setSortByType(false);

      setTasks(
        [...sortedTasks].sort((a, b) => {
          const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);

          if (sortByDate) {
            return dateComparison;
          }

          return -dateComparison;
        })
      );

      setSortByDate(!sortByDate);
    } else if (sortBy === "type") {
      setSortByDate(false);

      setTasks(
        [...sortedTasks].sort((a, b) => {
          const typeComparison = a.type.localeCompare(b.type);

          if (sortByType) {
            return typeComparison;
          }

          return -typeComparison;
        })
      );

      setSortByType(!sortByType);
    }
  };

  const handleUpdateTask = (taskId) => {
    setActiveTask(tasks.find((obj) => obj._id === taskId));
  };

  // i used the same function for the update to completed and delete task
  const handleCompletedTask = async (taskId, behavior) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_GET_DELETE_TASK}/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Task Removed Successfuly!", {
          hideProgressBar: true,
        });
        if (behavior === "update") {
          setTaskCompleted(tasks.find((obj) => obj._id === taskId));
          setTimeout(() => {
            const removedTasks = tasks.filter((obj) => obj._id !== taskId);
            setTasks(removedTasks);
          }, 2500);
        } else {
          setTaskDeleted(tasks.find((obj) => obj._id === taskId));
          setTimeout(() => {
            const removedTasks = tasks.filter((obj) => obj._id !== taskId);
            setTasks(removedTasks);
          }, 2500);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {isPending ? (
        <span className="loader"></span>
      ) : (
        <motion.div className="tasks">
          <h5 className="tasks-header">Tasks </h5>
          <AnimatePresence>
            {activeTask && (
              <div className="blured-backg">
                <UpdateTaskDataPopup
                  activeTask={activeTask}
                  setActiveTask={setActiveTask}
                  setTaskUpdated={setTaskUpdated}
                  taskUpdated={taskUpdated}
                />
              </div>
            )}
          </AnimatePresence>

          <div className="sorting-bar-container">
            <div className="tasks-container">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className={`each-task 
                     ${
                       taskCompleted._id === task._id
                         ? "completed"
                         : taskDeleted._id === task._id
                         ? "deleted"
                         : ""
                     }`}
                    data-icon={task.type}
                    key={task._id}
                    onDoubleClick={() =>
                      handleCompletedTask(task._id, "update")
                    }
                  >
                    <div className="description">
                      <div className="task-title">
                        {task.title.charAt(0).toUpperCase() +
                          task.title.slice(1)}
                      </div>
                      <small className="task-description">
                        {task.description}
                      </small>
                    </div>
                    <div className="icons-holder">
                      <FontAwesomeIcon
                        onClick={() => handleUpdateTask(task._id)}
                        className="each-task-bttns update"
                        icon={faPenToSquare}
                        style={{ color: "#a2aec3", marginRight: "1rem" }}
                      />
                      <FontAwesomeIcon
                        className="each-task-bttns delete"
                        onClick={() => handleCompletedTask(task._id, "delete")}
                        icon={faTrash}
                        style={{ color: "#a2aec3", marginRight: "1rem" }}
                      />
                    </div>
                    <div className="container-time">
                      <div className="task-date">
                        {new Date(task.dueDate).toLocaleString().split(",")[0]}
                      </div>
                      <div className="task-time">
                        {new Date(task.dueDate).toLocaleString().split(",")[1]}
                      </div>
                    </div>
                  </motion.div>

                  // </svg>
                ))
              ) : (
                <h3 className="rotingtxt">No data available</h3>
              )}
            </div>
            <div className={`sorting-bar ${tasks.length > 0 ? "" : "hidden"}`}>
              <div
                className={`sort-data ${sortByDate ? "sorted" : ""}`}
                onClick={() => handleSorting("date")}
              >
                sort by Date
              </div>
              <div
                className={`sort-data ${sortByType ? "sorted" : ""}`}
                onClick={() => handleSorting("type")}
              >
                sort by type
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Tasks;
