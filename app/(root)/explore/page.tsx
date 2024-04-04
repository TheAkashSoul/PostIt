"use client";

import UserCard from "@/components/explore/UserCard";
import { User } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Explore = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/getallusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Get all users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (data) {
      setAllUsers(data?.users);
    }
    refetch();
  }, [data]);

  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="w-full pt-3 pb-1 sticky top-0 z-30 h-fit">
        <div className="w-[80%] mx-auto h-8 flex flex-row items-center gap-2 bg-[#DADDE1] rounded-full overflow-hidden px-4 shadow-b shadow-md">
          <FiSearch color="#858A8F" size={16} />
          <input
            type="search"
            placeholder="Search..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-foreground dark:text-background"
          />
        </div>
      </div>
      <div className="mt-3">
        {allUsers
          ?.filter((item) =>
            searchUser.toLowerCase() === ""
              ? item
              : item.username.toLowerCase().includes(searchUser) ||
                item.name.toLowerCase().includes(searchUser)
          )
          .map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
      </div>
    </main>
  );
};

export default Explore;
