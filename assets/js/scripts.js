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
            },
            error: function() {
                alert("error");
            }
        });
    });
});

////////////////////////////////////////////////////////////////////
//////////////////// END - DOCUMENT.READY //////////////////////////
////////////////////////////////////////////////////////////////////
