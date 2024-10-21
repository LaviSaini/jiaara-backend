module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'USER',
            enum: ['USER', 'ADMIN'],
        }
    }, {
        timestamps: false,
        tableName: 'users',
    });
    users.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return users;
}