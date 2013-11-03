require("coffee-script");
var app,models;

models=require('./lib/models');
app=require("./lib/app");

models.init();

app.listen(process.env.PORT || 3000);


