import MpesaService from "../services/mpesa";
const MpesaTransaction = require("../sequilize/models").MpesaTransaction


export default class MpesaHelper{

    /**
     * Initiate mpesa transaction and stk push
     * @param {integer} amount 
     * @param {string} partyA 
     * @param {string} partyB 
     * @param {string} transactionDesc 
     */
    static async initiatePayment(amount, partyA, partyB, transactionDesc){
        try {
            const response = await MpesaService.lipaNaMpesa(amount, partyA, partyB, transactionDesc)
            const { 
                data: { 
                    MerchantRequestID,
                    CheckoutRequestID
                } 
            } = response
            if (response.status === 200){
                await MpesaTransaction.create({
                    Amount: amount,
                    Phone: partyA,
                    TransactionDesc: transactionDesc,
                    MerchantRequestID: MerchantRequestID,
                    CheckoutRequestID: CheckoutRequestID,
                    PaymentStatus: "PENDING"
                })
            }
            return response
        } catch (error) {
            throw error
        }
    }


    /**
     * Complete successful transaction
     * @param {string} CheckoutRequestID 
     * @param {integer} ResultCode 
     * @param {string} ResultDesc 
     * @param {object} CallbackMetadata 
     * @returns {object} Transaction record updated
     */
    static async completeSuccessfulTransaction(CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata){
        const { Item } = CallbackMetadata
        try {
            return await MpesaTransaction.update({
                ResultCode: ResultCode,
                ResultDesc: ResultDesc,
                MpesaReceiptNumber: Item[1].Value,
                TransactionDate: Item[3].Value,
                PaymentStatus: "SUCCESS"
            },
            {
                where: {
                    CheckoutRequestID: CheckoutRequestID
                }
            })
        } catch (error) {
            throw error
        }
    }


    /**
     * Complete unsuccessful transaction
     * @param {string} CheckoutRequestID 
     * @param {integer} ResultCode 
     * @param {string} ResultDesc 
     * @returns {object} Transaction record updated
     */
    static async completeUnsuccessfulTransaction(CheckoutRequestID, ResultCode, ResultDesc){
        try {
            return await MpesaTransaction.update({
                ResultCode: ResultCode,
                ResultDesc: ResultDesc,
                PaymentStatus: "CANCELLED"
            }, 
            {
                where: {
                    CheckoutRequestID: CheckoutRequestID
                }
            })
        } catch (error) {
            throw error
        }
    }

    /**
     * Register validation and confirmation URLs on M-Pesa
     * @param {string} shortCode 
     * @param {string} responseType 
     * @param {string} confirmationUrl 
     * @param {string} validationUrl 
     * @returns {object} res a safaricom response 
     */
    static async registerUrls(shortCode, responseType, confirmationUrl, validationUrl){
        try{
            return await MpesaService.registerUrl(shortCode, responseType, confirmationUrl, validationUrl)
        } catch (error){
            throw error
        }
    }

    /**
     * Validating safaricom C2B mpesa request
     * @returns {object} res a validation response to safaricom
     */
    static createValidationResponse(){
        const result_code = "0"
        const result_description = "Accepted validation request."
        return { result_code, result_description }
    }


    /**
     * Make payment requests from Client to Business (C2B)
     * @param {integer} amount 
     * @param {integer} phoneNumber 
     * @returns 
     */
    static async simulateB2CTransaction(amount, phoneNumber){
        try {
            return await MpesaService.simulateC2BTransaction(amount, phoneNumber)
        } catch (error) {
            throw error
        }
    }

}