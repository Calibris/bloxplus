var posts = $('strong:contains("Posts")').parent().next();
if (JSON.parse(localStorage.getItem('opt_format'))) {
    for (var i = 0; i < posts.length; i++) {
        var current = parseInt(posts.eq(i).text().split(",").join(""));
        if (current < 1000) {
            posts.eq(i).text(current.toString());
        } else {
            var a = Math.round(current / 100) / 10;
            var result = a.valueOf() + 'K';
            posts.eq(i).text(result.toString());
        }
    }
}