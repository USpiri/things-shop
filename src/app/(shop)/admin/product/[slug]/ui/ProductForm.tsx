"use client";

import { Input, SizeSelector, Textarea } from "@/components";
import { Product, Size } from "@/models/product.interface";

interface Props {
  product: Product;
  categories: { id: string; name: string }[];
}

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  console.log(product);

  return (
    <>
      <form className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Title" />
        <Input label="Slug" />
        <Input label="Price" />
        <Input label="Tags" />
        <Input label="Gender" />
        <label>
          <span className="opacity-80 font-mono text-sm">Category</span>
          <div className="block w-full rounded p-2 py-1.5 placeholder:text-neutral-500 border border-neutral-700 focus:border-blue-600/50 bg-transparent text-center">
            <select className="*:bg-background bg-transparent outline-none w-full text-sm capitalize">
              <option value="" className="text-neutral-500">
                [Category]
              </option>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id} className="px-2 py-1">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <Textarea label="Description" />
        <div className="flex flex-col gap-3">
          <label>
            <span className="opacity-80 font-mono text-sm">Select Images</span>
            <div className="block w-full hover:underline rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent">
              <span className="opacity-80 text-sm">Click here</span>
            </div>
            <input type="file" className="hidden" />
          </label>
          <label>
            <span className="opacity-80 font-mono text-sm">Select Size</span>
            <SizeSelector options={sizes} />
          </label>
        </div>
      </form>
    </>
  );
};
