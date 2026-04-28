

export async function verifyUserSession(cookieStore) {
    try {

        const sessionCookie = cookieStore.get("session")?.value
        if (!sessionCookie) return null
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-user`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${sessionCookie}`,
            },
            cache: "no-store",
        });
        if (!res.ok) return null
        const user = await res.json();
        return user?.user||null
    } catch (error) {
        console.error("verifyUserSession error:", error);
        return null;
    }
}