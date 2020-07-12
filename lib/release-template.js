module.exports = {
    RELEASE: function(cur_page, cur_state, cur_sort, site_page) {
        var domestic_site = [];
        var international_site = [];
        var show_item = 12;          // show item in single page

        var html = ``;
        html += `
        <div id="drop-btns" class="container-fluid">
            <div class="top-left">
                <h4>출시되는 스니커즈</h4>
                <p>국내, 해외 사이트의 모든 출시정보를 한눈에 볼 수 있습니다</p>
                <p>(매일 12시에 업데이트 됩니다)</p>
            </div>
            <div class="top-right">
                <span id="drop-category" class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${cur_state}
                    </a>
                    
                    <span class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="/page/release/${cur_page}/category/all">전체</a>
                        <a class="dropdown-item" href="/page/release/${cur_page}/category/domestic">국내</a>
                        <a class="dropdown-item" href="/page/release/${cur_page}/category/international">해외</a>
                    </span>
                </span>

                <span id="drop-sort" class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${cur_sort}
                    </a>
                    
                    <span class="dropdown-menu" aria-labelledby="dropdownMenuLink">`;
        html += sort_release_link(cur_page, cur_state);
        html += `
                    </span>
                </span>
            </div>
        </div>

        <div id="drop-btns-small" class="container-fluid">
            <div class="col">
                <div class="row justify-content-center">
                    <h4 id="release-title">출시되는 스니커즈</h4>
                </div>
                <div class="row justify-content-center" style="margin-top:15px;">
                    <span id="drop-category" class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${cur_state}
                        </a>
                        
                        <span class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="/page/release/${cur_page}/category/all">전체</a>
                            <a class="dropdown-item" href="/page/release/${cur_page}/category/domestic">국내</a>
                            <a class="dropdown-item" href="/page/release/${cur_page}/category/international">해외</a>
                        </span>
                    </span>

                    <span id="drop-sort" class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${cur_sort}
                        </a>
                        
                        <span class="dropdown-menu" aria-labelledby="dropdownMenuLink">`;
        html += sort_release_link(cur_page, cur_state);
        html += `
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">`;
        html += show_release_gallery(cur_page, cur_state, cur_sort, show_item, site_page, domestic_site, international_site);
        html += `
            </div>
        </div>

        <div id="page-nav">`;
        html += release_page_navigation(cur_page, cur_state, cur_sort, show_item, site_page, domestic_site, international_site);
        html += `
        </div>
        `;
        return html;
    }
}

function split_release_country(cur_state, site_page, domestic_site, international_site) {
    if(cur_state === "국내") {
        for(var idx = 0; idx < site_page.length; idx ++) {
            if(site_page[idx].country === "국내") { domestic_site.push(site_page[idx]); }
        }
    }

    if(cur_state === "해외") {
        for(var idx = 0; idx < site_page.length; idx ++) {
            if(site_page[idx].country === "해외") { international_site.push(site_page[idx]); }
        }
    }
}

function release_page_navigation(cur_page, cur_state, cur_sort, item, site_page, domestic_site, international_site) {
    const page = "release";
    var total_page;
    if(cur_state === "국내") {
        if((domestic_site.length % item) == 0) { total_page = (domestic_site.length / item); }
        else { total_page = (domestic_site.length / item) + 1; }
    }
    if(cur_state === "해외") {
        if((international_site.length % item) == 0) { total_page = (international_site.length / item); }
        else { total_page = (international_site.length / item) + 1; }
    }
    if(cur_state === "전체") {
        if((site_page.length % item) == 0) { total_page = (site_page.length / item); }
        else { total_page = (site_page.length / item) + 1; }
    }

    const category = ["domestic", "international", "all"];
    const sort = ["date", "name", "click"];
    var category_idx = -1;
    var sort_idx = -1;

    if(cur_state === "국내") { category_idx = 0; }
    if(cur_state === "해외") { category_idx = 1; }
    if(cur_state === "전체") { category_idx = 2; }

    if(cur_sort === "날짜순") { sort_idx = 0; }
    if(cur_sort === "이름순") { sort_idx = 1; }
    if(cur_sort === "조회순") { sort_idx = 2; }

    var prev_page = cur_page - 1;
    var next_page = ((cur_page * 1) + 1);

    var html = `
    <nav aria-label="Page navigation example">
        <ul class="pagination">`;

    // 처음
    if(cur_page == 1) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">처음</a></li>`; }
    else { html += `<li class="page-item"><a class="page-link" href="/page/${page}/1/category/${category[category_idx]}/sort/${sort[sort_idx]}">처음</a></li>`;}

    // 이전
    if(cur_page == 1) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">이전</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${prev_page}/category/${category[category_idx]}/sort/${sort[sort_idx]}">이전</a></li>`;
    }
    
    var start_page;
    if(cur_page % 10 === 0) { start_page = (parseInt(cur_page / 10) * 10) - 9; }
    else { start_page = (parseInt(cur_page / 10) * 10) + 1; }

    // 현재 페이지
    if(start_page + 10 < total_page) {
        for(var idx = start_page; idx < start_page + 10; idx ++) {
            if(cur_page == idx) {
                html += `<li class="page-item active"><a class="page-link" href="/page/${page}/${cur_page}/category/${category[category_idx]}/sort/${sort[sort_idx]}">` + idx + `</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" href="/page/${page}/${idx}/category/${category[category_idx]}/sort/${sort[sort_idx]}">` + idx + `</a></li>`;
            }
        }
    }
    else {
        for(var idx = start_page; idx <= total_page; idx ++) {
            if(cur_page == idx) {
                html += `<li class="page-item active"><a class="page-link" href="/page/${page}/${cur_page}/category/${category[category_idx]}/sort/${sort[sort_idx]}">` + idx + `</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" href="/page/${page}/${idx}/category/${category[category_idx]}/sort/${sort[sort_idx]}">` + idx + `</a></li>`;
            }
        }
    }

    // 다음 
    var end_page = parseInt(total_page);
    if(cur_page == end_page) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">다음</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${next_page}/category/${category[category_idx]}/sort/${sort[sort_idx]}">다음</a></li>`;
    }

    // 끝
    if(cur_page == end_page) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">끝</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${end_page}/category/${category[category_idx]}/sort/${sort[sort_idx]}">끝</a></li>`;
    }

    html += `
        </ul>
    </nav>
    `;
    return html;
}

function sort_release_gallery(cur_state, cur_sort, site_page, domestic_site, international_site) {
    var date_sort = function(a, b) {
        if(a.month === b.month) {
            return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        }
        return a.month > b.month ? -1 : a.month < b.month ? 1 : 0;
    };
    var name_sort = function(a, b) { return a.title < b.title ? -1 : a.title > b.title ? 1 : 0; };
    var click_sort = function(a, b) { return a.clicked > b.clicked ? -1 : a.clicked < b.clicked ? 1 : 0; };

    if(cur_state === "국내") {
        if(cur_sort === "날짜순") { domestic_site.sort(date_sort); }
        if(cur_sort === "이름순") { domestic_site.sort(name_sort); }
        if(cur_sort === "조회순") { domestic_site.sort(click_sort); }
    }

    if(cur_state === "해외") {
        if(cur_sort === "날짜순") { international_site.sort(date_sort); }
        if(cur_sort === "이름순") { international_site.sort(name_sort); }
        if(cur_sort === "조회순") { international_site.sort(click_sort); }
    }

    if(cur_state === "전체") {
        if(cur_sort === "날짜순") { site_page.sort(date_sort); }
        if(cur_sort === "이름순") { site_page.sort(name_sort); }
        if(cur_sort === "조회순") { site_page.sort(click_sort); }
    }
}

function show_release_gallery(cur_page, cur_state, cur_sort, item, site_page, domestic_site, international_site) {
    var start_idx = (cur_page - 1) * item;

    var html = ``;
    if(cur_state != "전체") { split_release_country(cur_state, site_page, domestic_site, international_site); }

    sort_release_gallery(cur_state, cur_sort, site_page, domestic_site, international_site);

    // show pages
    if(cur_state === "국내") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= domestic_site.length) { break; }
            var cur_month = get_mm(domestic_site[idx].date);
            var cur_date = get_dd(domestic_site[idx].date);
            var price = get_price(domestic_site[idx].price);

            html += `
            <div id="card-content" class="col-xl-3 col-md-4 col-sm-6 col-12">
                <div id="item-card" class="card">
                    <a target="_blank" rel="noopener noreferrer" href="${domestic_site[idx].url}">`;

            if(domestic_site[idx].date != null) { html += `<div class="top-left"><h4>${cur_month}월</h4>${cur_date}일</div>`; }
        
            html += `
                            <img src="${domestic_site[idx].image}" class="card-img-top" alt="" onerror="this.src='/image/no-image.png'">
                        <div class="card-body" style="text-align: center;">
                            <h5 class="card-title">${domestic_site[idx].title}</h5>
                            <p class="card-text">${domestic_site[idx].content}</p>`;

            if(domestic_site[idx].price != null) { html += `<p>출시가 ${price} &#8361</p>`; }
                            
            html += `
                            <a id="hover-btn" target="_blank" rel="release-site" href="${domestic_site[idx].url}" class="btn btn-primary">
                                <span>${domestic_site[idx].page_title}</span>
                                <span>VIEW RELEASE</span>
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }
    }

    if(cur_state === "해외") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= international_site.length) { break; }
            var cur_month = get_mm(international_site[idx].date);
            var cur_date = get_dd(international_site[idx].date);
            var price = get_price(international_site[idx].price);

            html += `
            <div id="card-content" class="col-xl-3 col-md-4 col-sm-6 col-12">
                <div id="item-card" class="card">
                    <a target="_blank" rel="noopener noreferrer" href="${international_site[idx].url}">`;

            if(international_site[idx].date != null) { html += `<div class="top-left"><h4>${cur_month}월</h4>${cur_date}일</div>`; }
        
            html += `
                            <img src="${international_site[idx].image}" class="card-img-top" alt="" onerror="this.src='/image/no-image.png'">
                        <div class="card-body" style="text-align: center;">
                            <h5 class="card-title">${international_site[idx].title}</h5>
                            <p class="card-text">${international_site[idx].content}</p>`;

            if(international_site[idx].price != null) { html += `<p>출시가 ${price} $</p>`; }
                            
            html += `
                            <a id="hover-btn" target="_blank" rel="release-site" href="${international_site[idx].url}" class="btn btn-primary">
                                <span>${international_site[idx].page_title}</span>
                                <span>VIEW RELEASE</span>
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }
    }

    if(cur_state === "전체") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= site_page.length) { break; }
            var cur_month = get_mm(site_page[idx].date);
            var cur_date = get_dd(site_page[idx].date);
            var price = get_price(site_page[idx].price);
            console.log(site_page[idx].date);

            html += `
            <div id="card-content" class="col-xl-3 col-md-4 col-sm-6 col-12">
                <div id="item-card" class="card">
                    <a target="_blank" rel="noopener noreferrer" href="${site_page[idx].url}">`;

            if(site_page[idx].date != null) { html += `<div class="top-left"><h4>${cur_month}월</h4>${cur_date}일</div>`; }

            html += `
                            <img src="${site_page[idx].image}" class="card-img-top" alt="" onerror="this.src='/image/no-image.png'">
                        <div class="card-body" style="text-align: center;">
                            <h5 class="card-title">${site_page[idx].title}</h5>
                            <p class="card-text">${site_page[idx].content}</p>`;
                        
            if(site_page[idx].country === "해외") {
                if(site_page[idx].price != null) { html += `<p>출시가 ${price} $</p>`; }
                else { html += `<p>출시가 - </p>`; }
            }
            else {
                if(site_page[idx].price != null) { html += `<p>출시가 ${price} &#8361</p>`; }
                else { html += `<p>출시가 - </p>`; }
            }
                          
            html += `
                            <a id="hover-btn" target="_blank" rel="release-site" href="${site_page[idx].url}" class="btn btn-primary">
                                <span>${site_page[idx].page_title}</span>
                                <span>VIEW RELEASE</span>
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }
    }
    return html;
}

function sort_release_link(cur_page, cur_state) {
    var html = ``;
    var category = ["all", "domestic", "international"];
    var cur_idx = -1;
    if(cur_state === "전체") { cur_idx = 0; }
    if(cur_state === "국내") { cur_idx = 1; }
    if(cur_state === "해외") { cur_idx = 2; }
    html += `
    <a class="dropdown-item" href="/page/release/${cur_page}/category/${category[cur_idx]}/sort/date">날짜순</a>
    <a class="dropdown-item" href="/page/release/${cur_page}/category/${category[cur_idx]}/sort/name">이름순</a>
    <a class="dropdown-item" href="/page/release/${cur_page}/category/${category[cur_idx]}/sort/click">조회순</a>
    `;
    return html;
}

function get_mm(data) {
    var cur_date = new Date(data);
    var ret = cur_date.getUTCMonth() + 1;
    if(ret < 10) {
        ret = "0" + ret;
    }
    return ret;
}

function get_dd(data) {
    var cur_date = new Date(data);
    var ret = cur_date.getUTCDate();
    if(ret < 10) {
        ret = "0" + ret;
    }
    return ret;
}

function get_price(price) {
    var ret = "";
    var num = price + "";
    var point = num.length % 3;
    var len = num.length;

    ret = num.substring(0, point);
    while(point < len) {
        if(ret != "") ret += ",";
        ret += num.substring(point, point + 3);
        point += 3;
    }

    return ret;
}