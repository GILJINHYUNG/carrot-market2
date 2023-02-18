/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		reactRoot: true,
		/* 		runtimee: "nodejs",
		serverComponents: true, */
	},
	images: {
		domains: [
			"imagedelivery.net",
			"videodelivery.net",
			"customer-ydx1zivbebkm89ke.cloudflarestream.com",
		],
	},
};

module.exports = nextConfig;
