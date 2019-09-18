module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    // Giving the Tenant model a name of type STRING
    name: DataTypes.STRING
  });

  Tenant.associate = function(models) {

    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts

    Tenant.hasMany(models.Ticket, {
      onDelete: "cascade"
    });
  };

  return Tenant;
};
