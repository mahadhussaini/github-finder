import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Logo = ({
  src = "https://cdn3.iconfinder.com/data/icons/inficons/512/github.png",
  alt = "GitHub Logo",
  size = "24",
  title = "GitHub Users",
}) => {
  return (
    <Link
      to="/"
      className="flex border-b border-gray-500 pb-2 justify-center items-center"
    >
      <img
        src={src}
        alt={alt}
        className={`w-${size} h-${size} rounded-full object-cover`}
      />
      <h1 className="text-2xl px-2 first-letter:text-5xl">{title}</h1>
    </Link>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
};

export default Logo;
