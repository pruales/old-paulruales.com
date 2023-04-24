import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import "../global.css";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "paul ruales",
		template: "%s | paul ruales",
	},
	description: "Independent software engineer. Ex-Amazon.",
	openGraph: {
		title: "paul ruales",
		description: "Independent software engineer. Ex-Amazon.",
		url: "https://paulruales.com",
		siteName: "paul ruales",
		images: [
			{
				url: "https://paulruales.com/desk.png",
				width: 1024,
				height: 1024,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "paul0x741",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.ico",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
