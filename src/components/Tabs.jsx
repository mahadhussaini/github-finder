import React from "react";
import PropTypes from "prop-types";

const Tabs = ({ type, setType }) => {
  const tabs = [
    { label: "Repositories", value: "repos" },
    { label: "Activity", value: "received_events" },
    { label: "Followers", value: "followers" },
  ];

  return (
    <div className="flex gap-x-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`py-2 px-4 text-sm font-semibold ${
            type === tab.value
              ? "text-teal-400 border-b-2 border-teal-400"
              : "text-gray-400 hover:text-teal-400"
          }`}
          onClick={() => setType(tab.value)}
          aria-pressed={type === tab.value}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

export default Tabs;
