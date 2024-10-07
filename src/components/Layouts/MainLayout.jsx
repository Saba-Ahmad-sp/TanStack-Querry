import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <>
      <section className="bg-gray-900 min-h-screen flex-col text-white">
        <Header />
        <Outlet />
        <Footer />
      </section>
    </>
  );
};
