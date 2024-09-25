import PropTypes from "prop-types";

const ImageLogo = ({ header, desc }) => {
  return (
    <>
      {/* <img
        src="https://prodigyinfotech.dev/assets/images/logo/logo.svg"
        alt="invalid"
      /> */}
      <h3 className="header">{header}</h3>
      <div className="desc-page">{desc}</div>
    </>
  );
};

ImageLogo.propTypes = {
  header: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

export default ImageLogo;
