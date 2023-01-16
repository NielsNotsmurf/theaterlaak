
export default class BeheerHelper {
    static async getMomenten() {
        const response = await fetch('https://localhost:7242/api/moment', {
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

    static async getMomentById(showId) {
        const response = await fetch(`https://localhost:7242/api/moment/${showId}`, {
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

    static async getKaartHoudersShow(momentId, userId) {
        const response = await fetch(`https://localhost:7242/api/reservering/GetKaartjesHoudersOverzicht/${momentId}/${userId}`, {
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