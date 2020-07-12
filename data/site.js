var site_lists_all = [
    {
        "name" : "풋락커",
        "url" : "https://www.footlocker.com/",
        "show_url" : "www.footlocker.com"
    },
    {
        "name" : "이스트베이",
        "url" : "https://www.eastbay.com/",
        "show_url" : "www.eastbay.com"
    },
    {
        "name" : "스니커앤스터프",
        "url" : "https://www.sneakersnstuff.com/en",
        "show_url" : "www.sneakersnstuff.com"
    },
    {
        "name" : "스탁엑스",
        "url" : "https://stockx.com/",
        "show_url" : "stockx.com"
    },
    {
        "name" : "풋액션",
        "url" : "https://www.footaction.com/",
        "show_url" : "www.footaction.com"
    },
    {
        "name" : "나이키 (미국)",
        "url" : "https://www.nike.com/",
        "show_url" : "www.nike.com"
    },
    {
        "name" : "나이키 (독일)",
        "url" : "https://www.nike.com/de/",
        "show_url" : "www.nike.com/de"
    },
    {
        "name" : "아스팔트골드",
        "url" : "https://www.asphaltgold.com/de/men/",
        "show_url" : "www.asphaltgold.com",
    },
    {
        "name" : "DSW",
        "url" : "https://www.dsw.com/en/us/",
        "show_url" : "www.dsw.com",
    },
    {
        "name" : "킥스스토어",
        "url" : "https://kicksstore.eu/",
        "show_url" : "kicksstore.eu",
    },
    {
        "name" : "스나이프 USA",
        "url" : "https://www.snipesusa.com/",
        "show_url" : "www.snipesusa.com",
    },
    {
        "name" : "킥사파이",
        "url" : "https://www.kixify.com/",
        "show_url" : "www.kixify.com",
    },

    {
        "name" : "킥스스퀘어",
        "url" : "https://kixsquare.com/",
        "show_url" : "kixsquare.com",
    },
]

var site_lists_sneakers = [];
var site_lists_luxury = [];
var site_lists_street = [];
var site_lists_sports = [];

$(function() {
    $('#site-list-all').html(show_all_lists());
    $('#site-list-sneakers').html(show_sneakers_lists());
    $('#site-list-luxury').html(show_luxury_lists());
    $('#site-list-street').html(show_street_lists());
    $('#site-list-sports').html(show_sports_lists());
    $('#site-list-howto').html(show_howto_lists());
});

function show_all_lists() {
    var html = ``;
    for(var idx = 0; idx < site_lists_all.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${site_lists_all[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${site_lists_all[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${site_lists_all[idx].show_url}</u>)
        </a>`;
    }
    return html;
}

function show_sneakers_lists() {
    var html = ``;
    for(var idx = 0; idx < site_lists_sneakers.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${site_lists_sneakers[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${site_lists_sneakers[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${site_lists_sneakers[idx].show_url}</u>)
        </a>`;
    }
    return html;
}

function show_luxury_lists() {
    var html = ``;
    for(var idx = 0; idx < site_lists_luxury.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${site_lists_luxury[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${site_lists_luxury[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${site_lists_luxury[idx].show_url}</u>)
        </a>`;
    }
    return html;
}

function show_street_lists() {
    var html = ``;
    for(var idx = 0; idx < site_lists_street.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${site_lists_street[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${site_lists_street[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${site_lists_street[idx].show_url}</u>)
        </a>`;
    }
    return html;
}

function show_sports_lists() {
    var html = ``;
    for(var idx = 0; idx < site_lists_sports.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${site_lists_sports[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${site_lists_sports[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${site_lists_sports[idx].show_url}</u>)
        </a>`;
    }
    return html;
}

function show_howto_lists() {
    var html = `<p>how To</p>`;
    return html;
}