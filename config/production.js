require('dotenv').config();


const {
    PORT_PROD,
    MPESA_PROD_USERNAME,
    MPESA_PROD_PASSWORD,
    MPESA_PROD_BUSINESS_SHORT_CODE,
    MPESA_PROD_PASSKEY,
    MPESA_PROD_CALLBACK,
    MPESA_PROD_ACCESS_TOKEN_URL,
    MPESA_PROD_LIPA_NA_MPESA_URL,
    DATABASE_PROD_USERNAME,
    DATABASE_PROD_PASSWORD,
    DATABASE_PROD_NAME,
    DATABASE_PROD_HOST,
    EMAIL,
    EMAIL_PASSWORD
} = process.env


module.exports = {
    NODE_ENV: 'development',
    port: PORT_PROD || 5000,
    database: {
        username: DATABASE_PROD_USERNAME,
        password: DATABASE_PROD_PASSWORD,
        name: DATABASE_PROD_NAME,
        host: DATABASE_PROD_HOST
    },
    mpesa: {
        username: MPESA_PROD_USERNAME,
        password: MPESA_PROD_PASSWORD,
        passkey: MPESA_PROD_PASSKEY,
        businessShortCode: MPESA_PROD_BUSINESS_SHORT_CODE,
        callBack: MPESA_PROD_CALLBACK,
        tokenUrl: MPESA_PROD_ACCESS_TOKEN_URL,
        lipaNaMpesaUrl: MPESA_PROD_LIPA_NA_MPESA_URL
    },
    email: {
        name: EMAIL,
        password: EMAIL_PASSWORD
    }
}