
$(function () {
    buildSearch();
    styleComponents();
});

function buildSearch() {
    $('#txtSearch').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            var criteria = $("#txtSearch").val();
            if (criteria != '')
                window.location = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port + '/dwelo' : '') + '/results/' + criteria;
            return false;
        }
    });
}

function styleComponents() {
    $("a[rel=twipsy]").twipsy({
        live: true,
        placement: 'below'
    });

    $(".clickable").live("click", function () {
        var link = $(this).find('a[rel=twipsy]');
        var linkhref = link.attr('href');
        window.location = linkhref;
        return false;
    });

    $("a[rel=profile]").live("click", function () {
        var linkhref = $(this).attr('href');
        window.location = linkhref;
        return false;
    });
}