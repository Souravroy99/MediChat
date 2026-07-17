"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { logout } from "@/lib/actions/auth.action";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Delete the server session cookie
      await logout();

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-2 py-1 rounded-lg bg-violet-500 text-white hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}