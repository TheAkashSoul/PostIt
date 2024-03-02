import UserCard from "@/components/explore/UserCard";
import { FiSearch } from "react-icons/fi";

const Explore = () => {
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="w-full pt-3 pb-1 sticky top-0 z-30 h-fit">
        <div className="w-[80%] mx-auto h-8 flex flex-row items-center gap-2 bg-[#DADDE1] rounded-full overflow-hidden px-4 shadow-b shadow-md">
          <FiSearch color="#858A8F" size={16} />
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </main>
  );
};

export default Explore;
