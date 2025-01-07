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
		  {
			protocol: "https",
			hostname: "assets.aceternity.com",
		  }
		  ,
		  {
			protocol: "https",
			hostname: "images.unsplash.com"
		  }
		],
	  },
	// images: {
	// 	domains: ['assets.myntassets.com'],
	//   },
};


export default nextConfig;
