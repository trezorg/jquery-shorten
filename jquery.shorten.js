jQuery.fn.shorten = function(settings) {
    var config = {
        showChars : 100,
        ellipsesText : "...",
        moreText : "more",
        lessText : "less"
    };

    if (settings) {
        $.extend(config, settings);
    }

    return this.each(function() {
        var $this = $(this);
        // if we have already a shortened element - pass by it
        if ($this.find('.morecontent').length) return;

        var content = $this.html();
        if (content.length > config.showChars) {
            var c = content.substr(0, config.showChars);
            var h = content.substr(config.showChars , content.length - config.showChars);
            var html = c + '<span class="moreellipses">' + config.ellipsesText + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="javascript://nop/" class="morelink">' + config.moreText + '</a></span>';
            $this.html(html);
            $(".morecontent span").hide();

            //bind click event
            $this.find('.morelink').on('click', function() {
                var $this = $(this);
                if ($this.hasClass('less')) {
                    $this.removeClass('less');
                    $this.html(config.moreText);
                } else {
                    $this.addClass('less');
                    $this.html(config.lessText);
                }
                $this.parent().prev().toggle();
                $this.prev().toggle();
                return false;
            });
        }
    });
};
