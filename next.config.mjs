/** @type {import('next').NextConfig} */

const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'assets.myntassets.com'
		  },
		],
	  },
	// images: {
	// 	domains: ['assets.myntassets.com'],
	//   },
};


export default nextConfig;
