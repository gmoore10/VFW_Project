// Project 2
// Visual Frameworks

//Wait until the DOM is read.
window.addEventListener("DOMContentLoaded", function () {


    //getElementById Function
    function $(x) {
        var element = document.getElementById(x);
        return element;
    }

    //Create select field element and populate with options
    function createAssigneeList() {
        var formTag = document.getElementsByTagName("form");
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

    function storeData() {
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

    //Variable defaults
    var toDoAssignees = ["--Choose Staff Member--", "Jim", "Kim"];
    createAssigneeList();

    //Set Link & Submit Click Events
    //var displayLink = $('linkDisplayData');
    //displayLink.addEventListener("click", getData);
    //var clearLink = $('linkClearData');
    //clearLink.addEventListener("click", clearLocal);
    var save = $('btnSubmit');
    save.addEventListener("click", storeData);

     

});