const Arrow = () => {
  return (
    <>
      <svg
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 3500 300"
        className="svg-container"
      >
        <path
          id="line"
          fill="none"
          stroke="grey"
          strokeWidth="10"
          d="M18.9 128.6c62 33 186 99 311.3 28.5 37.3-21 77.3-108-81.2-92.3-175.5 17.3-6 116.6 54.4 132.5 16.7 4.4 108.5 34.2 209.9-18.6"
          className="line-path"
        />
        <path
          id="arrow"
          stroke="grey"
          fill="grey"
          strokeWidth="12"
          d="M465.7 172.9l47.1 6-29.8 33.3-17.3-39.3z"
          className="arrow-path"
        />
      </svg>
    </>
  );
};

export default Arrow;
