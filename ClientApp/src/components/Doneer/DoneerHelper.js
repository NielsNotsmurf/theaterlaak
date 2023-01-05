

export default class DoneerHelper {
    static async getDonaties() {

        const response = await fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOWExODA2Zi1hYmYxLTRjMGYtODgyMS0xZGQzYjA3M2Q0ODYiLCJqdGkiOiJhMGQ0NDgxMi0yMDYzLTQxNzQtOTliZC1lYmE5NDc5NTM4YjciLCJpYXQiOiIwMS8wNC8yMDIzIDIyOjUxOjQ5IiwiVXNlcklkIjoiMzlhMTgwNmYtYWJmMS00YzBmLTg4MjEtMWRkM2IwNzNkNDg2IiwiRW1haWwiOiJ0ZXN0YmV0YWFsQGdtYWlsLmNvbSIsImV4cCI6MTk4ODQ5MTkwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.dZRYBinGpeG3E_rKqR8AquLK6qsZ8cEPm4Z4NPTD-Pk',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`)
        }

        const data = await response.json();
        console.log(data)
        return data;
    }

    static postDonatie(doelId, hoeveelheid, tekst) {
        const body = { Doel: doelId, Hoeveelheid: hoeveelheid, Tekst: tekst };
        fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOWExODA2Zi1hYmYxLTRjMGYtODgyMS0xZGQzYjA3M2Q0ODYiLCJqdGkiOiJhMGQ0NDgxMi0yMDYzLTQxNzQtOTliZC1lYmE5NDc5NTM4YjciLCJpYXQiOiIwMS8wNC8yMDIzIDIyOjUxOjQ5IiwiVXNlcklkIjoiMzlhMTgwNmYtYWJmMS00YzBmLTg4MjEtMWRkM2IwNzNkNDg2IiwiRW1haWwiOiJ0ZXN0YmV0YWFsQGdtYWlsLmNvbSIsImV4cCI6MTk4ODQ5MTkwOSwiaXNzIjoiSWtEb25lZXIiLCJhdWQiOiIqIn0.dZRYBinGpeG3E_rKqR8AquLK6qsZ8cEPm4Z4NPTD-Pk',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => response.json())
        .then((data) => {
            return data;
        }).catch((error) => console.log(error));
    }

    static async countDonatieTotaal() {
        const donaties = await this.getDonaties();

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
}