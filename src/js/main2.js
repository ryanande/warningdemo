'use strict';

$(function() {
    $(".datepicker").datepicker({
        format: 'mm/dd/yyyy'
    });

    $('button').on('click', function() {
        click($(this).data('nav'));
    });
});

var errorMessages = [];
var validationRules = [
    { id: "#producedQuantity", message: "Produced Quantity cannot be empty.", isEx: true },
    { id: "#batchNumber", message: "Batch Number cannot be empty.", isEx: true },
    { id: "#startDate", message: "Start Date has been left empty.", isEx: false }
];


function click(navValue) {

    var formDiv = "#formDiv",
        successDiv = "#successDiv",
        errorDiv = "#errorDiv",
        warningDiv = "#warningDiv",
        warningCommentDiv = "#warningCommentDiv";

    var hiddenClass = "hidden";

    switch(navValue){
        case 0 :

            $(formDiv).removeClass(hiddenClass);
            $(warningCommentDiv).addClass(hiddenClass);

            break;
        case 1 :
            if(!isValid())
            {
                // if there are errors
                if(getErrorCount(true) > 0)
                {
                    if(bindMessages(true, "errorList")){
                        $(errorDiv).removeClass(hiddenClass);
                    }
                    else{
                        $(warningDiv).removeClass(hiddenClass);
                    }

                    if(bindMessages(false, "warningList")){
                        $(warningDiv).removeClass(hiddenClass);
                    }
                    else{
                        $(warningDiv).addClass(hiddenClass);
                    }
                }
                else
                {
                    if(getErrorCount(false) > 0) {
                        bindMessages(false, "warningCommentList");
                    }

                    //we can go to the warningDiv
                    $(errorDiv  + ", " + warningDiv + ", " + formDiv).addClass(hiddenClass);
                    $(warningCommentDiv).removeClass(hiddenClass);
                }

                higlightFields();
            }
            else{
                $(errorDiv  + ", " + warningDiv + ", " + formDiv).addClass(hiddenClass);
                $(successDiv).removeClass(hiddenClass);
            }
            break;
        case 2 :

            $(errorDiv  + ", " + warningDiv + ", " + formDiv + ", " + warningCommentDiv).addClass(hiddenClass);
            $(successDiv).removeClass(hiddenClass);

            break;
    }
}


function isValid()
{
    errorMessages.length = 0;
    for (var i = 0; i < validationRules.length; i++)
    {
        if(!$(validationRules[i].id).val())
        {
            errorMessages.push(validationRules[i]);
        }
        else
        {
            var index = errorMessages.indexOf(validationRules[i]);
            if (index !== -1) {
                errorMessages.splice(index, 1);
            }
        }
    }
    return errorMessages.length <= 0;
}


function bindMessages(isExceptions, listId) {

    var ul = document.getElementById(listId);
    var messages = errorMessages.filter(function(err){ return err.isEx === isExceptions });

    ul.innerHTML = '';

    for(var i = 0; i < messages.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(messages[i].message));
        ul.appendChild(li);
    }

    return messages.length > 0;
}


function higlightFields() {
    var errStyle = [ "has-error", "has-warning" ];
    var formGroup = ".form-group";

    errStyle.forEach(function(err){ $(formGroup).removeClass(err); });

    for(var i = 0; i < errorMessages.length; i++) {
        $(errorMessages[i].id)
            .parent(formGroup)
            .addClass(errorMessages[i].isEx ? errStyle[0] : errStyle[1]);
    }
}


function getErrorCount(isException) {
    return errorMessages.filter(function(err){ return err.isEx === isException }).length;
}
