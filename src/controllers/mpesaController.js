import MpesaService from "../services/mpesa";
import MpesaHelper from "../helpers/mpesa";
import createError from 'http-errors';
import res from "express/lib/response";

export default class MpesaController{


    /**
     * Getting access token
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     */
    static async getAccessToken(req, res, next){
        try {
            const access_token = await MpesaService.getAccessToken()
            return res
                .status(200)
                .send(access_token)
        } catch (error) {
            // console.log(error)
            next({
                data: createError(
                    error.status,
                    error.message
                )
            });
        }
    }


    /**
     * Initiate lipa na mpesa payment
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     * @returns {object} res intitate lipa na mpesa json response
     */
    static async lipaNaMpesa(req, res, next){
        const { body: { amount, phone, transactionDesc } } = req
        try{
            const result = await MpesaHelper.initiatePayment(amount, phone, phone, transactionDesc)
            return res
                .status(result.status)
                .send(result.data)
        } catch (error) {
            return res
                .status(400)
                .send(error.message)
        }
    }


    /**
     * Complete a mpesa transaction
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     * @returns {object} Transaction record updated
     */
    static async mpesaCallBack(req, res, next){
        const { 
            body: 
                { Body: {
                    stkCallback: {
                        CheckoutRequestID,
                        ResultCode,
                        ResultDesc,
                        CallbackMetadata
                    }
                }
            }
        } = req
        try {
            if (ResultCode === 0){
                const result = await MpesaHelper.completeSuccessfulTransaction(
                    CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata)
                    return res.status(200).send(result)
            }else{
                const result = await MpesaHelper.completeUnsuccessfulTransaction(
                    CheckoutRequestID, ResultCode, ResultDesc
                );
                return res.status(400).send(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Register confirmation and validation urls with safaricom
     * @param {Request} req 
     * @param {Response} res 
     * @param {Next} next 
     * @returns {object} res a safaricom object message
     */
    static async registerUrl(req, res, next){
        const { body: { shortCode, responseType, confirmationURL, validationURL} } = req
        try {
            const result = await MpesaHelper.registerUrls(shortCode, responseType, confirmationURL, validationURL)
            if (result.status === 200){
                return res.status(200).send(result.data)
            }
            return res.status(400).send(result.data)
        } catch (error) {
            console.log(error)
            return res.status(400).send(error.data)
        }
    }

    /**
     * Validating safaricom C2B mpesa request
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     * @returns {object} res a validation response to safaricom
     */
    static async mpesaValidation(req, res, next){
        console.log("called")
        try {
            const { result_code, result_description } = MpesaHelper.createValidationResponse()
            const result = {
                "ResultCode": result_code,
                "ResultDesc": result_description
            }
            return res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static async mpesaConfirmation(req, res, next){
        console.log("called")
        try {
            const { result_code, result_description } = MpesaHelper.createValidationResponse()
            const result = {
                "ResultCode": result_code,
                "ResultDesc": result_description
            }
            return res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static async simulateB2CTransaction(req, res, next){
        const { body: {amount, phoneNumber } } = req
        try {
            const result = await MpesaHelper.simulateB2CTransaction(amount, phoneNumber)
            if (result){
                return res.status(200).send(result.data)
            }
            return res.status(result.status).send(result.data)
        } catch (error) {
            console.log(error)
        }
    }
}