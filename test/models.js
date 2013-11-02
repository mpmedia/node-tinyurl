var assert, models, Sequelize, async;

require("coffee-script");

assert = require("assert");
async = require("async");

/**
 * Application models
 * @type {Object}
 */
models = require(__dirname + "/../src/models");

beforeEach(function(done) {
    models.init().then(function() {
        done();
    });
});

describe('Link', function() {
    const ORIGINAL = "http://google.com";
    const IDENTIFIER = "goog";

    describe("create", function() {
        it('should create a link and a url ', function(done) {
            async.auto({
                link : function(next) {
                    models.Link.create({
                        identifier : IDENTIFIER,
                    }).complete(next);
                },
                url : ['link',
                function(next, results) {

                    var url = models.Url.build({
                        original : ORIGINAL
                    });
                    results.link.setUrl(url).complete(next);
                }],
                'final' : ['url',
                function(next, results) {
                    models.Link.find({
                        where : {
                            id : results.link.id
                        },
                        include : [models.Url]
                    }).complete(next);
                }]

            }, function(err, results) {
                var link = results.final;
                assert.equal(link.identifier, IDENTIFIER);
                assert.equal(link.url.original, ORIGINAL);
                done();
            });
        });
    });
});

