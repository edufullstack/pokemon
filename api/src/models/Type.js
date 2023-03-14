const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'type',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]+$/,
        },
      },
    },
    { timestamps: false }
  )
}
// 📍 MODELO 2 | Type

// ID. *
// Nombre. *
