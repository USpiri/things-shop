"use client";
import { InputForm as Input, SubTitle } from "@/components";
import { Country } from "@/models/country.interface";
import { useAddressStore } from "@/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteAddress, setAddress as setUserAddress } from "@/actions/address";
import { useSession } from "next-auth/react";
import { Address } from "@/models/address.interface";
import { useRouter } from "next/navigation";

interface Props {
  countries: Country[];
  storedAddress?: Partial<Address>;
}

type FormValues = {
  email: string;
  phone: string;
  name: string;
  lastname: string;
  address: string;
  address2?: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  rememberAddress: boolean;
};

export const AddressForm = ({ countries, storedAddress = {} }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { ...storedAddress, rememberAddress: true },
  });
  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore.getState().address;
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    setAddress(data);

    const { rememberAddress, ...dataAddress } = data;

    if (rememberAddress) {
      setUserAddress(dataAddress, session!.user.id);
    } else {
      deleteAddress(session!.user.id);
    }
    router.push("/checkout");
  };

  useEffect(() => {
    if (address.name) {
      reset(address);
    }
  }, [address, reset]);

  return (
    <form
      className="flex flex-col gap-5"
      id="address-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        <SubTitle className="text-lg font-mono col-span-2">Contact</SubTitle>
        <Input
          label="Email"
          placeholder="email@example.com"
          {...register("email", { required: true })}
        />
        <Input
          label="Phone"
          placeholder="12345678900"
          {...register("phone", { required: true })}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <SubTitle className="text-lg font-mono sm:col-span-2">
          Shipping
        </SubTitle>
        <Input
          label="Name"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <Input
          label="Lastname"
          placeholder="Lastname"
          {...register("lastname", { required: true })}
        />
        <Input
          label="Address"
          placeholder="Av. Street 123"
          className="sm:col-span-2"
          {...register("address", { required: true })}
        />
        <Input
          label="Alternative address (optional)"
          placeholder="Av. Street 123"
          className="sm:col-span-2"
          {...register("address2")}
        />
        <label>
          <span className="opacity-80 font-mono text-sm">Country</span>
          <select
            defaultValue={""}
            {...register("country", { required: true })}
            className="block w-full rounded py-2 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent *:bg-background"
          >
            <option value="" disabled className="opacity-80 font-mono">
              Country
            </option>
            {countries.map((country) => (
              <option value={country.id} key={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <Input
          label="State"
          placeholder="State"
          {...register("state", { required: true })}
        />
        <Input
          label="City"
          placeholder="City"
          {...register("city", { required: true })}
        />
        <Input
          label="Postal code"
          placeholder="X1234"
          {...register("postalCode", { required: true })}
        />
        <label className="flex items-center gap-3">
          <input type="checkbox" {...register("rememberAddress")} />
          <span className="opacity-80 font-mono text-sm tracking-wide">
            Remember address?
          </span>
        </label>
      </div>
    </form>
  );
};
