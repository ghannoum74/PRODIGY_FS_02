import PropTypes from "prop-types";
import { motion } from "framer-motion";

const AnimateLoginSignin = ({ children }) => {
  const animations = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="animatedWrapperLogin"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

AnimateLoginSignin.propTypes = {
  children: PropTypes.node,
};

export default AnimateLoginSignin;
