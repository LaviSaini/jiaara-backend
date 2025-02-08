module.exports = function (sequelize, DataTypes) {
    const tqio_users = sequelize.define('tqio_users', {
        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_login: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        user_pass: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        user_nicename: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        user_url: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_registered: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        user_activation_key: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        user_status: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        display_name: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'tqio_users'
    });

    tqio_users.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };

    return tqio_users;
};
