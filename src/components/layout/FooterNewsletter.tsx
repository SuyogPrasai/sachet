"use client";

import { useState, FormEvent } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/add_newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Successfully subscribed to the newsletter!");
        setEmail("");
      } else {
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-700 pt-8">
      <h3 className="text-xl font-semibold mb-4 text-white font-sans">Newsletter</h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 mb-2 sm:mb-0">Subscribe to our newsletter for updates.</p>
        <form onSubmit={handleSubmit} className="flex w-full sm:max-w-xs lg:ml-7">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow rounded-l-md rounded-r-none text-sm bg-gray-800 text-gray-100 border border-gray-700 focus:border-white transition-colors duration-200 py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-green-800 text-white rounded-l-none rounded-r-md text-sm whitespace-nowrap hover:bg-light-dark transition-colors duration-200 px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
      {message && (
        <p className={`text-xs mt-2 ${message.includes("Successfully") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
      <p className="text-xs text-gray-300 mt-2 sm:mt-0">
        By subscribing, you agree to our{" "}
        <a href="#" className="underline hover:text-white">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}