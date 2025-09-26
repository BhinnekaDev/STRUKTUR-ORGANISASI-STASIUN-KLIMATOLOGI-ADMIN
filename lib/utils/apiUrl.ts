export function apiUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl)
        throw new Error("NEXT_PUBLIC_API_BASE_URL_KLIMATOLOGI belum diset");

    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.startsWith("/") ? path : "/" + path;

    const fullUrl = cleanBase + cleanPath;
    console.log("🔍 API URL:", fullUrl); // Tambahkan ini untuk cek
    return fullUrl;
}
