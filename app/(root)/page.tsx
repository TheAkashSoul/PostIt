import PostCard from "@/components/home/PostCard";

const Home = () => {
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </main>
  );
};

export default Home;
