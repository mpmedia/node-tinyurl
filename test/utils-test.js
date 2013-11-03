var utils, path;

path = require('path');
utils = require(__dirname + "/../lib/utils.js");

describe("utils", function() {
	const IP = "83.112.245.11";
	it("should find the country from an ip", function() {
		assert.equal(utils.countryFromIp(IP), IP);
	});
});
