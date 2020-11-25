function scrollToHash(hash, speed) {
    if (hash.startsWith("#downloads-v3-"))
        hash = "#downloads-v3";
    var top = $(hash).offset().top - 70;
    $('html, body').animate({
        scrollTop: top
    }, speed);
}

function isTab(hash) {
    return hash && $('a.nav-link[href=' + hash + ']').length;
}

function openTab(hash) {
    if (hash.startsWith('#downloads-v3-linux-'))
        $('a.nav-link[href=#downloads-v3-linux]').tab('show');
    if (hash.startsWith('#downloads-v3-nas-'))
        $('a.nav-link[href=#downloads-v3-nas]').tab('show');
    $('a.nav-link[href=' + hash + ']').tab('show');
}

// On load, open tab and scroll, or scroll if it's just a normal fragment.
var hash = document.location.hash;
if (hash) {
    if (isTab(hash)) {
        // On page load, don't animate.
        var tabs = $('.tab-pane.fade');
        tabs.removeClass('fade in');
        openTab(hash);
        tabs.addClass('fade');
        tabs.filter('.active').addClass('in');
    }
    setTimeout(function() {
        scrollToHash(hash, 50);
    }, 50);
}

// Override handling when going through history
if (window.history.pushState) {
    window.onpopstate = function(e) {
        var hash = document.location.hash;
        if (hash && isTab(hash))
            openTab(hash);
    }
}

// Override handling of a click when we go to a fragment.
$('a').click(function(e) {
    if (e.target.hash && $(e.target).attr('href').startsWith('#')) {
        var isTabLink = $(e.target).hasClass('nav-link');
        if (window.history.pushState) {
            var wasTabChange = window.history.state && window.history.state.tabchange;
            if (!isTabLink || !wasTabChange)
                window.history.pushState({ tabchange: isTabLink }, '', e.target.hash);
            else
                window.history.replaceState({ tabchange: true }, '', e.target.hash);
        }
        if (!isTabLink) {
            e.preventDefault();
            if (isTab(e.target.hash))
                openTab(e.target.hash);
            scrollToHash(e.target.hash, 500);
        }
    }
});