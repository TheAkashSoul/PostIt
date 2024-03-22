import { useSession } from "next-auth/react";

const useUserData = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || "";
  // console.log(session);

  const fetchUserData = async () => {
    if (status === "authenticated") {
      try {
        const res = await fetch("/api/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

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
