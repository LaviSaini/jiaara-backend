module.exports = function (sequelize, DataTypes) {
    const tqio_wc_order_addresses = sequelize.define('tqio_wc_order_addresses', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        address_type: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        company: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address_1: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address_2: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        postcode: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: 'tqio_wc_order_addresses'
    });

    tqio_wc_order_addresses.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_wc_order_addresses;
};
