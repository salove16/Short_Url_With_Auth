const mongoose=require("mongoose")


const connect = ()=>{
    return mongoose.connect(
        "mongodb+srv://salove:salove@cluster0.0q9fsea.mongodb.net/SuppyNote-Auth?retryWrites=true&w=majority"
    )
}


module.exports=connect

