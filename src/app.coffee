###
EXPRESS APP DEFINITION
###

express=require "express"
consolidate = require "consolidate"
swig = require 'swig'

app=express()

###
SETTINGS
###
app.set('title','Tiny URL clone')
app.set('views',__dirname+"/../views") # view folder
app.enable('trust proxy')

###
TEMPLATE ENGINE
###
#app.engine 'jade',require('jade').__express

app.engine 'twig', swig.renderFile
app.set 'view engine','twig'

app.configure 'development',-> # development settings
  app.set 'view cache',false
 


###
MIDDLEWARES
###
app.use(express.logger())
app.use(express.static(__dirname+"/../static")) # static directory
#app.use(express.favicon())


#app.use (req,res,next)-> 
  #LOGGER
#  console.log('%s %s',req.method,req.url)
#  next()
  
###
ROUTES
###

app.get "/:username",(req,res)->
  res.render 'layout',content:'Your username is '+req.params.username
  
app.get "/*",(req,res)->
  res.render 'layout', content:'Hello Dude'
  
module.exports = app
  
  
