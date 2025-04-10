module.exports = function (sequelize, DataTypes) {
    const tqio_wc_order_product_lookup = sequelize.define('tqio_wc_order_product_lookup', {
        order_item_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        variation_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal(`'0000-00-00 00:00:00'`), // You might want to change this to NULL or CURRENT_TIMESTAMP
        },
        product_qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_net_revenue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        product_gross_revenue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        coupon_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tax_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        shipping_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        shipping_tax_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        timestamps: false,
        tableName: 'tqio_wc_order_product_lookup'
    });

    tqio_wc_order_product_lookup.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_wc_order_product_lookup;
};
