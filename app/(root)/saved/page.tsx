"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

const Saved = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row gap-3 items-center">
        <button onClick={() => router.back()} className="ml-2 block md:hidden">
          <IoMdArrowBack size={20} />
        </button>
        <h2 className="md:ml-4 text-lg font-semibold">Saved</h2>
      </div>
    </main>
  );
};

export default Saved;
