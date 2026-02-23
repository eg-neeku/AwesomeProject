import axios from "axios";

const API_KEY = "RNYKfDJVZMm8AtXLEk0nMc3mxt57LjAvcOTKBHHw";
const MY_URL = "https://identitytoolkit.googleapis.com/v1/accounts:"

export async function authenticate(mode, email, password) {
    const response = await axios.post(`${MY_URL}${mode}?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
    const token = response.data.idToken;
    return token;
}

export async function createUser(email, password) {
    // const response = await axios.post(`${MY_URL}signUp?key=${API_KEY}`,
    //     {
    //         email:email,
    //         password:password,
    //         returnSecureToken:true
    //     }
    // );

    const token = await authenticate('aignup', email, password)
    return token;
}

export async function login(email, password) {
    const token = await authenticate('signInWithPassword', email, password);
    return token;
}