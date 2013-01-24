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
        editLink.addEventListener("click", editToDo);
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

    function editToDo() {
        //Get Data from localStorage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        //Show form
        toggleControls("off");

        //Populate Form with current record from localStorage
        //$('groups').value = item.group[1];
        $('firstname').value = item.firstName[1];
        $('lastname').value = item.lastName[1];
        $('toDoName').value = item.toDoName[1];
        $('dtDue').value = item.dtDue[1];
        $('assignedTo').value = item.assignedTo[1];
        $('rngPriority').value = item.priority[1];
        $('txtContent').value = item.content[1];
        if (item.sendEmail[1] == true) {
            $('chkEmailAssignee').setAttribute("checked", "checked");
        }

        //Remove the initial listener from the input 'save contact' button.

        save.removeEventListener("click", storeToDo);
        //Change Submit Button Value to Edit Button
        $('btnSubmit').value = "Edit To-Do";
        var editSubmit = $('btnSubmit');
        //Save the key value established in this function as a property of the editSubmit event
        //so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
        
    }

    function validate(a) {
        //vars
        var getFirstName = $('firstname');
        var getLastName = $('lastname');
        var getToDoName = $('toDoName');
        var getAssignedTo = $('assignedTo');

        //Kill Old Errors
        errorList.innerHTML = "";
        getFirstName.style.border = "0px solid red";
        getLastName.style.border = "0px solid red";
        getAssignedTo.style.border = "0px solid red";
        getToDoName.style.border = "0px solid red";
        
        //Error Messages
        var messageArray = [];

        //FirstName Validation
        if (getFirstName.value == "") {
            var firstNameError = "First Name cannot be blank";
            getFirstName.style.border = "1px solid red";
            messageArray.push(firstNameError);
        }

        if (getLastName.value == "") {
            var lastNameError = "Last Name cannot be blank";
            getLastName.style.border = "1px solid red";
            messageArray.push(lastNameError);
        }

        //Assigned To Validation
        if (getAssignedTo.value == "--Choose Staff Member--") {
            var assignedToError = "You must assigned this to-do to someone.";
            getAssignedTo.style.border = "1px solid red";
            messageArray.push(assignedToError);
        }

        if (getToDoName.value == "") {
            var toDoNameError = "To-do Name cannot be blank";
            getToDoName.style.border = "1px solid red";
            messageArray.push(toDoNameError);
        }
        
        //Dispay Errors, if any
        if (messageArray.length >= 1) {
            for (var i = 0, j = messageArray.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageArray[i];
                errorList.appendChild(txt);
            }
        }
        a.preventDefault();
        return false;
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
    errorList = $('errorList');

    //Set Link & Submit Click Events
    var displayLink = $('linkDisplayData');
    displayLink.addEventListener("click", getToDos);
    var clearLink = $('linkClearData');
    clearLink.addEventListener("click", clearLocal);
    var save = $('btnSubmit');
    save.addEventListener("click", validate);

     

});