import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inputsData } from "../utilities/inputsData";
import ImageLogo from "../components/authenticationComponents/ImageLogo";
import Submit from "../components/authenticationComponents/Submit";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import AnimateLoginSignin from "../utilities/pageAnimation/AnimateLoginSignin";
import { saveUserData } from "../redux/saveUserDataSlice";
import PropTypes from "prop-types";

const AuthenticationPage = ({ setIsUserAuthenticated }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const isLoginVisible = useSelector(
    (state) => state.toggleLoginSign.isLoginComponentVisible
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    watch,
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

  const validationConfirmPassword = (value) => {
    if (value !== watch("password")) {
      return "Confirm Password does not match the Password!";
    }
    return true;
  };

  const onSubmit = async (data) => {
    setIsPending(true);
    // to trim
    for (const key in data) {
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }
    // delete confirm password from data
    delete data.confirmPassword;
    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_POST_SIGNUP_URL,
        data
      );
      if (result.status === 200) {
        toast.success("Form Submit Successfuly!", {
          hideProgressBar: true,
        });

        Object.entries(result.data.user).forEach(([key, value]) => {
          dispatch(saveUserData({ key, value }));
        });
        setIsUserAuthenticated(true);
        localStorage.setItem("id", result.data.user._id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user-authenticate", result.data.user.isAdmin);
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

  const submitLogin = async (data) => {
    // because i used the same useForm so the data is initialized by all the data
    delete data.firstName;
    delete data.lastName;
    delete data.birthday;
    delete data.confirmPassword;

    setIsPending(true);
    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_POST_LOGIN_URL,
        data
      );
      if (result.status === 200) {
        toast.success("Form Submited Successfuly!", {
          hideProgressBar: true,
        });
        setIsUserAuthenticated(true);
        // console.log(result);
        Object.entries(result.data.user).forEach(([key, value]) => {
          dispatch(saveUserData({ key, value }));
        });
        localStorage.setItem("id", result.data.user._id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user-authenticate", true);
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
        {isLoginVisible ? (
          <AnimateLoginSignin>
            <h3 className="header" style={{ textAlign: "center" }}>
              Login to TaskNest
            </h3>
            <div className="desc-page">Enter your Information</div>
            <form
              onSubmit={handleSubmit(submitLogin)}
              onChange={() => clearErrors("apiError")}
              className="auth-form"
              action={import.meta.env.VITE_REACT_APP_POST_LOGIN_UR}
              method="POST"
            >
              <div className="cont-input" key={inputsData[3].id}>
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

              <div className="cont-input" key={inputsData[4].id}>
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

              <Submit caption="I Don't have an account" btn="Log in" />
            </form>
          </AnimateLoginSignin>
        ) : (
          <>
            <ImageLogo
              header="Create TaskNest account"
              desc="Enter your Information"
            />
            <form
              onChange={() => clearErrors("apiError")}
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              className="auth-form bithday-page"
            >
              {inputsData.map((input) => (
                <div
                  className={`cont-input ${
                    errors[input.name] ? "invalid" : ""
                  }`}
                  key={input.id}
                >
                  <input
                    type={
                      input.name === "password"
                        ? isPasswordShow
                          ? "text"
                          : "password"
                        : input.type
                    }
                    name={input.name}
                    id={input.id}
                    className={input.className}
                    placeholder={input.placeholder}
                    {...register(input.name, {
                      required: `Sorry, ${input.label} is required`,
                      pattern: input.match
                        ? {
                            value: input.match,
                            message: `${input.messageerror}`,
                          }
                        : undefined,
                      validate:
                        input.name === "confirmPassword"
                          ? validationConfirmPassword
                          : undefined,
                    })}
                  />
                  <label className="each-label">{input.label}</label>
                  {input.name === "password" && (
                    <FontAwesomeIcon
                      className="show-password"
                      onClick={togglePassword}
                      icon={isPasswordShow ? faEyeSlash : faEye}
                      style={{ color: "#5f6368" }}
                    />
                  )}
                  <div
                    className={`error-message ${
                      errors[input.name] ? "show" : ""
                    }`}
                  >
                    {errors[input.name]?.message}
                  </div>
                </div>
              ))}
              {/* general error comes from API */}
              {errors.apiError && (
                <div className={`error-message-Api show`}>
                  {errors.apiError.message}
                </div>
              )}

              <Submit caption=" I have already an account" btn="Sign Up" />
            </form>
          </>
        )}{" "}
      </motion.div>
    </>
  );
};

AuthenticationPage.propTypes = {
  setIsUserAuthenticated: PropTypes.func,
};
export default AuthenticationPage;
