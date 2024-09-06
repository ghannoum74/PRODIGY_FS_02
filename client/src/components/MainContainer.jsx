import PropTypes from "prop-types";

const MainContainer = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

MainContainer.propTypes = {
  children: PropTypes.node,
};
export default MainContainer;
