"use client";
import Navbar from "@/components/global-components/navbar";
import SidebarDesktop from "@/components/global-components/sidebar-desktop";
import SidebarMobile from "@/components/global-components/sidebar-mobile";
import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "@/services/apolloClient";
import { useRouter } from "next/navigation";
import { GET_MY_PROFILE } from "@/graphql/query";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/auth/signin");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <div className="w-full h-full relative bg-white dark:bg-slate-900 min-h-dvh">
        {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
        <Navbar />
        <div className="sm:ml-64 p-4">{children}</div>
      </div>
    </ApolloProvider>
  );
};

export default LandingLayout;
