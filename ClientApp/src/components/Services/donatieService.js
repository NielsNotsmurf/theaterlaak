export default class DoneerService {
    static async getDonaties(userAuthToken) {
        const response = await fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userAuthToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        return await response.json();
    }

    static async postDonatie(userAuthToken, doelId, hoeveelheid, tekst) {
        const body = { Doel: parseInt(doelId), Hoeveelheid: parseInt(hoeveelheid), Tekst: tekst };
        console.log(body);
        fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userAuthToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => response.json())
        .then((data) => {
            return data;
        }).catch((error) => console.log(error));
    }

    static async countDonatieTotaal(userAuthToken) {
        const donaties = await this.getDonaties(userAuthToken);

        if (donaties.length > 0) {
            let aantal = 0;
            donaties.forEach((donatie) => {
                aantal += donatie.hoeveelheid;
            });
            return aantal;
        } else {
            return 0;
        }
    }

    static async getGoedeDoelen(userAuthToken) {
        const response = await fetch('https://ikdoneer.azurewebsites.net/api/goededoelen', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userAuthToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        return await response.json();
    }

    static async getGoedDoelById(userAuthToken, doelId) {
        const response = await fetch(`https://ikdoneer.azurewebsites.net/api/goededoelen/${doelId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userAuthToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        return await response.json();
    }
}