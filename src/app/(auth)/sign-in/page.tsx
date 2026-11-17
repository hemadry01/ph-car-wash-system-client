"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const rememberMe = formData.get("remember");

    console.log({
      email,
      password,
      rememberMe,
    });

    try{

        const { data, error } = await signIn.email({
          email: email as string, // required, The email address of the user.
          password: password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
          rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
          callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
        });

        if(error){
            return setError(error.message ?? "Invalid email or password.");
        }
        
        if(data?.user){
            toast.add({
              title: `Hello ${data.user?.name}, welcome back!`,
              description: "You have been signed in successfully.",
            });
            router.push("/");
        }
         console.log("Sign in submitted:", {
           data,
           password: "[hidden]",
         });
    }
    catch{
         setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
        {/* Left Side - Welcome Section */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#1e2a4a] p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              Auto<span className="text-amber-400">Care.</span>
            </Link>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10">
              <Lock className="size-8 text-amber-400" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">Welcome Back!</h1>

            <p className="max-w-sm text-base leading-7 text-slate-300">
              Sign in to access your account, manage your bookings, and enjoy a
              seamless car care experience.
            </p>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-3">
                <div className="size-10 rounded-full border-2 border-[#1e2a4a] bg-amber-400" />
                <div className="size-10 rounded-full border-2 border-[#1e2a4a] bg-blue-400" />
                <div className="size-10 rounded-full border-2 border-[#1e2a4a] bg-emerald-400" />
              </div>

              <p className="text-sm text-slate-300">
                Your trusted car care partner
              </p>
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-400">
            © 2026 AutoCare. All rights reserved.
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 md:hidden">
                <Link href="/" className="text-2xl font-bold text-[#1e2a4a]">
                  Auto<span className="text-amber-500">Care.</span>
                </Link>
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                Sign In
              </CardTitle>

              <CardDescription className="text-sm text-slate-500">
                Welcome back! Please enter your details.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-12 pl-11"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-12 pl-11 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" name="remember" />

                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-slate-600"
                  >
                    Remember me
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="h-12 w-full bg-amber-400 text-base font-semibold text-white hover:bg-amber-500"
                >
                  Sign In
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-slate-400">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>

              {/* Social Login */}
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full gap-3"
              >
                <GitBranch className="size-5" />
                Continue with GitHub
              </Button>

              {/* Sign Up Link */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-amber-600 hover:text-amber-700"
                >
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
function setError(arg0: string) {
    throw new Error("Function not implemented.");
}

