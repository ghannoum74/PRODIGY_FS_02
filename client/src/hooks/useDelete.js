import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useDelete = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteItem = async (id, type) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        type === "user"
          ? `${import.meta.env.VITE_REACT_DELETE_USER_ADMIN}/${id}`
          : `${import.meta.env.VITE_REACT_DELETE_TASK_ADMIN}/${id}`,
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
  return { deleteItem, loading, error };
};
export default useDelete;
