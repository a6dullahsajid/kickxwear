"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxExit } from "react-icons/rx";
import {
    MdDashboard,
    MdInventory2,
    MdPersonOutline,
    MdLocationOn,
    MdHeadsetMic,
} from "react-icons/md";

const navigation = [
    { label: "Overview", icon: MdDashboard },
    { label: "My Orders", icon: MdInventory2 },
    { label: "My Account", icon: MdPersonOutline },
    { label: "Addresses", icon: MdLocationOn },
    { label: "Help & Support", icon: MdHeadsetMic },
];

export default function AccountPage() {
    const router = useRouter();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("Overview");

    useEffect(() => {
        let cancelled = false;

        async function loadCustomer() {
            try {
                const response = await fetch("/api/auth/me", {
                    cache: "no-store",
                });
                const data = await response.json();

                if (cancelled) return;

                if (!response.ok || !data.success) {
                    router.replace("/login");
                    return;
                }

                setCustomer(data.customer);
            } catch (error) {
                if (!cancelled) {
                    router.replace("/login");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadCustomer();

        return () => {
            cancelled = true;
        };
    }, [router]);

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to log out.");
            }

            window.dispatchEvent(new Event("customer-auth-changed"));
            router.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    if (loading || !customer) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm text-gray-500">Loading your account...</p>
            </main>
        );
    }

    const customerName = customer.name?.trim() || "there";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 md:px-10">
            {/* Account heading */}
            <header className="mb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Kickxwear / My Account
                </p>

                <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                    Hello, {customerName}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your profile, orders and delivery details.
                </p>
            </header>

            {/* Sidebar and content */}
            <div className="flex min-h-[440px] gap-4 sm:gap-6">
                <aside
                    aria-label="Account navigation"
                    className="flex w-14 shrink-0 flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-4 sm:w-56 sm:items-stretch sm:px-3"
                >
                    {navigation.map(({ label, icon: Icon }) => {
                        const active = activeSection === label;

                        return (
                            <button
                                key={label}
                                type="button"
                                title={label}
                                aria-label={label}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setActiveSection(label)}
                                className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors sm:w-full sm:justify-start sm:gap-3 sm:px-3 ${active
                                    ? "bg-black text-white"
                                    : "text-gray-900 hover:bg-gray-100 hover:text-black"
                                    }`}
                            >
                                <Icon size={20}/>
                                <span className="hidden text-sm sm:inline">{label}</span>
                            </button>
                        );
                    })}

                    <div className="mt-auto w-full border-t border-gray-100 pt-3">
                        <button
                            type="button"
                            onClick={handleLogout}
                            title="Logout"
                            aria-label="Logout"
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 sm:w-full sm:justify-start sm:gap-3 sm:px-3"
                        >
                            <RxExit size={19} strokeWidth={0.4} />
                            <span className="hidden text-sm sm:inline">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Content panel */}
                <section className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-black">
                        {activeSection}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {activeSection === "Overview"
                            ? "Welcome to your Kickxwear account. Choose a section from the sidebar to manage your account."
                            : `${activeSection} will be available here.`}
                    </p>

                    {activeSection === "My Account" && (
                        <div className="mt-6 space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="mt-1 font-medium text-black">
                                    {customer.name || "Not added yet"}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="mt-1 font-medium text-black">
                                    {customer.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="mt-1 font-medium text-black">
                                    {customer.phone || "Not added yet"}
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}