import React from "react";
import PropTypes from "prop-types";

const Loading = ({
  size = "16",
  color = "teal-400",
  ariaLabel = "Loading...",
}) => {
  return (
    <div className="h-96 flex justify-center items-center">
      <div
        aria-label={ariaLabel}
        role="status"
        className={`border-${size} p-${
          parseInt(size) / 4
        } rounded-full border-b-transparent border-${color} animate-spin`}
      ></div>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Loading;
