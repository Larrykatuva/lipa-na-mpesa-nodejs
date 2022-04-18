import axios from "axios";
const { mpesa } = require('../../config/development')


/**
 * Mpesa service to call mpesa endpoints
 * 
 */

export default class MpesaService{

    /**
     * Getting access token
     */
    static async getAccessToken(){
        
        try {
            const response = await axios.get(mpesa.domain+'/oauth/v1/generate?grant_type=client_credentials', {
                auth: {
                    username: mpesa.username,
                    password: mpesa.password
                }
            })
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * Sorting date values
     * @param {*} n 
     * @returns 
     */
    static pad2(n){
        return n < 10 ? '0' + n : n
    }


    /**
     * Generating lipa na mpesa password
     * @returns {object} { BusinessShortCode, Password, Timestamp }
     */
    static async generateTimestamp(){
        const date = new Date();
        const BusinessShortCode = mpesa.businessShortCode;
        const PassKey = mpesa.passkey
        const Timestamp = date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes() ) + this.pad2( date.getSeconds() )

        const Password = Buffer.from(BusinessShortCode+PassKey+Timestamp).toString('base64');

        return { BusinessShortCode, Password, Timestamp }
    }

    /**
     * Lipa na mpesa
     * This function is called to trigger stk mpesa stk push
     * @param {integer} amount 
     * @param {string} partyA 
     * @param {string} partyB 
     * @param {string} transactionDesc 
     */
    static async lipaNaMpesa(amount, partyA, partyB, transactionDesc){
        try {
            const { access_token, expires_in } = await this.getAccessToken()

            const { BusinessShortCode, Password, Timestamp } = await this.generateTimestamp()
            
            const body = {
                "BusinessShortCode": BusinessShortCode,
                "Password": Password,
                "Timestamp": Timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": partyA,
                "PartyB": BusinessShortCode,
                "PhoneNumber": partyA,
                "CallBackURL": mpesa.ngrok+"/v1/call_back",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": transactionDesc
            }

            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
            };
            const response = await axios.post(mpesa.domain+'/mpesa/stkpush/v1/processrequest', body, config)
            return response
        } catch (error) {
            return error.response
        }
    }



    /**
     * RegisterUrls
     * This endpoint registers both confirmation and validation url
     * @param {integer} shortCode 
     * @param {string} responseType 
     * @param {string} confirmationUrl 
     * @param {string} validationUrl 
     * @returns {object} Response from safaricom
     */
    static async registerUrl(shortCode, responseType, confirmationUrl, validationUrl){
        try{
            const { access_token, expires_in } = await this.getAccessToken()

            const body = {
                    "ShortCode": shortCode,
                    "ResponseType": responseType,
                    "ConfirmationURL": confirmationUrl,
                    "ValidationURL": validationUrl
                }
            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
            };
            const response = await axios.post(mpesa.domain+'/mpesa/c2b/v1/registerurl', body, config)
            return response
        } catch (error){
            return error.response
        }
    }


    /**
     * Make payment requests from Client to Business (C2B)
     * @param {integer} amount 
     * @param {integer} phoneNumber 
     * @returns 
     */
    static async simulateC2BTransaction(amount, phoneNumber){
        try{
            const { access_token, expires_in } = await this.getAccessToken()

            const body = {
                "ShortCode": "600000",
                "CommandID": "CustomerPayBillOnline",
                "Amount": amount,
                "Msisdn": phoneNumber,
                "BillRefNumber": "ok1"
            }
            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
            };
            const response = await axios.post(mpesa.domain+'/mpesa/c2b/v1/simulate', body, config)
            return response
        } catch (error) {
            return error.response
        }
    }

}