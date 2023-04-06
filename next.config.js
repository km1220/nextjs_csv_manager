/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	// typescript: {
	//   ignoreBuildErrors: true,
	// }
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false
		};

		return config;
	},
}

module.exports = nextConfig
