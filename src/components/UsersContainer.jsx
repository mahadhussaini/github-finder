import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UsersContainer = ({ users }) => {
  if (!users || users.length === 0) {
    return <div className="text-lg text-center">No users available</div>;
  }

  return (
    <div className="flex gap-5 flex-wrap justify-center py-5">
      {users.map((user, idx) => {
        const { login, avatar_url, name } = user;

        return (
          <div
            key={idx}
            className="flex w-[200px] border border-gray-500 bg-gray-900 p-3 flex-col items-center rounded-lg"
          >
            <img
              src={avatar_url}
              alt={`${login}'s avatar`}
              className="w-24 mb-4 border-4 border-teal-400 rounded-full object-cover"
            />
            <h1 className="text-xl text-white">{login}</h1>
            {name && <h2 className="text-xs text-teal-400">{name}</h2>}
            <Link to={`/${login}`}>
              <span className="text-gray-200 font-semibold rounded block px-4 py-1 bg-teal-600 mt-3 tracking-wide hover:bg-teal-500 transition">
                View
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

UsersContainer.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default UsersContainer;
