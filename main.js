// Project 3
// Visual Frameworks
// VFW 0113
// By: Garrett Moore

//Wait until the DOM is read.
window.addEventListener("DOMContentLoaded", function () {


    //getElementById Function
    function $(x) {
        var element = document.getElementById(x);
        return element;
    }

    //Create select field element and populate with options
    function createAssigneeList() {
        var selectListItem = $('select');

        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "assignedTo");
        for (var i = 0, j = toDoAssignees.length; i < j; i++) {
            var makeOption = document.createElement("option");
            var optText = toDoAssignees[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectListItem.appendChild(makeSelect);
    }

    function getCheckboxValue() {
        if ($('chkEmailAssignee').checked) {
            chkEmailValue = true;
        }
        else {
            chkEmailValue = false;
        }
    }

    //Function to adjust links that are visible based on which page we are viewing
    function toggleControls(n) {
        switch (n) {
            case "on":
                $('toDoForm').style.display = "none";
                $('linkClearData').style.display = "inline";
                $('linkDisplayData').style.display = "none";
                $('linkAddNew').style.display = "inline";
                break;

            case "off":
                $('toDoForm').style.display = "block";
                $('linkClearData').style.display = "inline";
                $('linkDisplayData').style.display = "inline";
                $('linkAddNew').style.display = "none";
                $('items').style.display = "none";
                break;

            default:
                return false;
        }
    }

    function storeToDo() {
        var id = Math.floor(Math.random() * 100000001);

        //gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input value.
        
        getCheckboxValue();

        var item = {};
        item.firstName = ["First Name", $('firstname').value];
        item.lastName = ["Last Name", $('lastname').value];
        item.toDoName = ["To-Do Name", $('toDoName').value];
        item.dtDue = ["Due Date", $('dtDue').value];
        item.assignedTo = ["Assigned To", $('assignedTo').value];
        item.priority = ["Priority", $('rngPriority').value];
        item.sendEmail = ["Send Email to Task Receiver?", chkEmailValue];
        item.content = ["Content", $('txtContent').value];

        //Save data into Local Storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("To-Do Saved!");
    }

    function getToDos() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data in local storage.");
        }
        //Write data from Local Storage to the browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        makeDiv.setAttribute("class", "divSection");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";

        //Get number of local storage items and add list items to ul for each local storage item
        for (var i = 0, j = localStorage.length; i < j; i++) {
            var makeLi = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);

            //Convert string from localStorage to object
            var todo = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);

            for (var n in todo) {
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var todoSubText = todo[n][0] + " " + todo[n][1];
                makeSubLi.innerHTML = todoSubText;
                makeSubList.appendChild(linksLi);
            }
            makeToDoLinks(localStorage.key(i), linksLi); //Edit and Delete Links will be created
        }
    }

    //Make Item Links
    //TODO: Change Name of vars
    //Create the edit and delete links for each stored item when displayed.
    function makeToDoLinks(key, linksLi) {
        //Add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit To-Do";
        //editLink.addEventListener("click", editToDo);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        //Add <br />
        var br = document.createElement('br');
        linksLi.appendChild(br);

        //Delete Link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete To-Do";
        //deleteLink.addEventListener("click", deleteToDo);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function clearLocal() {
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        } else {
            localStorage.clear();
            alert("All to-do's are deleted!");
            window.location.reload();
            return false;
        }
    }

    //Set up list of people that we will be assigning to-do's to.
    var toDoAssignees = ["--Choose Staff Member--", "Jim", "Kim"];
    createAssigneeList();

    //Set Link & Submit Click Events
    var displayLink = $('linkDisplayData');
    displayLink.addEventListener("click", getToDos);
    var clearLink = $('linkClearData');
    clearLink.addEventListener("click", clearLocal);
    var save = $('btnSubmit');
    save.addEventListener("click", storeToDo);

     

});