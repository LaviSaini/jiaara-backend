module.exports = function (sequelize, DataTypes) {
    const tqio_usermeta = sequelize.define('tqio_usermeta', {
        umeta_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        meta_key: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        meta_value: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'tqio_usermeta'
    });

    tqio_usermeta.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_usermeta;
};
