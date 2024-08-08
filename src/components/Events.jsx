import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Events = ({ data }) => {
  return (
    <>
      {data?.map((event, index) => {
        const { actor, type, repo, created_at } = event;
        const { login, avatar_url } = actor || {};

        return (
          <div key={index} className="flex gap-x-4 items-center mb-4">
            {login && (
              <Link to={`/${login}`}>
                <img
                  src={avatar_url}
                  alt={`${login}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </Link>
            )}
            <div className="flex flex-col">
              <h1 className="font-semibold">
                {login && <span>{login}</span>} {type && <span>{type}</span>}
              </h1>
              {repo?.name && (
                <p className="text-sm text-gray-600">{repo.name}</p>
              )}
              {created_at && (
                <span className="text-xs text-gray-500">
                  {format(created_at)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Events;
