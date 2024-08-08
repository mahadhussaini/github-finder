import React from "react";
import PropTypes from "prop-types";

const Repo = ({ users }) => {
  return (
    <>
      {users.map((user, idx) => {
        const { html_url, full_name, language, forks, stargazers_count } = user;

        return (
          <div key={idx} className="bg-gray-900 p-4 leading-8 rounded-lg mb-3">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 break-words font-semibold hover:underline"
            >
              {full_name}
            </a>
            <div className="flex gap-x-5 mt-2">
              {language && (
                <h1 className="text-sm font-semibold">
                  {"🟢"} {language}
                </h1>
              )}
              <h1 className="text-sm font-semibold">Forks: {forks}</h1>
              <h1 className="text-sm font-semibold">
                Stars: {stargazers_count}
              </h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

Repo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      html_url: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      language: PropTypes.string,
      forks: PropTypes.number.isRequired,
      stargazers_count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Repo;
