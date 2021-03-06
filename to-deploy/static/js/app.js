$(window).load(function() {

    $window = $(window);
    $content = $('#content');
    function vertical_sizing() {
        $content.height($window.height() - 100);
    }
    vertical_sizing();
    $window.resize(vertical_sizing);

    // make content the right width to finish scrolling nicely in this window
    var extra_width = $(window).width() - 700 - 151 - 21;
    if (extra_width > 0) {
        var $main = $('#main');
        var main_width = $main.width();
        $main.width(main_width + extra_width);
    }
   
    // constants used throughout
    var $body = $('body');
    var tab_content_width = 800;
    var tab_width = 102;
    var cutoff_width = tab_content_width - tab_width;
    var tabs = [];
    $('.tab').each(function() {
        tabs.push({$el: $(this)});
    });

    // clicking on a tab scrolls you there
    $('.tab').on('click', function() {
        var i = $(this).data('i');
        $body.animate({scrollLeft: i*tab_content_width}, 500);
    });

    // scrolling through tabs
    setInterval(function() {
        var x = Math.max(0, $body.scrollLeft());
        var I = Math.floor(x / cutoff_width);
        if (I >= tabs.length) {
            return;
        }
        for (var i = 0; i < I; i++) {
            var margin_left = i*tab_width;
            tabs[i].$el.css({'position': 'fixed', 'margin-left': margin_left+'px'})
                .removeClass('active');
        }
        var margin_left = I*tab_width;
        tabs[I].$el.css({'position': 'fixed', 'margin-left': margin_left+'px'})
            .addClass('active');
        var i = I + 1;
        while (i < tabs.length) {
            var offset = i*tab_content_width;
            tabs[i].$el.css({'position': 'static', 'margin-left': offset+'px'})
                .removeClass('active');
            i++;
        }
    }, 50);
});

