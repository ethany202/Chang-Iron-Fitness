import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/`,
    timeout: 10000,
});


const postRequest = async (content: any, path: string) => {
    try {
        const response = await api.post(path, content)
        return response
    }
    catch (err) {
        console.error(err)
        return {}
    }
}

export const postCheckoutLink = async (productInfo: {
    productName: string,
    priceAmount: number
}) => {
    const path = "pull-checkout-link"
    return await postRequest(productInfo, path)
}

export const postLogin = async (userInfo: {
    email: string,
    password: string
}) => {
    const path = "login"
    return await postRequest(userInfo, path)
}

export const postRegister = async (userInfo: {
    userFirstName: string,
    userLastName: string,
    email: string,
    password: string
}) => {
    const path = "register"
    return await postRequest(userInfo, path)
}
