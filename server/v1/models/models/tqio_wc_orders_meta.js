module.exports = function (sequelize, DataTypes) {
    const tqio_wc_orders_meta = sequelize.define('tqio_wc_orders_meta', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        meta_key: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        meta_value: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: 'tqio_wc_orders_meta'
    });

    tqio_wc_orders_meta.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_wc_orders_meta;
};
