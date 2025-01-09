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
import { useEffect, useState } from "react";
import { account, ID } from "../../lib/appwrite";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(265),
});

type LoggedInUser = {
  email: string;
  id: string;
} | null;

const SignUpPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //console.log(account.get())

  const login = async (email: string, password: string) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser({
        id: user.$id, // ID of the newly created user
        email: user.email, // Email of the user
      });
      console.log("User logged in:", user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  /*useEffect(() => {
    if (!router.isReady) {
      console.log("Router is not ready yet.");
    }
  }, [router.isReady]);*/
  /*const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };
  logout()*/

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await account.create(
        ID.unique(),
        values.email,
        values.password
      );
      await login(values.email, values.password);
      console.log("User registered and logged in:", values);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="lg:flex h-screen relative">
      <SideImg />
      <div className="bg-black md:w-[50%] w-[80%] max-w-[450px] md:max-w-[50%] m-auto lg:h-full px-6 py-[2em] rounded-xl lg:rounded-none lg:static absolute xs:top-20 sm:top-[150px] left-0 right-0">
        <div className="md:flex md:flex-col md:justify-center lg:mt-[6em] md:max-w-[500px] m-auto xl:mt-[13em] ">
          {loggedInUser && <p>This user is logged in:{loggedInUser.email}</p>}
          <p className="text-white font-bold text-[1.3em] text-center">
            Create an account <br />
            <span className="text-lightGray text-[.7em] font-semibold">
              Enter your email below to create your account
            </span>
          </p>

          <div className="mt-[2em]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                          placeholder=""
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
                  Sign Up with Email
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
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
