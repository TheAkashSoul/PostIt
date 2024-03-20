import { useSession } from "next-auth/react";

const useUserData = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || "";

  const fetchUserData = async () => {
    if (status === "authenticated") {
      try {
        const res = await fetch(
          `/api/getuser?email=${encodeURIComponent(email)}`
        );

        const data = await res.json();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { fetchUserData };
};

export default useUserData;
