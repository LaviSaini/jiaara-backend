module.exports = function (sequelize, DataTypes) {
    const otp = sequelize.define('otp', {
        otp_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        otp: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'otp',
    });
    otp.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return otp;
}