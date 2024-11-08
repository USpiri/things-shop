"use client";

import { createOrUpdateProduct } from "@/actions/products/create-update-product";
import {
  Button,
  InputForm as Input,
  SizeMultiSelector,
  TextAreaForm as Textarea,
} from "@/components";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import {
  Gender,
  Product,
  ProductImage as IProductImage,
  Size,
} from "@/models/product.interface";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;
  images?: FileList;
};

interface Props {
  product: Partial<Omit<Product, "images">> & { images?: IProductImage[] };
  categories: { id: string; name: string }[];
}

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];
const genders = ["men", "women", "kid", "unisex"];

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });
  watch("sizes");

  const onSizeChange = (value: Size) => {
    const sizes = new Set(getValues("sizes"));
    if (sizes.has(value)) {
      sizes.delete(value);
    } else {
      sizes.add(value);
    }
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    const { ...productToSave } = data;

    if (product.id) formData.append("id", product.id);
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    const res = await createOrUpdateProduct(formData);
    console.log(res);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input label="Title" {...register("title", { required: true })} />
        <Input label="Slug" {...register("slug", { required: true })} />
        <Input
          label="Price"
          type="number"
          {...register("price", { required: true, min: 0 })}
        />
        <Input label="Tags" {...register("tags", { required: true })} />
        <label>
          <span className="opacity-80 font-mono text-sm">Gender</span>
          <div className="block w-full rounded p-2 py-1.5 placeholder:text-neutral-500 border border-neutral-700 focus:border-blue-600/50 bg-transparent text-center">
            <select
              {...register("gender", { required: true })}
              className="*:bg-background bg-transparent outline-none w-full text-sm capitalize"
            >
              <option value="" className="text-neutral-500">
                [Gender]
              </option>
              {genders.map((g) => (
                <option value={g} key={g} className="px-2 py-1 capitalize">
                  {g}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label>
          <span className="opacity-80 font-mono text-sm">Category</span>
          <div className="block w-full rounded p-2 py-1.5 placeholder:text-neutral-500 border border-neutral-700 focus:border-blue-600/50 bg-transparent text-center">
            <select
              {...register("categoryId", { required: true })}
              className="*:bg-background bg-transparent outline-none w-full text-sm capitalize"
            >
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
        <Textarea
          label="Description"
          {...register("description", { required: true })}
        />
        <div className="flex flex-col gap-3">
          <Input
            label="Stock"
            type="number"
            {...register("inStock", { required: true })}
          />
          <label>
            <span className="opacity-80 font-mono text-sm">Select Images</span>
            <div className="block w-full hover:underline rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent">
              <span className="opacity-80 text-sm">Click here</span>
            </div>
            <input type="file" className="hidden" />
          </label>
          <div className="flex flex-col gap-2">
            <span className="opacity-80 font-mono text-sm">Select Size</span>
            <SizeMultiSelector
              values={getValues("sizes") as Size[]}
              options={sizes}
              onChange={onSizeChange}
            />
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid || getValues("sizes").length === 0}
          >
            Save
          </Button>
        </div>
        <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          {product.images?.map((image) => (
            <div key={image.id} className="relative">
              <ProductImage
                alt={product.title ?? ""}
                width={250}
                height={250}
                src={image.url}
                className="w-full aspect-square rounded"
              />
              <div className="absolute top-2 right-2">
                <Button
                  className="bg-background max-sm:p-1.5"
                  type="button"
                  onClick={() => {
                    console.log(image.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:block text-sm">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};
