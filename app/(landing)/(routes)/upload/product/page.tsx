"use client";
import Bradcrumb from "@/components/global-components/breadcrumb";
import { ADD_PRODUCT } from "@/graphql/query";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState([
    "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16lN4?ver=46fe&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
  ]);

  const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCT);

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await addProduct({
        variables: {
          title,
          price,
          description,
          categoryId,
          images,
        },
      });

      console.log("Product added successfully:", response.data.addProduct);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  return (
    <div className="w-full h-full flex gap-3 flex-col items-start">
      <Bradcrumb />
      <h1 className="lg:text-xl text-sm text-black dark:text-gray-200">
        Upload Product
      </h1>
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="flex flex-col gap-2 text-black dark:text-white text-lg font-bold py-2">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="lg:w-[50%] h-10 bg-white border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2 text-black dark:text-white text-lg font-bold py-2">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="lg:w-[50%] h-10 bg-white border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2 text-black dark:text-white text-lg font-bold py-2 ">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="lg:w-[50%] h-10 bg-white border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2 text-black dark:text-white text-lg font-bold py-2">
          <label>Category ID</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            className="lg:w-[50%] h-10 bg-white border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2 text-black dark:text-white text-lg font-bold py-2">
          <label>Images</label>
          {images.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                required
                className="lg:w-[50%] h-10 bg-white border-2 border-gray-300 rounded-lg p-2 text-black text-sm"
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-xs mx-4"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="bg-cyan-500 text-white px-4 py-2 rounded-full lg:w-[50%] text-xs"
          >
            Add another image
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="lg:w-[50%] h-10 bg-yellow-500 text-white rounded-lg font-extrabold py-2"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
        {error && <p className="text-yellow-500">Error: {error.message}</p>}
        {data && <p className="text-yellow-500">Product added successfully!</p>}
      </form>
    </div>
  );
};

export default UploadProduct;
