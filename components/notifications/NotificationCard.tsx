import Link from "next/link";

const NotificationCard = () => {
  return (
    <div className="flex flex-row items-center gap-2 p-4 border-b border-gray-500/20">
      <Link href="/" className="h-10 w-10 overflow-hidden rounded-full">
        <img
          src="https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_640.png"
          alt="img"
          className="w-10 h-10 object-cover"
        />
      </Link>
      <div className="flex-1">
        <Link href="/" className="font-semibold text-sm leading-tight">
          username
        </Link>
        <p className="leading-tight font-medium line-clamp-2">
          <span className="font-normal">liked your post: </span>Hey everyone
          whatsapp
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
