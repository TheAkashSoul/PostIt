import { User } from "@/types/type";

const ProfileDetails = ({ details }: { details: User }) => {
  // console.log("details", details);
  return (
    <main className="px-4 border-b border-gray-600/20">
      <div className="py-2">
        <p className="font-medium text-sm">@{details?.username}</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-1">
        <div className="w-full flex flex-row items-center justify-between gap-2 mt-2">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-full bg-black overflow-hidden">
            <img />
          </div>

          <div className="flex flex-row items-center md:gap-6 gap-6">
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {details?.posts.length}
              </p>
              <p className="font-normal text-sm leading-tight">posts</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {details?.followers.length}
              </p>
              <p className="font-normal text-sm leading-tight">followers</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {details?.following.length}
              </p>
              <p className="font-normal text-sm leading-tight">following</p>
            </div>
          </div>
          {/*  */}
        </div>

        <div className="flex flex-col items-start">
          <p className="font-semibold text-sm">{details?.name}</p>
          <p className="font-normal text-xs leading-none">{details?.bio}</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-500/90 px-6 py-1 font-semibold text-base text-background rounded-sm w-full md:w-fit my-3">
          Edit Profile
        </button>
      </div>
    </main>
  );
};

export default ProfileDetails;
