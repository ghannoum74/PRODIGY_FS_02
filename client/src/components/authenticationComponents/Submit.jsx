import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { toggleLoginsignin } from "../../redux/toggleLoginSignSlice";

const Submit = ({ caption, btn }) => {
  const dispatch = useDispatch();
  return (
    <div className="last-one">
      <div
        className="switch-page"
        // toggle between log in and sign in
        onClick={() => dispatch(toggleLoginsignin())}
      >
        {caption}
      </div>
      <button type="submit" className="switch-bttn">
        {btn}
      </button>
    </div>
  );
};

Submit.propTypes = {
  caption: PropTypes.string,
  btn: PropTypes.string,
};

export default Submit;
