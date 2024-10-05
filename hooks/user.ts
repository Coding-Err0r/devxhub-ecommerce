import { GET_MY_PROFILE } from "@/graphql/query";
import client from "@/services/apolloClient";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const fetchData = () => {
    const {
      loading,
      error,
      data: profileData,
    } = useQuery(GET_MY_PROFILE, {
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
    setIsLoading(loading);
    setData(profileData?.myProfile);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    data,
  };
};

export default useUser;
