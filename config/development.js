require('dotenv').config();


const {
    PORT_DEV,
    MPESA_DEV_USERNAME,
    MPESA_DEV_PASSWORD,
    MPESA_DEV_BUSINESS_SHORT_CODE,
    MPESA_DEV_PASSKEY,
    MPESA_DEV_CALLBACK,
    MPESA_DEV_ACCESS_TOKEN_URL,
    MPESA_DEV_LIPA_NA_MPESA_URL,
    DATABASE_DEV_USERNAME,
    DATABASE_DEV_PASSWORD,
    DATABASE_DEV_NAME,
    DATABASE_DEV_HOST,
    EMAIL,
    EMAIL_PASSWORD,
    MPESA_SANDBOX,
    NGROK_URL
} = process.env


module.exports = {
    NODE_ENV: 'development',
    port: PORT_DEV || 5000,
    database: {
        username: DATABASE_DEV_USERNAME,
        password: DATABASE_DEV_PASSWORD,
        name: DATABASE_DEV_NAME,
        host: DATABASE_DEV_HOST
    },
    mpesa: {
        username: MPESA_DEV_USERNAME,
        password: MPESA_DEV_PASSWORD,
        passkey: MPESA_DEV_PASSKEY,
        businessShortCode: MPESA_DEV_BUSINESS_SHORT_CODE,
        callBack: MPESA_DEV_CALLBACK,
        tokenUrl: MPESA_DEV_ACCESS_TOKEN_URL,
        lipaNaMpesaUrl: MPESA_DEV_LIPA_NA_MPESA_URL,
        domain: MPESA_SANDBOX,
        ngrok: NGROK_URL
    },
    email: {
        name: EMAIL,
        password: EMAIL_PASSWORD
    }
}