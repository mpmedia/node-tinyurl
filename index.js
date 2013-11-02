require("coffee-script");
var app,models;

models=require('./src/models');
app=require("./src/app");

models.init();

app.listen(process.env.PORT || 3000);


