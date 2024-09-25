import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";
import PropTypes from "prop-types";

import Submit from "../authenticationComponents/Submit";
import { inputsData } from "../../utilities/inputsData";
import AnimateLoginSignin from "../../utilities/pageAnimation/AnimateLoginSignin";
import { useNavigate } from "react-router-dom";

const AdminAuthentication = ({ setIsAdminAuthenticated }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePassword = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const submitLogin = async (data) => {
    // because i used the same useForm so the data is initialized by all the data
    delete data.firstName;
    delete data.lastName;
    delete data.birthday;
    delete data.confirmPassword;

    setIsPending(true);
    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_LOGIN_ADMIN,
        data
      );
      if (result.status === 200) {
        toast.success("Welcome Home Boss!", {
          hideProgressBar: true,
        });
        setIsAdminAuthenticated(true);
        localStorage.setItem("id", result.data.user._id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user-authenticate", true);
        localStorage.setItem("isAdmin", true);
      } else {
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
      }
      reset();
    } catch (error) {
      if (error.response?.data?.message) {
        setError("apiError", {
          type: "server",
          message: error.response.data.message,
        });
      } else if (error.response?.data) {
        setError("apiError", {
          type: "server",
          message: error.response.data,
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    // <AnimatedPage>
    <>
      {/* globale state for toggling between login and sign in */}
      <motion.div
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

        <AnimateLoginSignin>
          <h3 className="header" style={{ textAlign: "center" }}>
            Welcome back Boss
          </h3>
          <div className="desc-page">Enter your Information</div>
          <form
            onSubmit={handleSubmit(submitLogin)}
            onChange={() => clearErrors("apiError")}
            className="auth-form"
            action={import.meta.env.VITE_REACT_APP_POST_LOGIN_UR}
            method="POST"
          >
            <div className="cont-input">
              <input
                name={inputsData[3].name}
                id={inputsData[3].id}
                className={inputsData[3].className}
                placeholder={inputsData[3].placeholder}
                {...register(inputsData[3].name, {
                  required: `Sorry, ${inputsData[3].label} is required`,
                  pattern: {
                    value: inputsData[3].match,
                    message: inputsData[3].messageerror,
                  },
                })}
              />
              <label className="each-label">{inputsData[3].label}</label>
              <div
                className={`error-message ${
                  errors[inputsData[3].name] ? "show" : ""
                }`}
              >
                {errors[inputsData[3].name]?.message}
              </div>
            </div>

            <div className="cont-input">
              <input
                id={inputsData[4].id}
                type={isPasswordShow ? "text" : inputsData[4].type}
                name={inputsData[4].name}
                className={inputsData[4].className}
                placeholder={inputsData[4].placeholder}
                pattern={inputsData[4].pattern}
                {...register(inputsData[4].name, {
                  required: `Sorry, ${inputsData[4].label} is required`,
                  pattern: {
                    value: inputsData[4].match,
                    message: inputsData[4].messageerror,
                  },
                })}
              />
              <label className="each-label">{inputsData[4].label}</label>
              <div
                className={`error-message ${
                  errors[inputsData[4].name] ? "show" : ""
                }`}
              >
                {errors[inputsData[4].name]?.message}
              </div>
              <FontAwesomeIcon
                className="show-password"
                onClick={togglePassword}
                icon={isPasswordShow ? faEyeSlash : faEye}
                style={{ color: "#5f6368" }}
              />
            </div>
            {/* general error comes from API */}
            {errors.apiError && (
              <div className={`error-message-Api show`}>
                {errors.apiError.message}
              </div>
            )}

            <div className="forget-email">
              {/* <Link to="/loginPage/ForgetEmailPage" className="forget-page">
              Forget email?
            </Link> */}
            </div>

            <div className="last-one">
              <div
                className="switch-bttn"
                style={{
                  backgroundColor: "var(--errorColor)",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                return
              </div>
              <button type="submit" className="switch-bttn">
                Log in
              </button>
            </div>
          </form>
        </AnimateLoginSignin>
      </motion.div>
    </>
  );
};

AdminAuthentication.propTypes = {
  setIsAdminAuthenticated: PropTypes.func,
};
export default AdminAuthentication;
