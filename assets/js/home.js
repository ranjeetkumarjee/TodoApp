

// this is use to add different-different color to different category 
window.addEventListener('load', function () {
    // this query selector use to select all task category 
    let items = document.querySelectorAll('.task-place');

    // this query selector is use to select all div in which category is display 
    var s_part = document.querySelectorAll('.second-part');
    for (let i = 0; i < items.length; i++) {
        let categry=items[i].innerText;

        if(categry==""){
            s_part[i].classList.add('dis-none');
        }else if (categry == "personal") {
            items[i].classList.add('blu');
        }else if (categry == "work") {
            items[i].classList.add('pink');
        }else if (categry == "school") {
            items[i].classList.add('yellow');
        }else if (categry == "cleaning") {
            items[i].classList.add('aqua');
        }else if (categry == "others") {
            items[i].classList.add('gray');
        }
    
    }

})





// this function is fired when click on check button and text become line-through and checked the button 
function checkedOrNot() {
    // this query selector is used to select all check box in all task. (here .chk-box is class in all check box)
    let allchekbtn = document.querySelectorAll('.chk-box');

    // this query selector is used to store all task description  i.e all task to be do
    //(here .task-hed is a class used in all description of task)
    let all_description = document.querySelectorAll('.task-hed');

    // this query selector is used to store all date used in each task 
    //here .date-des is used at all date span 
    let alldate = document.querySelectorAll('.date-des');

    //  this is a loop for doing text line-through(cross the text) and correspounding to checked checkbox and
    // text decoration none for  unchecked checkbox 
    for (var i = 0; i < all_description.length; i++) {

        // create a empty array to store sufficent information to send the server side so
        // that correspounding to checked flag shoud be true and unchecked flag should be flase
        let arr;
        if (allchekbtn[i].checked == true) {

            // it return the id of checked checkbox
            let v_id = allchekbtn[i].getAttribute('taskid');

            // in case of checked checkbox flag should be true so use here fg as true 
            let fg = 'true';
            // both v_id and fg combined and store in array  decelear above 
            arr = [v_id, fg];

            //  use to style the task text to line through corresponding to checked checkbox
            all_description[i].style.textDecoration = 'line-through';

            // use to style task date to line through 
            alldate[i].style.textDecoration = 'line-through';


            // else if condition is use for unchecked task 
        } else if (allchekbtn[i].checked == false) {

            let v_id = allchekbtn[i].getAttribute('taskid');

            // flase is use to corresponding to unchecked box 
            let fg = 'false';
            arr = [v_id, fg];

            all_description[i].style.textDecoration = 'none';
            alldate[i].style.textDecoration = 'none';

        }


        // ajax is used to send the query to server to update the value of flag  true for checked and  false for unchecked 
        $.ajax({
            url: '/updating-check/?id=' + arr,
            method: 'post',
            success: function () {
        
            },
            Error: function () {
                console.log("somthing went wrong in updation cheked btn");
            }

        })

    }

    // return back to previous location
    window.location = '/';
}






// this is use to delete a todolist form task list 
var delete_btn = document.getElementById('dele');
delete_btn.addEventListener('click', function () {

    console.log("delete button working ");
    // select all checked box in todo list it return an array of checked input tag
    let all_cheked = document.querySelectorAll('.chk-box:checked');


    // this empty  array is decelear to store id of all checked checkbox 
    let array_of_deleted_items_id = [];

    // extracting id of all checked items and try to store in above empty arry 
    for (var i of all_cheked) {
        let v_id = "";
        v_id = i.getAttribute('taskid');
        array_of_deleted_items_id.push(v_id);
    }

    // checking either any task  checked or not ,if not any task checked so task is empty so alert the user to select one  
    if (array_of_deleted_items_id.length === 0) {
        alert("please select a task for delete");
        return;
    }

    // by using ajax try to delete the selected items 
    $.ajax({
        url: '/delete-task/?id=' + array_of_deleted_items_id,
        method: 'post',
        success: function () { 
            alert("updated successfully");
        },
       Error:function(){
        console.error("somthing went wrong in deleting");
       }
    })
    // return previous page
    window.location='/'
})