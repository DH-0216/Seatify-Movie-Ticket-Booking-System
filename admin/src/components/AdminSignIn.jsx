"use client";

import { SignIn } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function AdminSignIn() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background blur circles */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Image
                        src={assets.logo}
                        alt="Seatify Logo"
                        className="w-48 h-auto mx-auto mb-6"
                    />
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Sign in to manage your movie theater</p>
                </div>

                {/* Clerk Sign In Component */}
                <div>
                    <SignIn
                        routing="hash"
                        appearance={{
                            elements: {
                                formButtonPrimary: "bg-primary hover:bg-primary-dull text-sm normal-case transition-all duration-200",
                                card: "bg-transparent shadow-none",
                                headerTitle: "text-white text-2xl font-bold",
                                headerSubtitle: "text-gray-400 text-sm",
                                socialButtonsBlockButton: "bg-gray-800 border-gray-600 text-white hover:bg-gray-700 transition-all duration-200",
                                formFieldInput: "bg-gray-800 border-gray-600 text-white focus:border-primary focus:ring-primary/20",
                                formFieldLabel: "text-gray-300 text-sm font-medium",
                                footerActionLink: "text-primary hover:text-primary-dull transition-colors duration-200",
                                identityPreviewText: "text-gray-300",
                                formFieldSuccessText: "text-green-400 text-sm",
                                formFieldErrorText: "text-red-400 text-sm",
                                dividerLine: "bg-gray-600",
                                dividerText: "text-gray-400 text-sm",
                                formResendCodeLink: "text-primary hover:text-primary-dull",
                                otpCodeFieldInput: "bg-gray-800 border-gray-600 text-white focus:border-primary",
                                formHeaderTitle: "text-white text-xl font-semibold",
                                formHeaderSubtitle: "text-gray-400 text-sm",
                            },
                        }}
                        redirectUrl="/"
                    />
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        Need help? Contact your system administrator
                    </p>
                </div>
            </div>
        </div>
    );
}
