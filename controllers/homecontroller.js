
// adding  mongoose to this page
const TodoList = require('../models/tododata');



// rendering todo application home  page 
module.exports.home = function (req, res) {

    TodoList.find({}, function (err, data) {
        if (err) {
            console.log("somthing went wrong");
            return;
        }
        return res.render('home', {
            todolist: data
        })
    })
}


// this is function use to return  date number to a specific string structure 
function dateConverter(det) {
    // assume a array for converting month number to string 
    var month = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC", "NO DEADLINE"];

    // split() is use to return an arry by filtering given string 
    det = det.split('-');

    // det[0]==gives year in number det[2]=gives day in number and det[1]=gives month number 

    // below code is use to convert date in a specific structure 
    let res;
    if (det[1]) {
        let m = month[(det[1] - 1)];
        res = m + " " + det[2] + " , " + det[0];
    } else {
        res = "NO DEADLINE";
    }

    return res;

}


// adding new task to todo application 
module.exports.addlist = function (req, res) {

    let date = dateConverter(req.body.date);

    TodoList.create({
        description: req.body.description,
        category: req.body.category,
        date: date
    }, function (err) {
        if (err) {
            console.log("somthing went wrong in adding ");
        }
    })
    return res.redirect('back');
}

// this is use to update cheked button when work done
module.exports.update = function (req, res) {
    // it is string in which query comming from client side which conting id and flag value 
    informatin = req.query.id;

    // it return array of string in which separated by and containing id and flag value 
    let newinformation = informatin.split(',');

    // this contain id of checked checkbox 
    let id = newinformation[0];

    // this contain flag value of checkbox for checked it is true and for uncheked it it false  
    let fg = newinformation[1];

    // updating flag value as for unchecked checkbox flag =false and for checked checkbox flag =true 
    TodoList.updateOne({ _id: id }, { $set: { flag: fg } }, function (err, todoData) {
        if (err) {
            console.log('erroe while updating');
            return;
        }
        return res.redirect('/');
    })
}



// controller for delete a task 
module.exports.delete = function (req, res) {
    let idArray = req.query.id;

    // this return array containing id of all checked checkbox 
    newArrayId = idArray.split(',');

    // by using loop find this id  and delete 
    for (let i of newArrayId) {
        TodoList.findByIdAndDelete(i, function (err) {
            if (err) {
                console.log("somthing wrong in deleting");
                return;
            }
        })
    }
    return res.redirect('/back');
}

