import { authHeader, handleError, handleResponse } from '../Helpers';


const applicationUserService = {
    getUserById,
    updateUserWithToken,
};

export default applicationUserService;

async function getUserById(id) {
    const response = await fetch(`https://localhost:7242/api/applicationuser/${id}`, {
        method: 'GET',
        headers: authHeader()
    });

    if (!response.ok) {
        throw new Error(`Http error! status: ${response.status}`)
    }

    return await response.json();
}

async function updateUserWithToken(token) {
    const body = { JwtDonatieToken: token }
    await fetch('https://localhost:7242/api/applicationuser', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse, handleError);
}