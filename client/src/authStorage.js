import { setLocalStorage } from "./localStorage.js";

export const setAuthentication = (user) => {
    setLocalStorage("user2", user)
}

export const setAuthentication2 = (user) => {
    setLocalStorage("user3", user.id)
}