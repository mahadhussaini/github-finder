import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Loading from "../components/Loading";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("repos");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const EndPoint = "https://api.github.com/users";

  const GetUserInfo = useCallback(async () => {
    try {
      const res = await fetch(EndPoint + pathname);
      if (!res.ok) {
        throw new Error("Failed to fetch user information");
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [pathname, EndPoint]);

  const GetUrls = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${EndPoint + pathname}/${type}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [pathname, type, EndPoint]);

  useEffect(() => {
    GetUserInfo();
    GetUrls();
  }, [GetUserInfo, GetUrls]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {user && (
        <div
          className="flex justify-center md:flex-row
          md:px-0 px-4 flex-col gap-10"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
          />
          <div className="text-lg leading-10 px-3">
            <h1 className="text-3xl pb-4">{user.name}</h1>
            <h1>
              <span className="text-teal-400">Login_name</span>: {user.login}
            </h1>
            <h1>
              <span className="text-teal-400">Followers</span>: {user.followers}
            </h1>
            <h1>
              <span className="text-teal-400">Following</span>: {user.following}
            </h1>
            <h1>
              <span className="text-teal-400">Public Repositories</span>:{" "}
              {user.public_repos}
            </h1>
            <h1>
              <span className="text-teal-400">Joined</span>:{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600 my-3 tracking-wide"
            >
              Visit
            </a>
          </div>
        </div>
      )}
      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl ">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {!loading && type === "repos" && users.length > 0 && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          <Repo users={users} />
        </div>
      )}
      {!loading && type === "received_events" && users.length > 0 && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          <Events data={users} />
        </div>
      )}
      {!loading && type === "followers" && users.length > 0 && (
        <UsersContainer users={users} />
      )}
    </div>
  );
};

export default UserInfo;
