import Link from "next/link";
import { CiSettings } from "react-icons/ci";

const Profile = () => {
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row items-center justify-between">
        <h2 className="md:ml-4 ml-2 text-lg font-semibold">Profile</h2>
        <Link href="/settings" className="mr-2 block md:hidden">
          <CiSettings size={22} />
        </Link>
      </div>
    </main>
  );
};

export default Profile;
