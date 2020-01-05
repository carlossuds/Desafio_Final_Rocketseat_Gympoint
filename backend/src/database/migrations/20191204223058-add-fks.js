module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('registrations', 'student_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'students',
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('registrations', 'student_id');
  },
};
