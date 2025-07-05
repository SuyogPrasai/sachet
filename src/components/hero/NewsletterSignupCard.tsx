"use client";

import { useState, useTransition } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card_newsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

async function subscribeToNewsletter(email: string) {
  try {
    const response = await axios.post("/api/add_newsletter", { email });
    return {
      success: response.data.success,
      message: response.data.message || "Newsletter added successfully",
    };
  } catch (error: any) {
    console.error("Subscription failed:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add newsletter. Please try again.";
    return { success: false, message };
  }
}

export default function NewsletterSignupCard() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Basic client-side validation
      if (!email || !email.includes("@")) {
        setMessage("Invalid email format");
        return;
      }

      const result = await subscribeToNewsletter(email);
      setMessage(result.message);
      if (result.success) {
        setEmail(""); // Clear email on success
      }
    });
  };

  return (
    <Card className="relative w-full mx-auto lgplus:mx-0 max-w-[400px] lg:max-w-sm bg-white text-gray-800 p-10 rounded-none mt-10 lgplus:mt-0">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-gray-900 text-3xl font-extrabold leading-tight mt-2">
          Join the Newsletter
        </CardTitle>
        <CardDescription className="text-primary-high_bright text-xl font-bold mt-2">
          Original reporting.
          <br />
          Fearless journalism.
          <br />
          Delivered to you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Enter your email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="w-full h-12 p-3 lgplus:p-7 border-light text-black placeholder-gray-400 bg-white rounded-none focus:ring-2 focus:ring-primary-light_dark text-base border"
            />
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full h-12 p-7 border border-black bg-white flex justify-start text-black font-bold text-lg rounded-none hover:bg-white transition disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center w-full">
                <span className="animate-spin">⚙️</span>
              </div>
            ) : (
              <>
                I'm in <span className="ml-2">→</span>
              </>
            )}
          </Button>
        </div>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successfully") ? "text-green-800" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-xs mt-6 text-left mx-auto text-gray-600 w-[80%] lgplus:w-[95%] ml-3">
          By signing up, I agree to receive emails from Parewa and to the{" "}
          <a
            href="/terms_and_conditions.pdf"
            className="underline font-bold text-green-800 hover:text-primary-dark"
            target="_blank"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/terms_and_conditions.pdf"
            className="underline font-bold text-green-800 hover:text-primary-dark"
            target="_blank"
          >
            Terms of Use
          </a>
          .
        </p>
      </CardContent>
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-3 z-10 h-[calc(100%-60px)] bg-black shadow-lg" />
      <div className="absolute top-0 left-0 h-3 w-[15%] bg-black shadow-lg" />
      <div className="absolute top-0 right-0 h-3 w-[15%] bg-black shadow-lg" />
      <div className="absolute bottom-[50px] right-0 h-3 w-[10%] bg-black shadow-lg" />
      <div className="absolute bottom-[50px] left-0 h-3 w-[10%] bg-black shadow-lg" />
      <div className="absolute top-0 right-0 w-3 z-10 h-[calc(100%-60px)] bg-black shadow-lg" />
    </Card>
  );
}