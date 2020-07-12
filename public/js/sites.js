$(function() {
    onLoading();
    get_sites_data();
});

function onLoading() {
    var html = `
    <div class="d-flex justify-content-center">    
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;

    $('#loading').html(html);
}

function set_visible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

function get_sites_data() {
    var socket = io();
    socket.on('sites-data', function(data) {
        set_visible('#loading', false);
        $('#sites-list').html(show_site_lists(data));
    });
}

function show_site_lists(site_lists_all) {
    var lists_sneakers = [];
    var lists_luxury = [];
    var lists_street = [];

    for(var idx = 0; idx < site_lists_all.length; idx ++) {
        if(site_lists_all[idx].category === "sneakers") { lists_sneakers.push(site_lists_all[idx]); }
        if(site_lists_all[idx].category === "luxury") { lists_luxury.push(site_lists_all[idx]); }
        if(site_lists_all[idx].category === "street") { lists_street.push(site_lists_all[idx]); }
    }

    var html = ``;
    html += `
    <div class="col" id="list-category">
        <div class="list-group list-group-horizontal" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-sneakers-list" data-toggle="list" href="#list-sneakers" role="tab" aria-controls="sneakers">스니커즈</a>
            <a class="list-group-item list-group-item-action" id="list-luxury-list" data-toggle="list" href="#list-luxury" role="tab" aria-controls="luxury">명품</a>
            <a class="list-group-item list-group-item-action" id="list-street-list" data-toggle="list" href="#list-street" role="tab" aria-controls="street">스트릿</a>
            <a class="list-group-item list-group-item-action" id="list-howto-list" data-toggle="list" href="#list-howto" role="tab" aria-controls="howto">직구방법</a>
        </div>
    </div>
    `;

    html += `
    <div class="row" id="site-list-group">
        <div class="col">
            <div class="tab-content" id="nav-tabContent">`;
                
    html += `<div class="tab-pane fade show active" id="list-sneakers" role="tabpanel" aria-labelledby="list-sneakers-list">`;
    for(var idx = 0; idx < lists_sneakers.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${lists_sneakers[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${lists_sneakers[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${lists_sneakers[idx].show_url}</u>)
        </a>`;
    }
    html += `</div>`;

    html += `<div class="tab-pane fade" id="list-luxury" role="tabpanel" aria-labelledby="list-luxury-list">`;
    for(var idx = 0; idx < lists_luxury.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${lists_luxury[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${lists_luxury[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${lists_luxury[idx].show_url}</u>)
        </a>`;
    }
    html += `</div>`;
                
    html += `<div class="tab-pane fade" id="list-street" role="tabpanel" aria-labelledby="list-street-list">`;
    for(var idx = 0; idx < lists_street.length; idx ++) {
        html += `<a target="_blank" rel="noopener noreferrer" href="${lists_street[idx].url}" class="list-group-item list-group-item-action">`
            + (idx + 1) + `. ${lists_street[idx].name} &nbsp;&nbsp;&nbsp;&nbsp; (<u>${lists_street[idx].show_url}</u>)
        </a>`;
    }
    html += `</div>`;

    html += `   
                    <div class="tab-pane fade" id="list-howto" role="tabpanel" aria-labelledby="list-howto-list">
                <p>how To</p>
            </div>
        </div>
    </div>`;
    return html;
}