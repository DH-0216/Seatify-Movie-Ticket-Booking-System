import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary-dull text-sm normal-case",
              card: "bg-gray-900 border border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton:
                "bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
              formFieldInput: "bg-gray-800 border-gray-600 text-white",
              formFieldLabel: "text-gray-300",
              footerActionLink: "text-primary hover:text-primary-dull",
              identityPreviewText: "text-gray-300",
              formFieldSuccessText: "text-green-400",
              formFieldErrorText: "text-red-400",
            },
          }}
        />
      </div>
    </div>
  );
}
