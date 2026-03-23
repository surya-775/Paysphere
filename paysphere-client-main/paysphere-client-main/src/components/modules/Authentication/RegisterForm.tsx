/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Password from "@/components/ui/Password";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAgentRegisterMutation,
  useUserRegisterMutation,
} from "@/redux/features/auth/auth";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z
      .string({ error: "Name must be string" })
      .min(2, { error: "Name to short. Minimum 2 character long" })
      .max(50, { error: "Name to long" }),
    email: z.email(),
    phone: z
      .string({ error: "Phone Number must be string" })
      .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid. +8801XXXXXXXXX",
      }),
    password: z
      .string({ error: "Password must be string" })
      .min(8, { error: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z
      .string({ error: "Password must be string" })
      .min(8, { error: "Password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({ role }: { role: string }) {
  const navigate = useNavigate();
  const [userRegister, { isLoading: isUserLoading }] =
    useUserRegisterMutation();
  const [agentRegister, { isLoading: isAgentLoading }] =
    useAgentRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    const toastId = toast.loading("Registration Processing...");

    try {
      if (role === "user") {
        await userRegister(userInfo).unwrap();
        toast.success("User created successfully", { id: toastId });
        navigate("/login");
      } else if (role === "agent") {
        await agentRegister(userInfo).unwrap();
        toast.success("Agent created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  const isSubmitting =
    form.formState.isSubmitting || isUserLoading || isAgentLoading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="e.g. +880123456789"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Confirm Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-xl mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Registration"}
        </Button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
