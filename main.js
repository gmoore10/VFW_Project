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

    //Variable defaults
    var toDoAssignees = ["--Choose Staff Member--", "Jim", "Kim"];
    createAssigneeList();

    //Set Link & Submit Click Events
    //var displayLink = $('linkDisplayData');
    //displayLink.addEventListener("click", getData);
    //var clearLink = $('linkClearData');
    //clearLink.addEventListener("click", clearLocal);
    //var save = $('btnSubmit');
    //save.addEventListener("click", storeData);

     

});