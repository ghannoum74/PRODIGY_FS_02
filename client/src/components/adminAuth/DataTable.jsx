import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { inputsData } from "../../utilities/inputsData";
import { useForm } from "react-hook-form";
import useDelete from "../../hooks/useDelete";
import { toast, ToastContainer } from "react-toastify";
import useUpdate from "../../hooks/useUpdate";

const DataTable = ({
  showUsersData,
  newInputIsAppear,
  setNewInputIsAppear,
  isAdminAuthenticated,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filtredData, setFiltredData] = useState("");
  const [rowId, setRowId] = useState("");
  const [updatedData, setUpdatedData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const { deleteItem, loading, error } = useDelete();
  const { updateItem, isLoading } = useUpdate();

  const fetchingData = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_GET_ALL_ADMIN,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTasks(response.data.tasks || []);
        setUsers(response.data.users || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (e, type) => {
    const id = e.currentTarget.dataset.id;
    const result = await deleteItem(id, type);
    if (result) {
      type === "user"
        ? setUsers(users.filter((data) => data._id !== id))
        : setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const onSubmit = async (data) => {
    setIsPending(true);
    delete data.description;
    delete data.title;
    delete data.type;
    // i didn't know from where i get the confirm password
    delete data.confirmPassword;
    delete data.dueDate;

    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_CREATE_USER_ADMIN,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("User Added Successfuly!", {
          hideProgressBar: true,
        });
        setUsers((prev) => [...prev, result.data.user]);
        setNewInputIsAppear("");
      } else {
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
      }
      reset();
    } catch (error) {
      if (error.response?.data?.error) {
        setError("apiError", {
          type: "server",
          message: error.response.data.error,
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  const submit = async (data) => {
    //  after admin enter the user email who want to add task for him
    // i retrieve the id from this email and set it to the data passed to back end
    const userId = users.find((user) => user.email === data.email)._id;
    [
      "firstName",
      "lastName",
      "birthday",
      "isAdmin",
      "password",
      "role",
      "gender",
      "email",
    ].forEach((key) => delete data[key]);
    data["id"] = userId;
    setIsPending(true);

    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_CREATE_TASK_ADMIN,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Task Added Successfuly!", {
          hideProgressBar: true,
        });
        setTasks((prev) => [...prev, result.data.task]);
        setNewInputIsAppear("");
      } else {
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
      }
      reset();
    } catch (error) {
      if (error.response?.data?.error) {
        setError("apiError", {
          type: "server",
          message: error.response.data.error,
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleUpdatedData = (e) => {
    const { name, value } = e.target;
    const id = e.target.dataset.id;
    setUpdatedData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      },
    }));
  };

  const handleUpdateForm = async (e, type) => {
    e.preventDefault();

    const result = await updateItem(rowId, type, updatedData[rowId]);
    if (result) {
      setRowId("");
      setUpdatedData("");
      fetchingData();
    }
  };

  const handleCancelBtn = () => {
    setRowId("");
    setUpdatedData("");
    fetchingData();
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      fetchingData();
    }
  }, [isAdminAuthenticated]);

  return (
    <>
      <ToastContainer />
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            name="searching-bar"
            placeholder={`Searching by  `}
            onChange={(e) => setFiltredData(e.target.value)}
          />
        </div>
      </div>
      <div className="dataTable">
        {isPending || loading || isLoading ? (
          <span className="loader"></span>
        ) : (
          <div className="grid-item-container">
            {showUsersData ? (
              <>
                {[
                  "",
                  "Id",
                  "First Name",
                  "Last Name",
                  "Birthday",
                  "Email",
                  "Password",
                  "Role",
                  "Gender",
                  "createdAt",
                  "Last update",
                ].map((elmnt) => (
                  <div key={elmnt} className="grid-item header id">
                    {elmnt}
                  </div>
                ))}

                <div className="grid-item header sticky-column"></div>
                {users
                  ?.filter((user) => {
                    return filtredData.toLowerCase() === ""
                      ? user
                      : Object.keys(user)?.some(
                          (key) =>
                            typeof user[key] === "string" &&
                            user[key].toLowerCase().includes(filtredData)
                        );
                  })
                  .map((row, index) => (
                    <form
                      onSubmit={(e) => handleUpdateForm(e, "user")}
                      key={row._id}
                      className={`row ${index % 2 !== 0 ? "spet" : ""}`}
                    >
                      <div className="grid-item item id">{index + 1}</div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row._id}
                      </div>
                      <input
                        value={updatedData.firstName}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                        pattern="^[a-zA-Z][a-zA-Z0-9 ]*$"
                        name="firstName"
                        className="grid-item item"
                        defaultValue={row.firstName}
                        disabled={rowId !== row._id}
                      />
                      <input
                        className="grid-item item"
                        defaultValue={row.lastName}
                        disabled={rowId !== row._id}
                        name="lastName"
                        pattern="^[a-zA-Z][a-zA-Z0-9 ]*$"
                        value={updatedData.lastName}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                      />

                      <input
                        type="date"
                        className="grid-item item"
                        defaultValue={row.birthday}
                        disabled={rowId !== row._id}
                        // {...register("birthday")}
                        name="dueDate"
                        value={updatedData.dueDate}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                      />

                      <input
                        className="grid-item item"
                        defaultValue={row.email}
                        disabled={rowId !== row._id}
                        pattern="^[a-zA-Z][a-zA-Z0-9]{2,}@(gmail|hotmail).com$"
                        name="email"
                        value={updatedData.email}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                      />

                      <div
                        style={{ cursor: "not-allowed" }}
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.password}
                      </div>
                      <select
                        className="grid-item item"
                        defaultValue={row.isAdmin.toString()}
                        name="isAdmin"
                        disabled={rowId !== row._id}
                        value={updatedData.isAdmin}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                      >
                        <option value={true}>Admin</option>
                        <option value={false}>User</option>
                      </select>
                      <select
                        className="grid-item item"
                        defaultValue={row.gender || "rather not say"}
                        disabled={rowId !== row._id}
                        name="gender"
                        value={updatedData.gender}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="rather not say">rather not say</option>
                      </select>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.createdAt}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.updatedAt}
                      </div>
                      {rowId === row._id ? (
                        <div className="grid-item item sticky-column bttns disabled">
                          <button className="add" type="submit">
                            Add
                          </button>
                          <button className="cancel" onClick={handleCancelBtn}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="grid-item item sticky-column">
                          <FontAwesomeIcon
                            className="sticky-btns"
                            icon={faPen}
                            data-id={row._id}
                            onClick={(e) =>
                              setRowId(e.currentTarget.dataset.id)
                            }
                          />
                          <div>
                            <FontAwesomeIcon
                              data-id={row._id}
                              onClick={(e) => handleDelete(e, "user")}
                              className="sticky-btns"
                              icon={faTrash}
                            />
                          </div>
                        </div>
                      )}
                    </form>
                  ))}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onChange={() => clearErrors("apiError")}
                  className={`row added-input ${
                    newInputIsAppear === "users" ? "appear" : ""
                  }`}
                >
                  <div className="grid-item item id">{users?.length + 1}</div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  {inputsData.slice(0, 5).map((user) => (
                    <div className="grid-item item" key={user.id}>
                      <input
                        className="created-input-admin"
                        type={user.type}
                        name={user.name}
                        {...register(user.name, {
                          required: `Sorry, ${user.name} description is required`,
                          pattern: {
                            value: user.match,
                            message:
                              user.name === "email"
                                ? "email should be valid"
                                : user.name === "password"
                                ? "password should be strong"
                                : user.name === "firstName" ||
                                  user.name === "lastName"
                                ? "Sorry, only letters, numbers and space"
                                : user.messageerror,
                          },
                        })}
                      />
                      <div
                        className={`error-message ${
                          errors[user.name] ? "show" : ""
                        }`}
                        style={{ width: "100%" }}
                      >
                        {errors[user.name]?.message}
                      </div>
                    </div>
                  ))}

                  <div className="grid-item item">
                    <select
                      style={{ padding: "3px" }}
                      defaultValue="false"
                      {...register("isAdmin")}
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </select>
                  </div>

                  <div className="grid-item item">
                    <select
                      style={{ padding: "3px" }}
                      {...register("gender")}
                      defaultValue="male"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="rather not say">rather not say</option>
                    </select>
                  </div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  <div className="grid-item item sticky-column bttns">
                    <button className="add">Add</button>
                    <button
                      className="cancel"
                      onClick={() => setNewInputIsAppear("")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // start tasks component
              <>
                {[
                  "",
                  "Id",
                  "Title",
                  "Description",
                  "Type",
                  "First Name",
                  "Last Name",
                  "email",
                  "Due Date",
                  "createdAt",
                  "Last update",
                ].map((elmnt) => (
                  <div key={elmnt} className="grid-item header id">
                    {elmnt}
                  </div>
                ))}

                <div className="grid-item header sticky-column"></div>
                {tasks
                  ?.filter((task) => {
                    return filtredData.toLowerCase() === ""
                      ? task
                      : Object.keys(task).some(
                          (key) =>
                            typeof task[key] === "string" &&
                            task[key].toLowerCase().includes(filtredData)
                        );
                  })
                  .map((row, index) => (
                    <form
                      onSubmit={(e) => handleUpdateForm(e, "task")}
                      key={row._id}
                      className={`row ${index % 2 !== 0 ? "spet" : ""}`}
                    >
                      <div className="grid-item item id">{index + 1}</div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row._id}
                      </div>
                      <input
                        value={updatedData.title}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                        pattern="^[a-zA-Z][a-zA-Z0-9 ]*$"
                        name="title"
                        className="grid-item item"
                        defaultValue={row.title}
                        disabled={rowId !== row._id}
                      />
                      <input
                        value={updatedData.description}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                        pattern="^[a-zA-Z][a-zA-Z0-9 ]*$"
                        name="description"
                        className="grid-item item"
                        defaultValue={row.description}
                        disabled={rowId !== row._id}
                      />

                      <select
                        defaultValue={row.type}
                        disabled={rowId !== row._id}
                        name="type"
                        value={updatedData.type}
                        onChange={handleUpdatedData}
                        data-id={row._id}
                        className="grid-item item"
                      >
                        <option>health</option>
                        <option>work</option>
                        <option>shopping</option>
                        <option>personal</option>
                      </select>

                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id
                          ? "Unchangebale"
                          : Object.values(users)?.find(
                              (user) => user._id === row.user
                            )?.firstName}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id
                          ? "Unchangebale"
                          : Object.values(users)?.find(
                              (user) => user._id === row.user
                            )?.lastName}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id
                          ? "Unchangebale"
                          : Object.values(users)?.find(
                              (user) => user._id === row.user
                            )?.email}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.dueDate}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.createdAt}
                      </div>
                      <div
                        className={`grid-item item ${
                          rowId === row._id ? "rotingtxt" : ""
                        }`}
                      >
                        {rowId === row._id ? "Unchangebale" : row.updatedAt}
                      </div>
                      {rowId === row._id ? (
                        <div className="grid-item item sticky-column bttns disabled">
                          <button className="add" type="submit">
                            Add
                          </button>
                          <button className="cancel" onClick={handleCancelBtn}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="grid-item item sticky-column">
                          <FontAwesomeIcon
                            className="sticky-btns"
                            icon={faPen}
                            data-id={row._id}
                            onClick={(e) =>
                              setRowId(e.currentTarget.dataset.id)
                            }
                          />
                          <div>
                            <FontAwesomeIcon
                              data-id={row._id}
                              onClick={(e) => handleDelete(e, "task")}
                              className="sticky-btns"
                              icon={faTrash}
                            />
                          </div>
                        </div>
                      )}
                    </form>
                  ))}

                <form
                  onSubmit={handleSubmit(submit)}
                  className={`row added-input${
                    newInputIsAppear === "tasks" ? "appear" : ""
                  }`}
                >
                  <div className="grid-item item id">{tasks?.length + 1}</div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  {["title", "description"].map((task) => (
                    <div className="grid-item item" key={task}>
                      <input
                        className="created-input-admin"
                        type="text"
                        name={task}
                        {...register(task, {
                          required: `Sorry, ${task} description is required`,

                          pattern: {
                            value: /^[a-zA-Z][a-zA-Z0-9 ]{3,}$/,
                            message:
                              "Sorry, only letters (a-z), numbers (0-9), and space are allowed.",
                          },
                        })}
                      />
                      <div
                        className={`error-message ${
                          errors[task] ? "show" : ""
                        }`}
                        style={{ width: "100%" }}
                      >
                        {errors[task.name]?.message}
                      </div>
                    </div>
                  ))}
                  <div className="grid-item item">
                    <select style={{ padding: "0.2rem" }} {...register("type")}>
                      <option>health</option>
                      <option>work</option>
                      <option>shopping</option>
                      <option>personal</option>
                    </select>
                  </div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  <div className="grid-item item rotingtxt">Unchangebale</div>
                  <div className="grid-item item">
                    <select
                      required
                      style={{ padding: "0.2rem" }}
                      {...register("email")}
                    >
                      {users.map((user) => (
                        <option key={user._id} value={user.email}>
                          {user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid-item item">
                    <input
                      className="created-input-admin"
                      type="datetime-local"
                      name="dueDate"
                      {...register("dueDate", {
                        required: `Sorry, dueDate is required`,
                      })}
                    />
                  </div>
                  {["", ""].map((_, index) => (
                    <div className="grid-item item rotingtxt" key={index}>
                      Unchangebale
                    </div>
                  ))}

                  <div className="grid-item item sticky-column bttns">
                    <button className="add">Add</button>
                    <button
                      className="cancel"
                      onClick={() => setNewInputIsAppear("")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
      {error && <h1>{error}</h1>}
    </>
  );
};

DataTable.propTypes = {
  showUsersData: PropTypes.bool,
  isAdminAuthenticated: PropTypes.bool,
  newInputIsAppear: PropTypes.string,
  setNewInputIsAppear: PropTypes.func,
};

export default DataTable;
