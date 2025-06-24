const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
});

module.exports = withPWA({
  async rewrites() {
    return [
      process.env.NODE_ENV === 'development'
        ? { source: '/api/:path*', destination: 'http://localhost:3001/:path*' }
        : {
            source: '/api/:path*',
            destination: 'https://api.94-159-98-144.nip.io/:path*',
          },
    ];
  },
  reactStrictMode: true,
  // FIXME: placehholder
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
    ],
  },
});
