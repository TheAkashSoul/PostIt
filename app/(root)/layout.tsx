import MobileNavbar from "@/components/Navbar/MobileNavbar";
import SideNavbar from "@/components/Navbar/SideNavbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:max-w-6xl mx-auto">
      <div className="fixed top-0 z-30">
        <SideNavbar />
      </div>
      <div className="fixed bottom-0 z-30 w-full">
        <MobileNavbar />
      </div>
      <div className="ml-0 md:ml-64 min-h-screen">{children}</div>
    </div>
  );
};

export default RootLayout;
