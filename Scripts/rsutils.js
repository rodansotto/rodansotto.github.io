/* File Created: July 25, 2015 */

if (typeof jQuery === 'undefined') {
    throw new Error('RSUtils\' JavaScript requires jQuery')
}

if (typeof $().modal != 'function') {
    throw new Error('RSUtils\' JavaScript requires Bootstrap')
}

var $rs_showConfirmDialogBox = function (msg, callback) {
    var html =
        "<div id='rsModalConfirm' class='modal fade'>" +
            "<div class='modal-dialog modal-sm'>" +
                "<div class='modal-content'>" +
                    "<div class='modal-body'>" +
                        "<p>" + msg + "</p>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                        "<button id='rsModalConfirmButtonYes' type='button' class='btn btn-default'>Yes</button>&nbsp;" +
                        "<button type='button' class='btn btn-primary' data-dismiss='modal'>No</button>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";

    $("body").append(html);

    $("#rsModalConfirmButtonYes").on("click", function () {
        callback();
        $("#rsModalConfirm").modal("hide");
    });

    $("#rsModalConfirm").on("hidden.bs.modal", function () {
        $("#rsModalConfirm").remove();
    });

    $("#rsModalConfirm").modal({ backdrop: "static", keyboard: false });
};

var $rs_insertWebGridAddButton = function (webGridContainerID, title, callback) {
    var html =
            "<button type='button' class='btn btn-primary btn-xs' id='" + webGridContainerID + "-ButtonAdd' data-toggle='tooltip' data-placement='top' title='" + title + "'>" +
                "<span class='glyphicon glyphicon-plus'></span>" +
            "</button>";
    $("#" + webGridContainerID + " table thead tr th:first").append(html);

    // everytime we dynamically add to the DOM with tooltip involved, we have to enable tooltip
    $("[data-toggle='tooltip']").tooltip();

    $("#" + webGridContainerID + "-ButtonAdd").on("click", function () {
        callback();
    });
};

var $rs_loadJavascript = function (url, cache) {
    $.ajax({
        url: url,
        cache: cache,
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Unable to download script file due to error: " + xhr.status + " " + xhr.statusText);
        }
    });
};