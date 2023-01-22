export function getLocalUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
}

