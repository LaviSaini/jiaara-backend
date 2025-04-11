module.exports = function (sequelize, DataTypes) {
    const tqio_postmeta = sequelize.define('tqio_postmeta', {
        meta_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        post_id: {
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
        tableName: 'tqio_postmeta'
    });

    tqio_postmeta.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_postmeta;
};
