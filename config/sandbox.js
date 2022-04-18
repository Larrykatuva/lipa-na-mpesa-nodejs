require('dotenv').config();


const {
    PORT_SANDBOX,
    MPESA_SANDBOX_USERNAME,
    MPESA_SANDBOX_PASSWORD,
    MPESA_SANDBOX_BUSINESS_SHORT_CODE,
    MPESA_SANDBOX_PASSKEY,
    MPESA_SANDBOX_CALLBACK,
    MPESA_SANDBOX_ACCESS_TOKEN_URL,
    MPESA_SANDBOX_LIPA_NA_MPESA_URL,
    DATABASE_SANDBOX_USERNAME,
    DATABASE_SANDBOX_PASSWORD,
    DATABASE_SANDBOX_NAME,
    DATABASE_SANDBOX_HOST,
    EMAIL,
    EMAIL_PASSWORD
} = process.env


module.exports = {
    NODE_ENV: 'sandbox',
    port: PORT_SANDBOX || 5000,
    database: {
        username: DATABASE_SANDBOX_USERNAME,
        password: DATABASE_SANDBOX_PASSWORD,
        name: DATABASE_SANDBOX_NAME,
        host: DATABASE_SANDBOX_HOST
    },
    mpesa: {
        username: MPESA_SANDBOX_USERNAME,
        password: MPESA_SANDBOX_PASSWORD,
        passkey: MPESA_SANDBOX_PASSKEY,
        businessShortCode: MPESA_SANDBOX_BUSINESS_SHORT_CODE,
        callBack: MPESA_SANDBOX_CALLBACK,
        tokenUrl: MPESA_SANDBOX_ACCESS_TOKEN_URL,
        lipaNaMpesaUrl: MPESA_SANDBOX_LIPA_NA_MPESA_URL
    },
    email: {
        name: EMAIL,
        password: EMAIL_PASSWORD
    }
}