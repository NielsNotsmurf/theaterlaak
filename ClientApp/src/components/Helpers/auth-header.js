export function authHeader() {

    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken,
        };
    } else {
        return {};
    }
}
