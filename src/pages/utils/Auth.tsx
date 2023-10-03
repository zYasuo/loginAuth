// utils/auth.ts
export async function loginUser(email: string): Promise<any> {
    try {
        const response = await fetch('/api/searchUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
