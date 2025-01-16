"use client";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SideImg from "../components/SideImg";
import { account } from "@/lib/appwrite";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(265),
});

const SignInPage = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await account.createEmailPasswordSession(values.email, values.password);
      const user = await account.get();
      setUser({
        id: user.$id,
        email: user.email,
        name: user.name,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      setErrMsg("User doesn't exist. Please sign up.");
    }
  }

  return (
    <div>
      {" "}
      <div className="lg:flex">
        <SideImg />
        <div className="bg-black w-[80%] md:w-[50%] lg:w-[50%] px-6 py-[2em] absolute lg:static xs:top-20 sm:top-[150px] left-0 right-0 m-auto lg:m-0 rounded-xl lg:rounded-none">
          {" "}
          <div className="md:flex md:flex-col md:justify-center lg:mt-[6em] md:max-w-[500px] m-auto xl:mt-[13em]  ">
            <p className="text-white font-bold text-[1.3em] text-center">
              Log in to your account <br />
              <span className="text-lightGray text-[.7em] font-semibold">
                Enter your email and password below to log in.
              </span>
            </p>
            {!user && (
              <p className="text-[#d14444] text-center font-bold mt-[.5em]">
                {errMsg}
              </p>
            )}

            <div className="mt-[2em]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {" "}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white tracking-wide">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            {...field}
                            className=" border-[#3d3d3d] placeholder:text-lightGray text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-[.5em]">
                        <FormLabel className="text-white tracking-wide">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="choose a strong password"
                            type="password"
                            {...field}
                            className=" border-[#3d3d3d] placeholder:text-lightGray text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-[.7em] bg-white text-black font-semibold hover:bg-[#d4d4d4]"
                  >
                    Sign In
                  </Button>
                  <div className="mt-[1em] text-center">
                    <p className="uppercase text-lightGray font-semibold text-[.8em]">
                      Or continue with
                    </p>
                    <Button className="mt-[1em] w-full bg-black border border-[#3d3d3d] font-bold">
                      <FontAwesomeIcon icon={faGithub} size="2x" />
                      GitHub
                    </Button>
                  </div>
                  <div className="mt-[1em] flex items-center justify-center ">
                    <Link href="/sign-up" className="font-semibold">
                      <p className="text-white">
                        Don't have an account?{" "}
                        <span className="text-[#836fe4]"> Sign Up</span>
                      </p>
                    </Link>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
