import Footer from "@/components/layout/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/nav/navbar";
import { Suspense } from "react";
import { ToastProvider } from "@/provider/toast-provider";

const inter = Inter({ subsets: ["latin"] });

const {SITE_NAME} = process.env;

const site =  SITE_NAME || "Health Care";
export const metadata: Metadata = {
	title: `${site}`,
	description: "Always at your reach for thr best health care services",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastProvider />
				<Navbar />

				<main>{children}</main>

				<Footer />
			</body>
		</html>
	);
}
