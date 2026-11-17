"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  ImagePlus,
} from "lucide-react";

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
import { signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  // Handle Image Upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and WEBP images are allowed!");
        e.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2MB!");
        e.target.value = "";
        return;
      }

      setImage(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again!");
    }
  };

  // Handle Form Submission
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // const name = formData.get("name");
    // const email = formData.get("email");
    // const password = formData.get("password");
    // const confirmPassword = formData.get("confirmPassword");

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const terms = formData.get("terms");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {

        const { data, error } = await signUp.email({
          name: name, // required, The name of the user.
          email: email, // required, The email address of the user.
          password:password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
          image:image, // An optional profile image of the user.
          callbackURL: "/", // An optional URL to redirect to after the user signs up.
        });
        console.log(data,error);

      if (!terms) {
        alert("Please accept the Terms & Conditions!");
        return;
      }

      console.log({
        name,
        email,
        image,
      });

      // Send formData to your backend API here.
      // Example:
      // await fetch("/api/signup", {
      //   method: "POST",
      //   body: formData,
      // });

      toast.add({
        title:"Account created",
        description:"Your account has created  successfully!",
      });
      router.push("/")
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  const handleGitHubSignUp = () => {
    console.log("GitHub sign up clicked");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
        {/* Left Side */}
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
              <ShieldCheck className="size-8 text-amber-400" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Join Our Community!
            </h1>

            <p className="max-w-sm text-base leading-7 text-slate-300">
              Create your account and experience hassle-free car care services.
              Manage bookings and keep your vehicle in the best condition.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "Secure and reliable service",
                "Easy booking management",
                "Professional car care",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-amber-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-400">
            © 2026 AutoCare. All rights reserved.
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 md:hidden">
                <Link href="/" className="text-2xl font-bold text-[#1e2a4a]">
                  Auto<span className="text-amber-500">Care.</span>
                </Link>
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                Create Account
              </CardTitle>

              <CardDescription className="text-sm text-slate-500">
                Get started by creating your new account.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="h-12 pl-11"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image</Label>

                  <div className="flex items-center gap-4">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                        className="size-16 rounded-full border object-cover"
                      />
                    ) : (
                      <div className="flex size-16 items-center justify-center rounded-full border bg-slate-100">
                        <ImagePlus className="size-7 text-slate-400" />
                      </div>
                    )}

                    <Input
                      id="image"
                      name="image"
                      type="url"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="h-12 cursor-pointer pt-2"
                    />
                  </div>

                  <p className="text-xs text-slate-400">
                    JPG, PNG or WEBP (Maximum 2MB)
                  </p>
                </div>

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
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      minLength={8}
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

                  <p className="text-xs text-slate-400">
                    Password must be at least 8 characters.
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      minLength={8}
                      required
                      className="h-12 pl-11 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox id="terms" name="terms" required />

                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-sm font-normal leading-5 text-slate-600"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-amber-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-amber-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-12 w-full bg-amber-400 text-base font-semibold text-white hover:bg-amber-500"
                >
                  Create Account
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </form>

              {/* Social Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  OR SIGN UP WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="h-12 gap-2 border-slate-200 hover:bg-slate-50"
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                      transform="translate(0 4)"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.72 7.18l7.62 5.91c4.45-4.1 7.14-10.13 7.14-17.56Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                      transform="translate(0 4)"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.47 0 11.9-2.13 15.84-5.8l-7.62-5.91c-2.12 1.42-4.83 2.26-8.22 2.26-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGitHubSignUp}
                  className="h-12 gap-2 border-slate-200 hover:bg-slate-50"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.7 10.7 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Sign In */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-amber-600 hover:text-amber-700"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
