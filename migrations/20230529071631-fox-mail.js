'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.createTable('fox_mail', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mailId: {type: Sequelize.STRING, unique: true},
    mailSource: Sequelize.STRING,
    mailContent: Sequelize.JSONB,
    created_at: Sequelize.DATE, 
    updated_at: Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('fox_mail');
  }
};
