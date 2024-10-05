"use client";
import { Input, InputGroup, Whisper, Tooltip } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import NoticeIcon from "@rsuite/icons/Notice";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import { ModeToggle } from "@/utils/toggle";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "@/graphql/query";
import client from "@/services/apolloClient";

const styles = {
  width: 300,
  marginBottom: 10,
};

const Navbar = () => {
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    client: client,
    context: {
      headers: {
        authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
      },
    },
  });

  const user = data?.myProfile;
  return (
    <div className="w-full lg:h-16 bg-white dark:bg-slate-900 border-b-[1px] border-gray-300">
      <div className="lg:flex lg:items-center h-full w-full lg:p-10 justify-between  items-start p-5">
        <div className="lg:ml-64">
          <InputGroup inside style={styles}>
            <Input />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="flex items-center gap-4 mb-2 text-black dark:text-white">
          <ModeToggle />
          <NoticeIcon className="text-xl" />
          <CreditCardPlusIcon className="text-xl" />
          <a
            href="/upload/product"
            className="bg-yellow-500 rounded-full px-4 py-2 text-xs text-nowrap lg:text-sm text-white no-underline hover:no-underline"
          >
            Upload Product
          </a>
          <a
            href="/profile"
            className="h-8 w-8 rounded-full border-2 overflow-hidden border-yellow-500 border-dashed"
          >
            <img
              src={user.avatar}
              alt={user.avatar}
              className="object-cover h-full w-full "
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
