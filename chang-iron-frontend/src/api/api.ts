const baseURL: string = process.env.REACT_APP_BACKEND_URL

const postRequest = async (content: any, path: string) => {
    try {
        const response = await fetch(`${baseURL}/${path}`, {
            method: "POST",
            body: content,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        return response
    }
    catch (err) {
        console.error(err)
        return {}
    }
}

const postCheckoutLink = async (productInfo: {
    productName: string,
    priceAmount: number
}) => {
    const path = "pull-checkout-link"
    return await postRequest(productInfo, path)
}

const postLogin = async (userInfo: {
    email: string,
    password: string
}) => {
    const path = "login"
    return await postRequest(userInfo, path)
}
