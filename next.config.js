/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
            { hostname: "pbxt.replicate.delivery" },
            { hostname: "res.cloudinary.com" },
        ]
    }
}

module.exports = nextConfig