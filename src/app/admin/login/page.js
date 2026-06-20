"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // show success toast then navigate so user sees feedback
            toast.success("Login successful");
            setTimeout(() => {
                router.push("/admin");
                router.refresh();
            }, 400);
        } catch (error) {
            toast.error(error.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black p-6">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4"
            >
                <div>
                    <h2 className="text-2xl font-semibold">Admin Login</h2>
                    <p className="text-sm text-neutral-600 mt-1">Sign in to access the admin dashboard</p>
                </div>

                <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-black outline-none"
                    />
                </label>

                <label className="block">
                    <span className="sr-only">Password</span>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-black outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#99ef12] cursor-pointer text-[#0b0b0b] px-4 py-3 font-semibold"
                >
                    Login
                </button>

                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
            </form>
        </div>
    );
}