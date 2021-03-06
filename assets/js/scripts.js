function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

////////////////////////////////////////////////////////////////////
/////////////////// START - DOCUMENT.READY /////////////////////////
////////////////////////////////////////////////////////////////////
$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        let tags = $("input[type=text]")
            .val()
            .split(" ")
            .filter(onlyUnique) // only unique tags
            .join(","); // join them to "tag1,tag2,tag3..."
        $.ajax({
            method: "POST",
            url:
                "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" +
                tags +
                "&tag_mode=any&page=&format=json&nojsoncallback=1&api_key=bb4c35c8650d0b204792b502e7aca808",
            dataType: "json",
            success: function(obj) {
                $("#photos_container").html(""); // before each new call removing previous content
                $.each(obj.photos.photo, function(indexPhoto) {
                    // for each photo creating a link and img tags
                    let photo = obj.photos.photo[indexPhoto]; // each photo
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
                        '<a href="https://www.flickr.com/photos/' +
                            photo.owner +
                            "/" +
                            photo.id +
                            '/in/feed"><img src="' +
                            photoUrl +
                            '"/></a>'
                    );
                });
            },
            error: function() {
                alert("lol kek error with getting photos");
            }
        });
        tag = tags.split(",")[0]; // first tag
        $.ajax({
            method: "POST",
            url:
                "http://words.bighugelabs.com/api/2/c54b5485a3637c3d910779e39a80bc89/" +
                tag + // keywords for the first tag
                "/json",
            dataType: "json",
            success: function(obj) {
                $("#keywords_container ul").html(""); // before each new call removing previous content
                if (obj.hasOwnProperty("noun")) {
                    $.each(obj.noun.syn, function(indexWord) {
                        // for each synonym creating a link
                        $("#keywords_container ul").append(
                            "<li><a href=''>" +
                            obj.noun.syn[indexWord] + // getting the synonyms
                                "</a></li>"
                        );
                    });
                } else {
                    $("#keywords_container ul").append(
                        "<li>Couldn't get any related tags</li>"
                    );
                }
            },
            error: function() {
                $("#keywords_container ul").html(""); // before each new call removing previous content
                $("#keywords_container ul").append(
                    "<li>Couldn't get any related tags</li>"
                );
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
