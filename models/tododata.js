const mongoose=require('mongoose');


const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    flag:{
        type:Boolean,
        default :false
    }
})

const TodoList = mongoose.model('TodoList', todoSchema);
module.exports=TodoList;