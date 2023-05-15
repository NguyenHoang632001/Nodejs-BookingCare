'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'admin.com',
      password:'123456',
      firstName: 'Nguyen',
      lastName: 'Hoang',
      address:'Bình Dịnh',
      gender:1,
     phoneNumber:'123456789',
     positionId:"1",
      roleId:'R1',
      image:'abc',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
