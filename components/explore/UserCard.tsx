import { User } from "@/types/type";
import Link from "next/link";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-row items-center justify-between p-4 border-b border-gray-500/20">
      <div className="flex flex-row gap-2 items-center w-full">
        <div className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
          <img
            src={user.displaypic}
            alt="img"
            className="h-10 w-10 object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-tight text-md">{user.name}</p>
          <p className="font-light text-xs leading-none">{user.username}</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-sm overflow-hidden">
        <Link
          href={`/${user.username}`}
          className="bg-foreground hover:bg-foreground/80 w-24 text-sm font-bold px-2 py-[6px] text-background text-center"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
