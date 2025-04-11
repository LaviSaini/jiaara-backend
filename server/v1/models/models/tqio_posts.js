module.exports = function (sequelize, DataTypes) {
    const tqio_posts = sequelize.define('tqio_posts', {
        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        post_author: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date('0000-00-00T00:00:00Z')
        },
        post_date_gmt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date('0000-00-00T00:00:00Z')
        },
        post_content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        post_title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_excerpt: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'publish'
        },
        comment_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'open'
        },
        ping_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'open'
        },
        post_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        post_name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: ''
        },
        to_ping: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pinged: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_modified: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date('0000-00-00T00:00:00Z')
        },
        post_modified_gmt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date('0000-00-00T00:00:00Z')
        },
        post_content_filtered: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        post_parent: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        guid: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        menu_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        post_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'post'
        },
        post_mime_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        comment_count: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        tableName: 'tqio_posts'
    });

    tqio_posts.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        return values;
    };
    return tqio_posts;
};
