var Sequelize, models, sequelize, Promise;
const HOST_IP = "http://api.hostip.info/get_xml.php?ip=";
/**
 * @namespace models
 */
models = exports;

/*
 MODELS
 */

Sequelize = require('sequelize');
Promise = require('promise');

models.sequelize = sequelize = new Sequelize(process.env.NODE_TINYURL_DB, {
	define : {
		underscored : true
	}
});

models.Url = sequelize.define('Url', {
	original : Sequelize.STRING
});

models.Visit = sequelize.define('Visit', {
	ip : {
		type : Sequelize.STRING,
		validate : {
			isIP : true
		}
	},
	country : Sequelize.STRING
});

models.Link = sequelize.define('Link', {
	identifier : {
		type : Sequelize.STRING,
		unique : true
	}
});

models.Url.belongsTo(models.Link);

models.Visit.belongsTo(models.Link);

models.Link.hasOne(models.Url);

models.Link.hasMany(models.Visit);

models.init = function() {
	return sequelize.sync({
		force : true
	}).error(function(err) {
		throw new Error(err);
	});
};
