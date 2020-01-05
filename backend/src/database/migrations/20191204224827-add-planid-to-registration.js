

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('registrations', 'plan_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'plans',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
