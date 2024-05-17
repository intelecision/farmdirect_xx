import axios from 'axios' //

//import env from "dotenv";

//env.config({ path: "./.env" });

//const stripePublishableKey = process.env.PUBLISHABLE_KEY || "";
//const stripeSecretKey = process.env.SECRET_KEY || "";
//const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

const baseUrl = routes.BASE_URL + '/stripepayments'

let staticHeaders = {
    'Content-Type': 'application/json',
    // "environment": getEnvironmentStringVal(appPaymentParameters.environment),
}

export const createPaymentIntent = async (
    paymentMethodType,
    currency,
    amount
) => {
    const url = baseUrl + '/create-payment-intent'
    const headers = { ...staticHeaders }

    const body = { paymentMethodType, currency, amount }
    try {
        console.log('\n\n')
        console.log(`REQUEST:\n ${url}`)
        console.log(`HEADERS:`)
        console.log(headers)
        console.log(`BODY:`)
        console.log(body)

        const response = await axios.post(url, body, { headers: headers })
        console.log('\n\n')
        console.log(`RESPONSE:\n [${response.status}] ${url}`)
        console.log(`BODY:`)
        console.log(body)
        console.log('\n\n')

        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            const err = new Error(
                `Request failed with status ${
                    response.status
                }.\nBody: ${JSON.stringify(response.data)}`
            )
            console.error(err)
            throw err
        }
    } catch (err) {
        console.log(err.response.data)
        console.error(err)
        throw err
    }
}

export const getPublishableKey = async () => {
    //
    const url = baseUrl + '/public-keys'
    const headers = { ...staticHeaders }

    try {
        const response = await axios.get(url, { headers: headers })

        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            const err = new Error(
                `Request failed with status ${
                    response.status
                }.\nBody: ${JSON.stringify(response.data)}`
            )
            console.error(err)
            throw err
        }
    } catch (err) {
        console.log(err.response.data)
        console.error(err)
        throw err
    }
}
