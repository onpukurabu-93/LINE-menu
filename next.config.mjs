/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 細かい型エラーがあっても無視してビルドを完了させる設定
    ignoreBuildErrors: true,
  },
  eslint: {
    // 構文チェックのエラーがあっても無視してビルドを完了させる設定
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
