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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const toastId = toast.loading("login processing...");
    try {
      await login(userInfo).unwrap();
      toast.success("User login successfully", { id: toastId });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };
  const handleDemoLogin = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "123456789");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
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

        <div className="space-y-3">
          <Button type="submit" className="w-full rounded-xl mt-2" disabled={isLoading}>
            {isLoading ? "Login..." : "Login"}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">
                Or demo login as
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleDemoLogin("imam.hossain0321@gmail.com")}
            >
              User
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleDemoLogin("tom@gmail.com")}
            >
              Agent
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleDemoLogin("admin@gmail.com")}
            >
              Admin
            </Button>
          </div>
        </div>

        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link to="/register/user" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
