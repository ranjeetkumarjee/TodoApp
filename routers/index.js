const express = require('express')


const router = express.Router()

// this is use to access homecontroller from controller folder 
const homeController=require('../controllers/homecontroller');


// for routing  a todo application when reqest is '/' 
router.get('/',homeController.home);

// routin to adding todo list to todo application when request is '/add-todolist'
router.post('/add-todolist',homeController.addlist);

// this route is use to delete all checked  task 
router.post('/delete-task/',homeController.delete);

// this route is used when we click on checkbox . this update the flag value as true for completed work and false for not complete task 
router.post('/updating-check/',homeController.update);


module.exports=router;