import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/actions/auth.action";

export const metadata = {
  title: "MediChat",
  description:
    "An AI-powered medical assistant that provides symptom assessment, health information, and personalized wellness guidance.",
  icons: {
    icon: "/robot.png",
  },
};

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {

  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {/* Top Navigation */}

        {user && (
          <header className="flex justify-end p-4">
            <LogoutButton />
          </header>
        )}

        <main>{children}</main>

        <Toaster />
      </body>
    </html>
  );
}