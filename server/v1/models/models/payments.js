module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define('carts', {
        payment_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        payment_method: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Cash on Delivery"
        },
        payment_amount: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'IN_PROGRESS',
            validate: {
                isIn: [['SUCCESSFUL', 'FAILED', 'IN_PROGRESS']]
            }
        }
    }, {
        timestamps: false,
        tableName: 'payments',
    });
    users.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return users;
}