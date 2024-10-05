// components/SingleProduct.tsx
"use client";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_SIMILAR_PRODUCTS, GET_SINGLE_PRODUCT } from "@/graphql/query"; // Ensure this path is correct
import { usePathname } from "next/navigation";
import { Carousel } from "rsuite";
import Product from "@/components/utils/Product";
import Bradcrumb from "../breadcrumb";

const SingleProduct = () => {
  const router = usePathname();

  const {
    loading: loadingProduct,
    error: errorProduct,
    data: productData,
  } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id: router.split("/").at(-1) },
    skip: !router.split("/").at(-1),
  });

  const {
    loading: loadingSimilar,
    error: errorSimilar,
    data: similarProductsData,
  } = useQuery(GET_SIMILAR_PRODUCTS, {
    variables: { categoryId: parseFloat(productData?.product.category.id) },
  });

  if (loadingProduct) return <p>Loading...</p>;
  if (errorProduct) return <p>Error: {errorProduct.message}</p>;

  const { product } = productData;

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
      <Bradcrumb />
      <div className="flex flex-col items-start gap-8 p-4">
        <div className="lg:flex gap-4">
          <div className="lg:w-[50%] h-[50%] overflow-hidden border-2 rounded-2xl border-yellow-500 shadow-lg w-full">
            <Carousel autoplay className="custom-slider">
              {product.images.map((_img: string, index: number) => (
                <img
                  src={_img}
                  alt={_img}
                  key={index}
                  className="w-full h-full object-cover"
                />
              ))}
            </Carousel>
          </div>
          <div className="flex flex-col gap-4 items-start lg:w-[50%] h-[50%] w-full">
            <h1>{product.title}</h1>
            <p className="text-justify">
              <strong>Description :</strong> {product.description}
            </p>
            <p className="text-lg">
              <strong>Price: </strong>${product.price}
            </p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Category: </p>
              <div className="bg-yellow-300 px-4 py-2 rounded-full">
                {product.category.name}
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4 py-8 grid-cols-2">
          {similarProductsData &&
            similarProductsData.products
              .slice(0, 4)
              .map((similarProduct: any) => (
                <Product
                  key={similarProduct.id}
                  title={similarProduct.title}
                  product_image={similarProduct.images[0]}
                  seller_image={similarProduct.category.image}
                  shop_name={similarProduct.category.name}
                  regular_price={similarProduct.price + 99}
                  discounted_price={similarProduct.price}
                  sold={0}
                  rating={0}
                  id={similarProduct.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
