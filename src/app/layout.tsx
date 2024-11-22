import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/navigation/main-navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import "./globals.css";


const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});


export const metadata: Metadata = {
	title: "Portfolio for Paul Stearns",
	description: "Created by Paul Stearns"
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/celestial-coyote.svg" type="image/svg+xml" />
			</head>

			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
