/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	images: {
		domains: ['assets.myntassets.com'],
	  },
};


export default nextConfig;
