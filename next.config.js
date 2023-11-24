// /** @type {import('next').NextConfig} */

// module.exports = {
//   images: {
//     domains: ['localhost'],
//   },
//   // reactStrictMode: true,
// }

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: process.env.NODE_ENV === 'production'
//           ? `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`  // 本番環境
//           : 'http://localhost:8000/:path*'  // 開発環境
//       },
//     ];
//   },
// };

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`  // 本番環境
          : 'http://localhost:8000/:path*'  // 開発環境
      },
    ];
  },
};

module.exports = nextConfig;
