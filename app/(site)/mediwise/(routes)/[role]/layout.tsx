import Sidebar from "./components/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
      <main className=" h-full bg-[#F9FAFC] flex justify-center items-center py-10 px-20">
        <div className="h-[90%] w-80 fixed left-10 top-10 shadow-2xl rounded-xl  bg-white overflow-hidden">
          <Sidebar />
        </div>
        <div className="md:ml-80 w-full h-[90vh] shadow-2xl rounded-xl overflow-hidden bg-white">
          {children}
        </div>
        </main>
  );
};

export default Layout;
