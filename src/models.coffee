models=exports
###
MODELS
###
Sequelize = require 'sequelize'

models.sequelize = sequelize = new Sequelize process.env.NODE_TINYURL_DB, #initialisation de la base de donn�e
    define:
        underscored:true

# entities

models.Url=sequelize.define 'Url',
    original:Sequelize.STRING
    
models.Visit=sequelize.define 'Visit',
    ip:
        type:Sequelize.STRING
        validate:
            isIP:true
    country:Sequelize.STRING
    
models.Link=sequelize.define 'Link',
    identifier:
        type:Sequelize.STRING
        unique:true

# associations

models.Url.belongsTo(Link)

models.Visit.belongsTo(Link)

models.Link.hasOne(Url)

models.Link.hasMany(Visit)
        
models.init = ->
    # synchroniser la base de donn�e
    sequelize.sync({force:true}).error (err)->
        throw new Error(err)

