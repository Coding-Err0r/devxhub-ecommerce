"use client";
import TagIcon from "@rsuite/icons/Tag";
interface Props {
  title: string;
  product_image: string;
  seller_image: string;
  shop_name: string;
  regular_price: string;
  discounted_price: number;
  sold: number;
  rating: number;
  id: string;
}

const Product = ({
  title,
  product_image,
  seller_image,
  shop_name,
  regular_price,
  discounted_price,
  sold,
  rating,
  id,
}: Props) => {
  return (
    <a
      href={`/product/${id}`}
      className="lg:w-80 lg:h-80 border-2 border-yellow-200 rounded-2xl bg-gray-50 hover:border-yellow-400 dark:border-yellow-500 dark:hover:border-yellow-700 dark:shadow-lg dark:shadow-slate-700 relative hover:no-underline text-black hover:text-gray-700"
    >
      <img
        className="w-full lg:h-44 h-32 object-cover shadow-lg mb-4 rounded-2xl dark:shadow-xl"
        src={product_image}
        alt={product_image}
      />
      <div className="flex items-start gap-2 px-2">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-500 overflow-hidden">
          <img
            src={seller_image}
            alt={seller_image}
            className=" object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{title}</span>
          <span className="text-xs">{shop_name}</span>
          <div className="flex gap-2 items-center py-2">
            <span className="text-yellow-500">${discounted_price}</span>
            <span className="text-gray-400 line-through">${regular_price}</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <span>{sold} sold</span>
            <span>⭐ {rating}</span>
          </div> */}
        </div>
      </div>
      <button className="text-black dark:text-yellow-500 text-lg dark:bg-slate-900 w-8 h-8 rounded-full text-center bg-gray-300 absolute bottom-2 right-2 z-1 hover:bg-gray-500 hover:text-white dark:hover:bg-slate-700">
        <TagIcon />
      </button>
    </a>
  );
};

export default Product;
