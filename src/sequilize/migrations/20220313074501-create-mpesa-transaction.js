'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MpesaTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Amount: {
        type: Sequelize.FLOAT
      },
      Phone: {
        type: Sequelize.STRING
      },
      TransactionDesc: {
        type: Sequelize.STRING
      },
      MerchantRequestID: {
        type: Sequelize.STRING
      },
      CheckoutRequestID: {
        type: Sequelize.STRING
      },
      ResultCode: {
        type: Sequelize.INTEGER
      },
      ResultDesc: {
        type: Sequelize.STRING
      },
      MpesaReceiptNumber: {
        type: Sequelize.STRING
      },
      TransactionDate: {
        type: Sequelize.DATE
      },
      PaymentStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MpesaTransactions');
  }
};