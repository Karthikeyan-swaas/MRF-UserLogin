function signing() {
    debugger;
    var Email = $('#Email').val();
    var password = $('#Password').val();



    $.ajax({
        url: "/MRFLogin/CheckingloginDetails",
        data: { Email: Email, password: password },
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            if (result == 1) {
                //alert("hello")
                debugger;
                window.location = "/MRFLogin/MRFIndex?Email=" + Email;

            }
            else {
                alert("Login failed");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}








$(document).ready(function () {
    loadData();
});




function Add() {



    var mrfObj = {
        Userid: $('#MRFcreatedby').val(),
        PositionName: $('#PositionName').val(),
        MRFCreatedDate: $('#MRFCreatedDate').val(),
        MRFCreatedBy: $('#MRFcreatedby').val(),
        Positiontobefilledbefore: $('#Beforedate').val(),
        VacancyFor: $('input[name="Vacancyfor"]:checked').val(),
        VacancyType: $('input[name="Vacancytype"]:checked').val(),
        Territory_HQ: $('#Territory_HQ').val(),
        DivisionName: $('#DivisionName').val(),
        Minyrs: $('#Minyr').val(),
        Maxyrs: $('#Maxyr').val(),
        Maxctc: $('#Max').val(),
        minctc: $('#Min').val(),
        AdditionalRequirement: $('#AdditionalRequirement').val()
    };






    $.ajax({
        url: "/MRFLogin/Add",
        data: JSON.stringify(mrfObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("Submited");

        },

        error: function (erormessage) {
            alert(errormessage.responseText);
        }
    });
}

function loadData() {
    $.ajax({
        url: "/MRFLogin/MrfList",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            //$(function () {
            //    $('#grid').ejGrid({
            //        dataSource: result,
            //        allowPaging: true,
            //        pageSettings: { pageSize: 4 },   

            //    });
            //});


            //this.default = function (result) {
            //    var data = new ej.data.datamanager(window.orderdata).executelocal(new ej.data.query().take(15));
            //    var grid = new ej.grids.grid({
            //        datasource: data,
            //        columns: [
            //            { field: 'id', headertext: 'id', width: 120, textalign: 'right' },
            //            { field: 'PositionName', headertext: 'PositionName', width: 150 },
            //            { field: 'MRFCreatedDate', headertext: 'MRFCreatedDate', width: 130, format: 'ymd', textalign: 'right' },
            //            { field: 'CreatedBy', width: 120, format: 'c2', headertext: 'MRFcreatedby', textalign: 'right' },
            //            { field: 'Positiontobefilledbefore', headertext: 'Beforedate', width: 140, format: 'ymd', textalign: 'right' },
            //            { field: 'DivisionName', headertext: 'DivisionName', width: 150 }
            //        ]
            //    });
            //    grid.appendto('#grid');
            //};


            var html = '';
            $.each(result, function (key, item) {



                var date = item.MRFCreatedDate;
                var nowdate = new Date(parseInt(date.substr(6)));

                var beforedate = item.Positiontobefilledbefore;
                var filledbefore = new Date(parseInt(beforedate.substr(6)));

                html += '<tr>';
                if (item.Reqstatus == 1 && item.Userid != $("#MRFcreatedby").val() ) {
                    html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">edit</a> | <a href="#" onclick="delele(' + item.id + ')">delete</a></td>';
                    html += '<td><a href="#" onclick="return UpdateReq(' + item.id + ',2)">approve</a> | <a href="#" onclick="UpdateReq(' + item.id + ',3)">reject</a></td>';
                }
                else {
                    html += '<td colspan="2">' + item.status + '</td>';
                }``

                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.PositionName + '</td>';
                html += '<td>' + item.Userid + '</td>';
                html += '<td>' + nowdate.todatestring + '</td>';
                
                html += '<td>' + filledbefore.todatestring + '</td>';
                html += '<td>' + item.Vacancy + '</td>';
                html += '<td>' + item.MrfVacancyType + '</td>';
                html += '<td>' + item.Territory_HQ + '</td>';

                html += '<td>' + item.DivisionName + '</td>';
                html += '<td>' + item.Minyrs + '</td>';
                html += '<td>' + item.Maxyrs + '</td>';
                html += '<td>' + item.Maxctc + '</td>';
                html += '<td>' + item.Minctc + '</td>';
                html += '<td>' + item.AdditionalRequirement + '</td>';


                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}



function getbyID(id) {
    $('#id').css('border-color', 'lightgrey');
    $('#PositionName').css('border-color', 'lightgrey');
    $('#MRFCreatedDate').css('border-color', 'lightgrey');
    $('#MRFcreatedby').css('border-color', 'lightgrey');
    $('#Beforedate').css('border-color', 'lightgrey');
    $('#Vacancyfor').css('border-color', 'lightgrey');
    $('#VacancyType').css('border-color', 'lightgrey');
    $('#Territory_HQ').css('border-color', 'lightgrey');
    $('#DivisionName').css('border-color', 'lightgrey');
    $('#Minyrs').css('border-color', 'lightgrey');
    $('#Maxyrs').css('border-color', 'lightgrey');
    $('#Max').css('border-color', 'lightgrey');
    $('#Min').css('border-color', 'lightgrey');
    $('#AdditionalRequirement').css('border-color', 'lightgrey');

    $.ajax({
        url: "/MRFLogin/getbyID/" + id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#PositionName').val(result.PositionName);
            $('#MRFCreatedDate').val(result.MRFCreatedDate);
            $('#MRFcreatedby').val(result.CreatedBy);
            $('#Beforedate').val(result.Positiontobefilledbefore)
            $('#Vacancyfor').val(result.Vacancy);
            $('#VacancyType').val(result.MrfVacancyType);
            $('#Territory_HQ').val(result.Territory_HQ);
            $('#DivisionName').val(result.DivisionName);
            $('#Minyr').val(result.Minyrs)
            $('#Maxyr').val(result.Maxyrs);
            $('#Max').val(result.Maxctc);
            $('#Min').val(result.Minctc);
            $('#AdditionalRequirement').val(result.AdditionalRequirement);




            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


function UpdateReq(ID, Reqstatus) {
    var ans = true;
    if (Reqstatus == 3) {
        ans = confirm("Are you sure you want to Reject this Record?");
    }
    if (ans) {
        $.ajax({
            url: "/MRFLogin/UpdateRequest/",
            data: { ID: ID, Reqstatus: Reqstatus },
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//function  {
//    $('#id').val("");
//    $('#PositionName').val("");
//    $('#MRFCreatedDate').val("");
//    $('#MRFcreatedby').val("");
//    $('#Beforedate').val("");
//    $('#Vacancyfor').val("");
//    $('#VacancyType').val("");
//    $('#Territory_HQ').val("");
//    $('#DivisionName').val("");
//    $('#Minyr').val("");
//    $('#Maxyr').val("");
//    $('#Max').val("");
//    $('#Min').val("");
//    $('#AdditionalRequirement').val("");



//    $('#btnAdd').show();


//}

//this.default = function () {
//    var data = new ej.data.datamanager(window.orderdata).executelocal(new ej.data.query().take(15));
//    var grid = new ej.grids.grid({
//        datasource: data,
//        columns: [
//            { field: 'order id', headertext: 'order id', width: 120, textalign: 'right' },
//            { field: 'customername', headertext: 'customer name', width: 150 },
//            { field: 'orderdate', headertext: 'order date', width: 130, format: 'ymd', textalign: 'right' },
//            { field: 'freight', width: 120, format: 'c2', textalign: 'right' },
//            { field: 'shippeddate', headertext: 'shipped date', width: 140, format: 'ymd', textalign: 'right' },
//            { field: 'shipcountry', headertext: 'ship country', width: 150 }
//        ]
//    });
//    grid.appendto('#grid');
//};


