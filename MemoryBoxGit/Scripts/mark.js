// alert modal function
function ShowAlertsModal(text) {
    $('#AlertModal').modal('show');
    $('#AlertModalBody').html(text);
}
// success modal function
function ShowSuccessModal(text) {
    $('#SuccessModal').modal('show');
    $('#SuccessModalBody').html(text);
}

var isEntryNew = 0;

function makeCKF_ThemeChoice(swatch) {
    //ShowSuccessModal("Theme applied - click OK to view");
    jQuery.support.cors = true;
    $.ajax({
        crossDomain: true,
        type: 'GET',
        //contentType: 'application/text',
        //dataType: 'json',
        cache: false,
        url: '/Home/SaveTheme',
        data: { themein: swatch },
        success: function (response) {
            if (!response) {
                // do nothing if null response
            }
            else {
                window.location.assign("../Home/ChildStart");
                // console.log('window.location.assign("../Home/ChildStart");')
                //return false;
            }
        },
        error: function (response) {
            alert("error " + response);
            console.log(response);
        }
    });
}

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'DD / MM / YYYY'

    });
});


//##################################FullCalendar Code##################################################################
$('#calendar').fullCalendar({
    // put your options and callbacks here
    theme: true,
    themeButtonIcons: false,

    allDay: true,
    header: {
        center: 'title',
        left: 'basicDay, basicWeek, month',
        right: 'today prev,next'
    },
    displayEventTime: false,
    //dayClick: function () {
    //    alert('a day has been clicked!');
    //},
    dayClick: function (date, allDay, jsEvent, view) {
        isEntryNew = 0;
        clearModalText();
        killCKeditor();
        var diaryDate = moment(date).toDate();
        $('#CreateDiaryModalLabel').html(' Create new Diary Entry for: ' + moment(diaryDate).format('ddd MMM DD YYYY'));
        $('#CreateDiaryModal').modal();
        $('#CreateDiaryModalLabel').text(event.title);
        $('#txtEntryTitle').text(event.title);
        $('#editor1').html(event.DiaryText);
        $('#txtFeeling').val(event.DiaryFeeling);
        $('#txtEntryDate').val(moment(diaryDate).format('DD-MM-YYYY'));

        //CKEDITOR.inline('editor1');
        var editor = CKEDITOR.inline('editor1');
        // **** LINK TO CKFINDER  ****
        CKFinder.setupCKEditor(editor, {
            rememberLastFolder: false,
        });
        //  var ckdata = CKEDITOR.instances.editor1.getData();

    },

    events: '/Home/GetDiaryEntries',


    eventClick: function (event, jsEvent, view) {
        clearModalText();
        killCKeditor();
        var diaryDate = moment(event.start).toDate('MM-DD-YYYY');
        isEntryNew = event.id;
        $('#CreateDiaryModalLabel').text(event.title);
        $('#txtEntryTitle').val(event.title);
        $('#editor1').html(event.DiaryText);
        $('#txtFeeling').val(event.DiaryFeeling);
        setFeelingCalendar(event.DiaryFeeling);
        // DATES arent used for an edit in the controller - just passed as its in the model
        $('#txtEntryDate').val(moment(diaryDate).format('DD-MM-YYYY'));
        //alert(event.DiaryText);
        //CKEDITOR.instances.editor1.insertHtml('+ event.DiaryText + ');
        // alert(document.getElementById('txtEntryText').value);
        var editor = CKEDITOR.inline('editor1');
        //var editor = CKEDITOR.replace('editor1');

        //CKFinder.setupCKEditor(editor);
        // **** LINK TO CKFINDER  ****
        CKFinder.setupCKEditor(editor, {
            rememberLastFolder: false,
        });
       CKEDITOR.instances.editor1.setData(event.DiaryText);
        //var ckdata = CKEDITOR.instances.editor1.getData();
        //alert(ckdata);
        $('#CreateDiaryModal').modal();
    },
});

//Save event of the modal click.....
$("#btnCreateCalendar").click(function () {
    var title = $('#txtEntryTitle').val();
    //var comment = $('#editor1').val();
    var comment = CKEDITOR.instances.editor1.getData();
    var feeling = $('#txtFeeling').val();
    //var savedate = moment(diaryDate).format('DD-MM-YYYY')
    var savedate = $('#txtEntryDate').val();
    console.log("2" + savedate + savedate + title + comment + feeling + isEntryNew);
    //var ckdata = CKEDITOR.instances.editor1.getData();
    //alert(comment);
    saveDiaryEntry(savedate, savedate, title, comment, feeling, isEntryNew);
    killCKeditor();
});

$("#closebtn").click(function () {
    killCKeditor();
});

function killCKeditor() {
    if (CKEDITOR.instances.editor1) {
        CKEDITOR.instances.editor1.destroy();
    }

}
function clearModalText() {
    $('#txtEntryTitle').val("");
    $('#editor1').html("");
    $('#txtFeeling').val("");
    setFeelingCalendar("wipe");
}
function saveDiaryEntry(start, end, title, comment, feeling, isEntryNew) {
    console.log(start + end + title + comment + feeling + "isentry -" + isEntryNew);
    //alert("saveDiaryEntry function");
    //JSON.stringify(comment);
    //var saveData = JSON.stringify({ start: start, end: end, title: title, comment: comment, feeling: feeling, id: isEntryNew });
    var saveData = {
        "id": isEntryNew,
        "ChildID ": "",
        "title": title,
        "start": start,
        "DiaryText": comment,
        "CreatedBy": "",
        "UpdatedDate": "2016-12-15",
        "UpdatedBy": "",
        "DiaryFeeling": feeling,
        "end": end
    };
    var model = JSON.stringify(saveData);
    jQuery.support.cors = true;
    $.ajax({
        crossDomain: true,
        type: 'POST',
        //contentType: 'application/text',
        contentType: 'application/json',
        //dataType: 'json',
        cache: false,
        url: '/Home/CreateDiaryEntry',
        data: model,
        success: function (response) {
            if (!response) {
                // do nothing if null response
                alert("Entry did not save correctly");
            }
            else {
                $('#calendar').fullCalendar('refetchEvents');
                $('#CreateDiaryModal').modal('hide');
            }
        },
        error: function (response) {
            alert("error " + response);
            console.log(response);
        }
    });
}


$(document).on("click", "#Happy", function (event) {
    feeling = 'Happy';
    setFeelingCalendar(feeling);
});
$(document).on("click", "#Unhappy", function (event) {
    feeling = 'Unhappy';
    setFeelingCalendar(feeling);
}); $(document).on("click", "#Love", function (event) {
    feeling = 'Love';
    setFeelingCalendar(feeling);
}); $(document).on("click", "#Angry", function (event) {
    feeling = 'Angry';
    setFeelingCalendar(feeling);
});

function setFeelingCalendar(feeling) {
    $("#Happy").removeClass("chosenfeeling");
    $("#Unhappy").removeClass("chosenfeeling");
    $("#Love").removeClass("chosenfeeling");
    $("#Angry").removeClass("chosenfeeling");
    $('#txtFeeling').val(feeling);
    if (feeling === 'Happy') {
        $("#Happy").addClass("chosenfeeling");
    }
    else if (feeling === 'Unhappy') {
        $("#Unhappy").addClass("chosenfeeling");
    }
    else if (feeling === 'Love') {
        $("#Love").addClass("chosenfeeling");
    }
    else if (feeling === 'Angry') {
        $("#Angry").addClass("chosenfeeling");
    }
}

//##################################End FullCalendar Code##############################################################

//################ FIX FOR CKEDITOR dropdowns in bootstrap modal not working  ###############
$.fn.modal.Constructor.prototype.enforceFocus = function () {
    modal_this = this
    $(document).on('focusin.modal', function (e) {
        // Fix for CKEditor + Bootstrap IE issue with dropdowns on the toolbar
        // Adding additional condition '$(e.target.parentNode).hasClass('cke_contents cke_reset')' to
        // avoid setting focus back on the modal window.
        if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
            && $(e.target.parentNode).hasClass('cke_contents cke_reset')) {
            modal_this.$element.focus()
        }
    })
};
//################ FIX FOR CKEDITOR dropdowns in bootstrap modal not working  ###############