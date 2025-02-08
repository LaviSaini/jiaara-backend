module.exports = function (sequelize, DataTypes) {
    const wishlist = sequelize.define('wishlist', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        wish_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        data: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'wishlist',
    });
    wishlist.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return wishlist;
}