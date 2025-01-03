"use client";

import GoBackLink from "../components/GoBackLink";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Field Cannot be empty" })
    .min(2, { message: "Name must be 2 or more characters long." })
    .max(20, { message: "Name must be 20 characters or less" }),
  emailaddress: z
    .string()
    .nonempty({ message: "Field Cannot be empty" })
    .email({ message: "Invalid email address" }),
  phonenumber: z.string().nonempty({ message: "Field Cannot be empty" }),
  address: z.string().nonempty({ message: "Field Cannot be empty" }),
  zipcode: z
    .union([
      z
        .string()
        .regex(/^\d*$/, { message: "Field Cannot be empty" })
        .transform((val) => (val === "" ? undefined : parseInt(val, 10))),
      z.number(),
    ])
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Field Cannot be empty",
    }),
  city: z.string().nonempty({ message: "Field Cannot be empty" }),
  country: z.string().nonempty({ message: "Field Cannot be empty" }),
  eMoneyNumber: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().refine((val) => val !== undefined && !isNaN(val), {
      message: "Field cannot be empty",
    })
  ),
  eMoneyPin: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().refine((val) => val !== undefined && !isNaN(val), {
      message: "Field cannot be empty",
    })
  ),
});

const page = () => {
  const [paymentMethod, setPaymentMethod] = useState("option-one");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailaddress: "",
      phonenumber: "",
      address: "",
      zipcode: "" as unknown as number,
      city: "",
      country: "",
      eMoneyNumber: "" as unknown as number,
      eMoneyPin: "" as unknown as number,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="p-6 bg-gray">
      <GoBackLink />
      <div className="bg-white rounded-lg p-4 mt-[1.5em]">
        <p className="uppercase font-bold tracking-wide text-[1.5em]">
          Checkout
        </p>
        <div className="mt-[1.3em]">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="mt-2">
                  <p className="form-header">Billing Details</p>
                  <div className="sm:flex sm:flex-row sm:items-center sm:gap-3 mt-[1em]">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Alexie Ward" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailaddress"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="alexie@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem className="mt-[1em]">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 202-555-0136" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <p className="form-header">Shipping Info</p>
                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="w-full mt-[1em]">
                          <FormLabel>Your Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1137 Williams Avenue"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="sm:flex sm:flex-row sm:gap-3 mt-[1em]">
                      <FormField
                        control={form.control}
                        name="zipcode"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-full mt-[1em]">
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <p className="form-header">Payement Details</p>
                  <div className="sm:flex sm:justify-between mt-[1em]">
                    <p className="font-bold text-[.8em]">Payement Method</p>

                    <div className="w-[50%]">
                      <RadioGroup
                        defaultValue={paymentMethod}
                        onChange={() => {
                          if (paymentMethod === "option-one") {
                            setPaymentMethod("option-two");
                          } else {
                            setPaymentMethod("option-one");
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2 radio-btn border-2 border-gray rounded-lg w-full">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">e-Money</Label>
                        </div>
                        <div className="flex items-center space-x-2 radio-btn border-2 border-gray rounded-lg w-full">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Cash on Delivery</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {paymentMethod === "option-one" ? (
                    <div className="sm:flex mt-[1em] sm:gap-3">
                      <FormField
                        control={form.control}
                        name="eMoneyNumber"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>e-Money Number</FormLabel>
                            <FormControl>
                              <Input placeholder="238521993" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="eMoneyPin"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>e-Money Number</FormLabel>
                            <FormControl>
                              <Input placeholder="6891" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="sm:flex mt-[3em] sm:gap-5">
                      <Image
                        src={"/assets/checkout/icon-cash-on-delivery.svg"}
                        alt="hands shaking"
                        width={50}
                        height={50}
                      />
                      <p className="text-darkGray w-[70%] xs:w-[90%]">
                        The ‘Cash on Delivery’ option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
