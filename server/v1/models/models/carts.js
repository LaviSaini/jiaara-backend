module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define('carts', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        cart_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'ACTIVE'
        }
    }, {
        timestamps: false,
        tableName: 'carts',
    });
    users.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return users;
}