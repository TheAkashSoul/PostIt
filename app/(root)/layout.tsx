import SideNavbar from "@/components/Navbar/SideNavbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:max-w-6xl mx-auto">
      <div className="fixed top-0 z-30 w-full">
        <SideNavbar />
      </div>
      <div className="ml-0 md:ml-64 bg-slate-400/15 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
