import React, { useEffect, useState, useRef } from "react";
import Loading from "../components/Loading";
import UsersContainer from "../components/UsersContainer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInput = useRef("");

  const ENDPOINT = "https://api.github.com/users";

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchUser = async () => {
    try {
      setLoading(true);
      const username = userInput.current.value.trim();
      if (username) {
        const res = await fetch(`${ENDPOINT}/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUsers([data]);
      } else {
        await fetchAllUsers();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      userInput.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchUser();
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-center h-11 my-5 items-center">
        <input
          placeholder="Search GitHub username"
          ref={userInput}
          type="text"
          className="h-full md:w-1/3 outline-none text-gray-800 px-2 font-semibold text-lg w-2/3"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={searchUser}
          className="bg-teal-500 font-semibold px-4 h-full font-[Poppins]"
        >
          Search
        </button>
      </div>
      <div>
        {loading && <Loading />}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && <UsersContainer users={users} />}
      </div>
    </div>
  );
};

export default Users;
