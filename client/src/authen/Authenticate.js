import Cookies from 'js-cookies'

const key = "shopsess"
var user = null

// async function checkAuthen() {
//     if (!!!Cookies.getIte(key)) {
//         return false
//     }

//     if (user == null) {
//         let res = await fetch("/users/by-cookie")
//         console.log(res)
//         return false
//     } else {
//         return !!Cookies.getItem(key)
//     }
// }


export const getUser = async () => {
    if (!isAuthenticated()) {
        return null;
    }

    let res = await fetch("/users/by-cookie")
    let data = await res.json()
    console.log(data)
    return data
}

export const isAuthenticated = () => !!Cookies.getItem(key)

export const authenticate = async () => {
    try {
        let id = Cookies.getItem(key);
        return id != null && id != ""
    } catch (err) {
        console.log(err);
    }
    return false;
}

