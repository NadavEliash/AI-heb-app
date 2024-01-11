/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styleedComponnts: true
    },
    images: {
        remotePatterns: [
            { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
            { hostname: "pbxt.replicate.delivery" },
            { hostname: "res.cloudinary.com" },
        ]
    }
}

module.exports = nextConfig