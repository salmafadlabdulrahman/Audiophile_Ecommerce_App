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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
});

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="md:flex md:h-screen">
      <div className="w-[50%] hidden md:block">
        {" "}
        {/*w-[50%] border hidden md:block h-[100%] */}
        <Image
          src={"/assets/home/intro.jpg"}
          alt="intro pic"
          width={60}
          height={60}
          className="object-cover w-full h-full"
          unoptimized
        />
      </div>
      <div className="bg-black md:w-[50%] w-[80%] max-w-[450px] md:max-w-[50%] m-auto md:m-0 px-6 py-[2em] rounded-xl md:rounded-none mt-[5em]">
        <div className="md:flex md:flex-col md:justify-center md:mt-[6em] md:max-w-[500px] m-auto">
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
                <Button
                  type="submit"
                  className="w-full mt-[.7em] bg-white text-black font-semibold hover:bg-[#d4d4d4]"
                >
                  Sign In with Email
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

export default page;

{
  /*border w-[80%] m-auto */
}

/*m-auto w-[80%] max-w-[450px] mt-[5em] bg-black px-6 py-5 rounded-xl pt-[2em] md:h-screen md:rounded-none md:m-0 md:w-[50%] md:max-w-[50%] */
