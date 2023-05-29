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
    message_id: {type: Sequelize.STRING, unique: true},
    mail_source: Sequelize.STRING,
    mail_content: Sequelize.JSONB,
    created_at: Sequelize.DATE, 
    updated_at: Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('fox_mail');
  }
};
