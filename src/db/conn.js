//appel au mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/api_rest_db",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful ");
}).catch((error)=>{
    console.log(" no connection ");

})