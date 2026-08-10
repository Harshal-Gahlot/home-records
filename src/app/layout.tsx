import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import {auth} from "@clerk/nextjs/server"
import {ensureHouseholdExist} from "@/lib/db/ensureHousehold"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Home Records",
	description: "Simple household record keeping app",
};

export default async function RootLayout(
	{ children }: Readonly<{ children: React.ReactNode; }>
) {
	const {orgId} = await auth()
	if (orgId) {
		await ensureHouseholdExist(orgId)
	} else {
		children = "pls sign in"
	}

	return (
		<ClerkProvider>
			<html
				lang="en"
				className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
				<body className="min-h-full flex flex-col"> 
					<Header />
					<main className="p-4">{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
