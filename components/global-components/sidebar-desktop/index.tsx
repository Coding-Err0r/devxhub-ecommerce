import OneColumnIcon from "@rsuite/icons/OneColumn";
import ScatterIcon from "@rsuite/icons/Scatter";
import AdvancedAnalyticsIcon from "@rsuite/icons/AdvancedAnalytics";
import PeopleFliterIcon from "@rsuite/icons/PeopleFliter";
import DeviceIcon from "@rsuite/icons/Device";
import PhoneIcon from "@rsuite/icons/Phone";
const SidebarDesktop = () => {
  return (
    <aside className="w-64 max-w-xs h-screen fixed left-0 top-0 bg-slate-100 dark:bg-slate-800 z-40">
      <div className="h-full p-6 relative">
        <div className="flex flex-col">
          <h1 className="text-yellow-500 text-[1.75rem]">DevxHub</h1>
          <h1 className="dark:text-white text-[2rem] -mt-3 text-black">
            E-commerce
          </h1>
        </div>{" "}
        <div className="flex flex-col gap-8 md:py-3 text-black dark:text-white ml-1">
          <a
            href="/"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <OneColumnIcon className="text-xl" /> <p>Home</p>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <ScatterIcon className="text-xl" /> <p>Discover</p>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <AdvancedAnalyticsIcon className="text-xl" />{" "}
            <p>Popular Products</p>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <PeopleFliterIcon className="text-xl" /> <p>Top Authors</p>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <DeviceIcon className="text-xl" /> <p>Feed</p>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 text-black dark:text-white no-underline hover:no-underline hover:text-yellow-500 dark:hover:text-yellow-500"
          >
            <PhoneIcon className="text-xl" /> <p>Contact</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
