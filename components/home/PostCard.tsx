import PostEvents from "./PostEvents";

const PostCard = () => {
  return (
    <div className="flex flex-row gap-2 w-full items-start border-b border-gray-600/20 md:p-4 p-4">
      <div>
        {/* profile photo */}
        <div className="h-10 w-10 bg-black overflow-hidden rounded-full flex items-center justify-center">
          <img />
        </div>
      </div>
      <div className="flex flex-col">
        {/* profile name */}
        <div className="flex flex-col items-start">
          <p className="font-semibold text-md leading-tight">Profile Name</p>
          <p className="font-light text-xs leading-tight text-gray-700">
            profile_username
          </p>
        </div>
        {/* description */}
        <div>
          <p className="font-medium text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            sequi excepturi incidunt et consequuntur expedita! Doloribus
            praesentium officia nulla odit non mollitia blanditiis! Quaerat, vel
            doloribus nobis cupiditate quam eum.
          </p>
        </div>
        {/* image */}
        <div className="my-3 overflow-hidden w-fit rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1707327956851-30a531b70cda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
            className="h-full max-h-96 w-auto max-w-full object-contain"
          />
        </div>

        {/* post events */}
        <div className="mt-3">
          <PostEvents />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
