import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateItem = async (id, type, data) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        type === "user"
          ? `${import.meta.env.VITE_REACT_UPDATE_USER_ADMIN}/${id}`
          : `${import.meta.env.VITE_REACT_UPDATE_TASK_ADMIN}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        setError(response.data.error);
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
        return false;
      }

      toast.success(
        `${type === "user" ? "User" : "Task"} deleted Successfuly`,
        {
          hideProgressBar: true,
        }
      );
      setError("");
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateItem, isLoading };
};
export default useUpdate;
