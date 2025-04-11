module.exports = function (sequelize, DataTypes) {
    const tqio_wc_orders = sequelize.define('tqio_wc_orders', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        tax_amount: {
            type: DataTypes.DECIMAL(26, 8),
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.DECIMAL(26, 8),
            allowNull: true,
        },
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        billing_email: {
            type: DataTypes.STRING(320),
            allowNull: true,
        },
        date_created_gmt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        date_updated_gmt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        parent_order_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        payment_method: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        payment_method_title: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        transaction_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        ip_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        user_agent: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        customer_note: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: 'tqio_wc_orders'
    });

    tqio_wc_orders.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_wc_orders;
};
