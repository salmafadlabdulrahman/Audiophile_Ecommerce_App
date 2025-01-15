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
import { account, databases, ID, Query } from "../../lib/appwrite";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(265),
  name: z.string().min(2).max(10),
});

const SignUpPage = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [errMsg, setErrMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const login = async (email: string, password: string, name: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser({
        id: user.$id,
        email: user.email,
        name: user.name,
      });
      console.log("User logged in:", user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //check if the user already exists:
      const users = await databases.listDocuments("users", "Users", [
        Query.equal("email", values.email),
      ]);
      if (users.documents.length > 0) {
        setErrMsg(
          "An account with this email already exists. Please log in instead."
        );
        return;
      }
      await account.create(
        ID.unique(),
        values.email,
        values.password,
        values.name
      );

      await databases.createDocument("users", "Users", ID.unique(), {
        email: values.email,
      });
      await login(values.email, values.password, values.name);
    } catch (error) {
      console.log(error);
      setErrMsg("Registeration Failed");
    }
  };

  return (
    <div>
      {" "}
      <div className="lg:flex">
        <SideImg />
        <div className="bg-black w-[80%] md:w-[50%] lg:w-[50%] px-6 py-[2em] absolute lg:static xs:top-20 sm:top-[150px] left-0 right-0 m-auto lg:m-0 rounded-xl lg:rounded-none">
          {" "}
          <div className="md:flex md:flex-col md:justify-center lg:mt-[6em] md:max-w-[500px] m-auto xl:mt-[13em] ">
            <p className="text-white font-bold text-[1.3em] text-center">
              Create an account <br />
              <span className="text-lightGray text-[.7em] font-semibold">
                Enter your email below to create your account
              </span>
            </p>
            {errMsg && (
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white tracking-wide">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-3">
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
                    Sign Up
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
                    <Link href="/sign-in" className="font-semibold">
                      <p className="text-white">
                        Already have an account?{" "}
                        <span className="text-[#836fe4]"> Sign In</span>
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

export default SignUpPage;
