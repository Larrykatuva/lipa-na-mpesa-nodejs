'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MpesaTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MpesaTransaction.init({
    Amount: DataTypes.FLOAT,
    Phone: DataTypes.STRING,
    TransactionDesc: DataTypes.STRING,
    MerchantRequestID: DataTypes.STRING,
    CheckoutRequestID: DataTypes.STRING,
    ResultCode: DataTypes.INTEGER,
    ResultDesc: DataTypes.STRING,
    MpesaReceiptNumber: DataTypes.STRING,
    TransactionDate: DataTypes.DATE,
    PaymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MpesaTransaction',
  });
  return MpesaTransaction;
};