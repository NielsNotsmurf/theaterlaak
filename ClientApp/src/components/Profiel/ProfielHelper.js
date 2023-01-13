

export default class ProfielHelper {
    static async getReserveringenByUserId(userId) {
        const response = await fetch(`https://localhost:7242/api/reservering/getreserveringenbyuserid/${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        return await response.json();
    }
}