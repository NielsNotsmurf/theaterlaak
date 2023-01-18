import { authHeader, config, handleError, handleResponse } from '../Helpers';

const donatieService = {
    getDonaties,
    postDonatie,
    countDonatieTotaal,
    getGoedDoelById,
    getGoedeDoelen
};
export default donatieService;


function getDonaties(userAuthToken) {
    const response =  fetch('https://ikdoneer.azurewebsites.net/api/donatie', {
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

    return response.json();
}

function postDonatie(userAuthToken, doelId, hoeveelheid, tekst) {
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

function countDonatieTotaal(userAuthToken) {
    const donaties =  this.getDonaties(userAuthToken);

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

function getGoedeDoelen(userAuthToken) {
    const response =  fetch('https://ikdoneer.azurewebsites.net/api/goededoelen', {
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

    return  response.json();
}

function getGoedDoelById(userAuthToken, doelId) {
    const response =  fetch(`https://ikdoneer.azurewebsites.net/api/goededoelen/${doelId}`, {
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

    return  response.json();
}