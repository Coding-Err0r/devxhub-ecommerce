import { usePathname } from "next/navigation";
import React from "react";

const Bradcrumb = () => {
  const router = usePathname();
  return (
    <div className="flex gap-4  text-black dark:text-yellow-500 text-xs lg:text-sm">
      <div className="flex items-center gap-x-2">
        <span>{router}</span>
      </div>
    </div>
  );
};

export default Bradcrumb;
