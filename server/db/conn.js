const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,{useNewUrlParser: true})
    .then(()=>{
        console.log("Connection Successfull");
    })
    .catch((err)=>{
        console.log(err);
    })

