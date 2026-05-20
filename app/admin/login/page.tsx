import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Beheerders login — Waar blijft het",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
