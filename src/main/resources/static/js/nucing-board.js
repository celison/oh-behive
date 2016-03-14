/**
 * Created by Connor
 * 3/12/2016.
 */

var url = "/nucing/";
var createNucYard = "createNucYard";
var nucReportUrl = 'nucReport/';


function init() {

    //$('#createButton').click(function () {
    //
    //    var event = {
    //        count: $('#count').val(),
    //        start: $('#date').val()
    //    };
    //
    //    $.ajax({
    //        url: "/nucing/test",
    //        type: "POST",
    //        dataType: 'json',
    //        data: event,
    //        beforeSend: function () {
    //            var token = $("meta[name='_csrf']").attr("content");
    //            var header = $("meta[name='_csrf_header']").attr("content");
    //            $(document).ajaxSend(function (e, xhr, options) {
    //                xhr.setRequestHeader(header, token);
    //            });
    //        },
    //        complete: function () {
    //            alert(eventJSON);
    //        },
    //        error: function (xhr, desc, err) {
    //            alert("error " + err + " " + desc + " " + xhr.responseText);
    //        }
    //    });
    //    $('#calendar').fullCalendar('refetchEvents');
    //    $('#count').val("");
    //});
    //
    //$('#date').val(getTodaysDate());

    $('#calendar').fullCalendar({
        events: '/nucing/events',
        color: 'yellow',
        droppable: true
    });
}

function getEmptyFormBody() {
    var formBody = $('#form-body');
    formBody.empty();
    return formBody;
}

function getStatusSelector(data) {
    var select = $('<select>')
        .attr('class', 'form-control');
    $.each(data, function (i, e) {
        select.append(
            $('<option>')
                .text(e)
        )
    });
    return select;
}

function getPersonSelector(data) {
    var select = $('<select>')
        .attr('class', 'form-control');
    $.each(data, function (i, e) {
        select.append(
            $('<option>')
                .text(e.name)
        )
    });
    return select;
}

function getRegionSelector(data) {
    var select = $('<select>')
        .attr('class', 'form-control');
    $.each(data, function (i, e) {
        select.append(
            $('<option>')
                .text(e)
        )
    });
    return select;
}


function loadCreateNucYardModal() {
    var createNucYardUrl = url + createNucYard;
    $.getJSON(createNucYardUrl, function (data) {
        createNucYardForm(data);
    });
}

function createNucYardForm(data) {
    $('#form-modal-title').text("Create Yard");
    var body = getEmptyFormBody();
    var stati = getStatusSelector(data.stati);
    var owners = getPersonSelector(data.people);
    var rentees = getPersonSelector(data.people);
    var regions = getRegionSelector(data.regions);
    body.append(
        $('<ul>')
            .attr('class', 'nav nav-tabs')
            .attr('id', 'tabContent')
            .append(
            $('<li>')
                .attr('class', 'active')
                .append(
                $('<a>')
                    .attr('href', '#details')
                    .attr('data-toggle', 'tab')
                    .text('Details')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('id', "locationTab")
                    .attr('href', '#location')
                    .attr('data-toggle', 'tab')
                    .text('Location')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#access')
                    .attr('data-toggle', 'tab')
                    .text('Access')
            )
        ),
        $('<div>')
            .attr('class', 'tab-content')
            .append(
            $('<div>')
                .attr('class', 'pane tab-pane active')
                .attr('id', 'details')
                .append(
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'name')
                        .text("Name"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'name')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'maxHives')
                        .text("Max Hives"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'maxHives')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'status')
                        .text("Status"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        stati
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'owner')
                        .text("Owner"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        owners
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'rentReceiver')
                        .text("Rent Receiver"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        rentees
                    )
                )
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'location')
                .append(
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'street')
                        .text("Street"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'street')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'suite')
                        .text("Suite"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'suite')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'city')
                        .text("City"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'city')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'state')
                        .text("State"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'state')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'zip')
                        .text("Zip"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'zip')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'region')
                        .text("Region"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        regions
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'longitudeModal')
                        .text("Longitude"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'longitudeModal')
                            .attr('type', 'text')
                    )
                ),

                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'latitudeModal')
                        .text("Latitude"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'latitudeModal')
                            .attr('type', 'text')
                    )
                ),

                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<div>')
                        .attr('class', 'col-sm-1'),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .attr('id', 'map-div-modal')
                        .attr('style', 'height:300px'),
                    $('<div>')
                        .attr('class', 'col-sm-1')
                )
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'access')
                .append(
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'combo')
                        .text("Combination or Key"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'combo')
                            .attr('type', 'text')
                    )
                ),
                $('<div>')
                    .attr('class', 'form-group')
                    .append(
                    $('<label>')
                        .attr('class', 'col-sm-2 control-label')
                        .attr('for', 'accessNotes')
                        .text("Access Notes"),
                    $('<div>')
                        .attr('class', 'col-sm-10')
                        .append(
                        $('<input>')
                            .attr('class', 'form-control')
                            .attr('id', 'accessNotes')
                            .attr('type', 'text')
                    )
                )
            )
        ),
        $('<div>')
            .attr('class', 'form-group')
            .append(
            $('<div>')
                .attr('class', 'col-sm-4 control-label')
                .append(
                $('<button>')
                    .attr('class', 'btn btn-primary')
                    .attr('type', 'submit')
                    .text('Create')
            )
        )
    );
    getLocation();
    $('#tabContent').on('shown.bs.tab', function (e) {
        if (e.target.id == "locationTab") {
            google.maps.event.trigger(map, 'resize');
        }
    });
}

function loadNucReportModal(id) {
    var loadUrl = url + nucReportUrl + id;
    $.getJSON(loadUrl, function (data) {
        createNucReportForm(data);
    });
}

function createNucReportForm(data) {
    $('#form-modal-title').text("Nucing Report");
    var body = getEmptyFormBody();
    body.append(
        $('<ul>')
            .attr('class', 'nav nav-tabs')
            .attr('id', 'tabContent')
            .append(
            $('<li>')
                .attr('class', 'active')
                .append(
                $('<a>')
                    .attr('href', '#laidout')
                    .attr('data-toggle', 'tab')
                    .text('Laid Out')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#placed')
                    .attr('data-toggle', 'tab')
                    .text('Bees Placed')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#supered')
                    .attr('data-toggle', 'tab')
                    .text('Bees Supered')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#split')
                    .attr('data-toggle', 'tab')
                    .text('Bees Split')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#queensplaced')
                    .attr('data-toggle', 'tab')
                    .text('Place Queens')
            ),
            $('<li>')
                .append(
                $('<a>')
                    .attr('href', '#queenschecked')
                    .attr('data-toggle', 'tab')
                    .text('Check Queens')
            )
        ),
        $('<div>')
            .attr('class', 'tab-content')
            .append(
            $('<div>')
                .attr('class', 'pane tab-pane active')
                .attr('id', 'laidout')
                .append(
                    getFormGroup('','Lay out notes','text')
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'placed')
                .append(
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'supered')
                .append(
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'split')
                .append(
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'queensplaced')
                .append(
            ),
            $('<div>')
                .attr('class', 'pane tab-pane')
                .attr('id', 'queenschecked')
                .append(
            )
        ),
        $('<div>')
            .attr('class', 'form-group')
            .append(
            $('<div>')
                .attr('class', 'col-sm-4 control-label')
                .append(
                $('<button>')
                    .attr('class', 'btn btn-primary')
                    .attr('type', 'submit')
                    .text('Create')
            )
        )
    );
}

function getFormGroup(for_id, label, type) {
    return getGroupDiv()
        .append(
        getFormGroupLabel(for_id, label),
        getFormGroupInput(for_id, type)
    );
}

function getGroupDiv() {
    return $('<div>')
        .attr('class', 'form-group');
}

function getFormGroupLabel(for_id, label) {
    return $('<label>')
        .attr('class', 'col-sm-2 control-label')
        .attr('for', for_id)
        .text(label);
}

function getFormGroupInput(for_id, type) {
    return $('<div>')
        .attr('class', 'col-sm-10')
        .append(
        $('<input>')
            .attr('class', 'form-control')
            .attr('id', for_id)
            .attr('type', type)
    )
        ;
}

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setVals, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    markerImage = {
        url: 'http://i.imgur.com/ALU8OuA.png',
        size: new google.maps.Size(45, 45),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(23, 45)
    };
}
function setVals(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    document.getElementById("latitudeModal").value = lat;
    document.getElementById("longitudeModal").value = lng;
    coords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 15,
        center: coords,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(
        document.getElementById("map-div-modal"), mapOptions
    );
    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });

    marker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: markerImage,
        title: "Current Location"
    });
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}
function placeMarker(location) {
    lat = location.lat();
    lng = location.lng();
    setMarkerPosition(marker, lat, lng);
    document.getElementById("latitudeModal").value = location.lat();
    document.getElementById("longitudeModal").value = location.lng();
}
function getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var format = yyyy + '-' + addZero(mm + 1) + '-' + addZero(dd);

    return format;
}

function addZero(s) {
    s = s + '';
    if (s.length === 1) s = '0' + s;
    return s;
}

function getCSRFTokenValue() {
    return $('#csrf-token').val();
}