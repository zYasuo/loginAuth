// utils/auth.ts
export async function loginUser(email: string, password: string): Promise<any> {
    console.log("Sending email:", email, "and password:", password);

    try {
        const response = await fetch('/api/searchUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
