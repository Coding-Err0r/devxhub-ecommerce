"use client";
import Bradcrumb from "@/components/global-components/breadcrumb";
import Product from "@/components/utils/Product";
import { data } from "@/config/data";
import { GET_ALL_PRODUCTS } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { loading, error, data: gqlData } = useQuery(GET_ALL_PRODUCTS);
  const [visibleCount, setVisibleCount] = useState(8);
  const [allProducts, setAllProducts] = useState<any>([]);
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  useEffect(() => {
    if (gqlData) {
      const sortedProducts = [...(gqlData?.products || [])].sort(
        (a: any, b: any) =>
          new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
      );
      setAllProducts(sortedProducts);
    }
  }, [loading]);

  return (
    <div className="w-full h-full flex gap-3 flex-col items-start">
      <Bradcrumb />
      <h1 className="lg:text-xl text-sm text-black dark:text-gray-200">
        Best Selling Electronics Products - Weekly Update.
      </h1>
      <div className="flex gap-6 items-center overflow-x-auto w-full">
        {data.discover.map((_d: string, index: number) => (
          <button
            key={index}
            className="bg-slate-300 px-4 py-2 rounded-full hover:bg-slate-700 font-bold text-xs hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-300 text-nowrap"
          >
            {_d}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-4 gap-4 py-8 grid-cols-2">
        {loading && <p>Loading...</p>}
        {gqlData &&
          allProducts
            .slice(0, visibleCount)
            .map((_d: any, index: number) => (
              <Product
                key={index}
                title={_d.title}
                product_image={_d.images[0]}
                seller_image={_d.category.image}
                shop_name={_d.category.name}
                regular_price={_d.price + 99}
                discounted_price={_d.price}
                sold={_d.sold}
                rating={_d.rating}
                id={_d.id}
              />
            ))}
        <div className="lg:col-span-4 col-span-2 text-center ">
          <button
            onClick={handleViewMore}
            className="text-black dark:text-white dark:bg-gray-600 px-4 py-2 rounded-full text-nowrap dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
