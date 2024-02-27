import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold">
      Post<span className="text-blue-500">IT</span>
    </Link>
  );
};

export default Logo;
