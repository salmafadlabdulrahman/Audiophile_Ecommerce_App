"use client";

import GoBackLink from "../components/GoBackLink";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import ConfirmedCard from "../components/ConfirmedCard";
import MiniProductCard from "../components/MiniProductCard";
import Footer from "../components/Footer";

const page = () => {
  const [paymentMethod, setPaymentMethod] = useState("option-one");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
      z
        .number()
        .refine((val) => val !== undefined && !isNaN(val), {
          message: "Field cannot be empty",
        })
        .optional()
        .superRefine((val, ctx) => {
          if (paymentMethod === "option-one" && !val) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "E-money number is required for e-money payment",
            });
          }
        })
    ),
    eMoneyPin: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z
        .number()
        .refine((val) => val !== undefined && !isNaN(val), {
          message: "Field cannot be empty",
        })
        .optional()
        .superRefine((val, ctx) => {
          if (paymentMethod === "option-one" && !val) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "E-money PIN is required for e-money payment",
            });
          }
        })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    context: { paymentMethod },
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
    setOrderConfirmed(true);
    setOpenMenu(true);
    console.log(values);
  }
  return (
    <>
      <div className="p-6 bg-gray">
        <div className="lg:pl-[5%]">
          <GoBackLink />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:w-[80%] lg:m-auto lg:flex lg:justify-between"
          >
            {" "}
            <div className="bg-white rounded-lg p-4 mt-[1.5em] pb-[2em] lg:w-[60%]">
              <p className="uppercase font-bold tracking-wide text-[1.5em]">
                Checkout
              </p>
              <div className="mt-[1.3em]">
                <div>
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
                              <Input
                                placeholder="alexie@gmail.com"
                                {...field}
                              />
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

                  <div className="mt-[2em]">
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

                  <div className="mt-[2em]">
                    <p className="form-header">Payement Details</p>
                    <div className="sm:flex sm:justify-between mt-[1em]">
                      <p className="font-bold text-[.8em]">Payement Method</p>

                      <div className="sm:w-[50%] xs:w-full">
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
                            <RadioGroupItem
                              value="option-one"
                              id="option-one"
                            />
                            <Label htmlFor="option-one">e-Money</Label>
                          </div>
                          <div className="flex items-center space-x-2 radio-btn border-2 border-gray rounded-lg w-full">
                            <RadioGroupItem
                              value="option-two"
                              id="option-two"
                            />
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
                          The ‘Cash on Delivery’ option enables you to pay in
                          cash when our delivery courier arrives at your
                          residence. Just make sure your address is correct so
                          that your order will not be cancelled.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 pb-[2em] lg:w-[35%] mt-[1.5em] lg:h-[50%]">
              <p className="uppercase font-bold tracking-widest text-[1.2em]">
                Summary
              </p>

              <div className="mt-[1em]">
                <MiniProductCard />
                <MiniProductCard />
              </div>

              <div className="mt-[2em]">
                <p className="flex justify-between ">
                  <span className="summary-text">Total</span>{" "}
                  <span className=" summary-amounts">$ 23,698</span>
                </p>
                <p className="flex justify-between ">
                  <span className="summary-text">Shipping</span>{" "}
                  <span className=" summary-amounts">$ 50</span>
                </p>
                <p className="flex justify-between ">
                  <span className="summary-text">Vat (included)</span>{" "}
                  <span className=" summary-amounts">$ 4,739.6</span>
                </p>

                <p className="flex justify-between mt-[1.5em]">
                  <span className="summary-text">Grand Total</span>{" "}
                  <span className=" summary-amounts">$ 28487.6</span>
                </p>
              </div>

              <div className="mt-[3em] ">
                <Button
                  type="submit"
                  className="bg-orange text-white w-full uppercase text-[1em] font-semibold tracking-wide"
                >
                  Continue & Pay
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {orderConfirmed && (
        <div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
            onClick={() => {
              setOpenMenu(false);
              setOrderConfirmed(false);
            }}
          ></div>
          <ConfirmedCard />
        </div>
      )}
      <Footer />
    </>
  );
};

export default page;

/*<div className="flex justify-between">
                  <div className="flex gap-6">
                    <Image
                      src={"/assets/cart/image-xx59-headphones.jpg"}
                      alt="headphones"
                      width={50}
                      height={50}
                      unoptimized
                      className="w-[60px] rounded-lg"
                    />

                    <div>
                      <p className="font-bold">ZX9</p>
                      <p className="text-darkGray font-bold">$ 4.500</p>
                    </div>
                  </div>
                  <p className="text-darkGray font-bold">x3</p>
                </div>

                <div className="flex justify-between my-5">
                  <div className="flex gap-6">
                    <Image
                      src={"/assets/cart/image-xx59-headphones.jpg"}
                      alt="headphones"
                      width={50}
                      height={50}
                      unoptimized
                      className="w-[60px] rounded-lg"
                    />

                    <div>
                      <p className="font-bold">ZX9</p>
                      <p className="text-darkGray font-bold">$ 4.500</p>
                    </div>
                  </div>
                  <p className="text-darkGray font-bold">x3</p>
                </div> */
