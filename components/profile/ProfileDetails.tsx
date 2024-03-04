const ProfileDetails = () => {
  return (
    <main className="px-4 border-b border-gray-600/20">
      <div className="py-2">
        <p className="font-medium text-sm">username</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-1">
        <div className="w-full flex flex-row items-center justify-between gap-2 mt-2">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-full bg-black overflow-hidden">
            <img />
          </div>

          <div className="flex flex-row items-center md:gap-5 gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-[0.6rem] leading-tight">200</p>
              <p className="font-normal text-xs leading-tight">posts</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-[0.6rem] leading-tight">190</p>
              <p className="font-normal text-xs leading-tight">followers</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-[0.6rem] leading-tight">20</p>
              <p className="font-normal text-xs leading-tight">following</p>
            </div>
          </div>
          {/*  */}
        </div>

        <div className="flex flex-col items-start mt-3">
          <p className="font-semibold text-xs">Full Name</p>
          <p className="font-normal text-xs">Profile Bio</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-500/90 px-6 py-1 font-semibold text-base text-background rounded-sm w-full md:w-fit my-3">
          Edit Profile
        </button>
      </div>
    </main>
  );
};

export default ProfileDetails;
