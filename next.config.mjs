/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "i.pinimg.com"],
  },
};

export default withNextIntl(nextConfig);
