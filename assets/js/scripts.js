////////////////////////////////////////////////////////////////////
/////////////////// START - DOCUMENT.READY /////////////////////////
////////////////////////////////////////////////////////////////////

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url:
                "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" +
                $("input[type=text]").val() +
                "&tag_mode=any&format=json&nojsoncallback=1&api_key=bb4c35c8650d0b204792b502e7aca808",
            dataType: "json",
            success: function(obj) {
                $("#photos_container").html("");
                console.log(obj);
                jQuery.each(obj.photos.photo, function(index) {
                    let photo = obj.photos.photo[index];
                    let photoUrl =
                        "https://farm" +
                        photo.farm +
                        ".staticflickr.com/" +
                        photo.server +
                        "/" +
                        photo.id +
                        "_" +
                        photo.secret +
                        ".jpg";
                    $("#photos_container").append(
                        '<img src="' + photoUrl + '"/>'
                    );
                });
                $.ajax({
                    method: "POST",
                    url:
                        "http://words.bighugelabs.com/api/2/c54b5485a3637c3d910779e39a80bc89/" +
                        $("input[type=text]").val() +
                        "/json",
                    dataType: "json",
                    success: function(obj) {
                        console.log(obj);
                        $("#keywords_container ul").html("");
                        jQuery.each(obj.noun.syn, function(index) {
                            let word = obj.noun.syn[index];
                            $("#keywords_container ul").append(
                                "<li><a href=''>" + word + "</a></li>"
                            );
                        });
                    }
                });
            },
            error: function() {
                alert("error");
            }
        });
    });

    $(document).on("click", "ul > li > a", function(e) {
        e.preventDefault();
        $("input[type=text]").val($(this).text());
        $("form").submit();
    });
});

////////////////////////////////////////////////////////////////////
//////////////////// END - DOCUMENT.READY //////////////////////////
////////////////////////////////////////////////////////////////////
