module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING
    });

    User.associate = function (models) {
        User.hasOne(models.Tenet, {
            onDelete: "cascade"
        });
    };

    return User
};