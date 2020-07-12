module.exports = {    
    SHOW_STOCK_CONTENT: function(load_items, cur_category, cur_type, cur_prices, cur_sort, cur_page) {
        var html = ``;

        html += `
        <div id="page-banner" class="container-fluid">
            <div class="top-left">
                <h4>스니커즈 가격비교</h4>
                <p>원하는 신발의 리셀가를 비교할 수 있습니다.</p>
                <p>모든 종류의 조던, 아디다스, 콜라보 제품들이 있습니다.</p>
            </div>
        </div>

        <div id="page-banner-small" class="container-fluid justify-content-center">
            <h4>Sneakers Stock</h4>
        </div>
        `;

        var show_items = 12;
        var cur_items = [];
        for(var i=0; i<load_items.length; i++) {
            cur_items[i] = (load_items[i]);
        }
        sort_items(cur_items, cur_category, cur_type, cur_prices, cur_sort);

        html += `<div class="row" id="stock-content">`;
        html += show_stock_content(cur_items, cur_category, cur_type, cur_prices, cur_sort, show_items, cur_page);
        html += `</div>`;

        return html;
    },
    SHOW_SNEAKER_CHART: function(sneaker_param, size_param, able_size) {
        var html = ``;

        html += `
        <div class="container">
            <div id="chart-title" class="row justify-content-center">
                <h1>${sneaker_param}</h1>
            </div>

            <div class="row justify-content-end">`;
            html += show_size_tag(sneaker_param, size_param, able_size);
            html += `
            </div>

            <div id="chart-row" class="row justify-content-center">
                <div id="chart-row-col-img" class="col-md-6 col-sm-12">
                    <img id="stock-item-img" src="/image/nike4.jpg">
                </div>
                <div id="chart-row-col-chart" class="col-md-6 col-sm-12">
                    <div class="col"> 
                        <div id="chart-btn-group" class="row justify-content-center">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary" id="update-week">1주일</button>
                                <button type="button" class="btn btn-secondary" id="update-month">1개월</button>
                                <button type="button" class="btn btn-secondary" id="update-three-month">3개월</button>
                                <button type="button" class="btn btn-secondary" id="update-half">6개월</button>
                                <button type="button" class="btn btn-secondary" id="update-year">1년</button>
                            </div>
                        </div>

                        <div class="row justify-content-center">
                            <canvas id="stock-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div id="stock-summary-table" class="container table-responsive"></div>

            <div id="stock-link-table" class="container-fluid table-responsive"></div>

            <div id="page-nav" class="container">
                <button id="load-more" type="button" class="btn btn-outline-dark">더보기</button>
            </div>
        
        </div>
        `;

        return html;
    }
}

function show_size_tag(sneaker_param, size_param, able_size) {
    if(size_param === undefined) { size_param = "전체"; }
    var size = [];
    for(var idx = 0; idx < able_size.length; idx ++) {
        size.push({
            "size":able_size[idx],
            "activate":true
        });
    }

    var html = ``;

    html += `
    <h4 id="size-tag">사이즈</h4>
        <div id="size-dropdown" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="size-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${size_param}
            </button>
            <div class="dropdown-menu" aria-labelledby="size-dropdown">
                <a class="dropdown-item" href="/page/stock/${sneaker_param}">전체</a>`;

    for(var idx = 0; idx < size.length; idx ++) {
        var able = "";
        if(size[idx].activate === false) { able = "disabled"; }

        if(size[idx].size == size_param) { html += `<a class="dropdown-item active" href="/page/stock/${sneaker_param}/${size[idx].size}">${size[idx].size}</a>`; }
        else { html += `<a class="dropdown-item ${able}" href="/page/stock/${sneaker_param}/${size[idx].size}">${size[idx].size}</a>`; }
    }
            
    html += `
            </div>
        </div>
    `;

    return html;
}

function sort_items(cur_items, cur_category, cur_type, cur_prices, cur_sort) {
    var date = function(a, b) { return new Date(b.last_trade) - new Date(a.last_trade); }
    var low_price = function(a, b) { return a.low_price < b.low_price ? -1 : a.low_price > b.low_price ? 1 : 0; }
    var high_price = function(a, b) { return a.low_price > b.low_price ? -1 : a.low_price < b.low_price ? 1 : 0; }
    var name = function(a, b) {
        return a.title - b.title;
    }
    var click = function(a, b) { return a.click > b.click ? -1 : a.click < b.click ? 1 : 0; }

    var kor_cur_category = "";
    if(cur_category === "all") { kor_cur_category = "전체"; }
    if(cur_category === "airjordan") { kor_cur_category = "에어조던"; }
    if(cur_category === "nike") { kor_cur_category = "나이키"; }
    if(cur_category === "adidas") { kor_cur_category = "아디다스"; }
    if(cur_category === "others") { kor_cur_category = "다른 브랜드"; }
    if(cur_category === "collaboration") { kor_cur_category = "콜라보"; }
    if(cur_category === "luxury") { kor_cur_category = "명품"; }

    var kor_cur_type = "";
    if(cur_type === "all") { kor_cur_type = "전체"; }
    if(cur_type === "men") { kor_cur_type = "남성"; }
    if(cur_type === "women") { kor_cur_type = "여성"; }
    if(cur_type === "kids") { kor_cur_type = "아동"; }

    // category
    if(cur_category != "all") {
        if(cur_category === "others") {
            for(var idx = 0; idx < cur_items.length; idx ++) {
                if(cur_items[idx].category === "에어조던" || cur_items[idx].category === "나이키" || cur_items[idx].category === "아디다스" || cur_items[idx].category === "콜라보" || cur_items[idx].category === "명품") {
                    cur_items.splice(idx, 1);
                    idx -= 1;
                }
            }
        }
        else {
            for(var idx = 0; idx < cur_items.length; idx ++) {
                if(kor_cur_category != cur_items[idx].category) {
                    cur_items.splice(idx, 1);
                    idx -= 1;
                }
            }
        }
    }
    // type
    if(cur_type != "all") {
        for(var idx = 0; idx < cur_items.length; idx ++) {
            if(kor_cur_type != cur_items[idx].type) {
                cur_items.splice(idx, 1);
                idx -= 1;
            }
        }
    }
    // price
    if(cur_prices != "all") {
        if(cur_prices > 400000) {
            for(var idx = 0; idx < cur_items.length; idx ++) {
                if((cur_prices) > (cur_items[idx].low_price*(1))) {
                    cur_items.splice(idx, 1);
                    idx -= 1;
                }
            }
        }
        else {
            for(var idx = 0; idx < cur_items.length; idx ++) {
                if((cur_prices - 100000) > (cur_items[idx].low_price*(1)) || 
                   (cur_prices) < (cur_items[idx].low_price*(1))) {
                    cur_items.splice(idx, 1);
                    idx -= 1;
                }
            }
        }
    }

    // sorting
    if(cur_sort === "date") { cur_items.sort(date); }
    if(cur_sort === "low_price") { cur_items.sort(low_price); }
    if(cur_sort === "high_price") { cur_items.sort(high_price); }
    if(cur_sort === "name") { cur_items.sort(name); }
    if(cur_sort === "click") { cur_items.sort(click); }
}

function show_stock_category(cur_page, cur_category, cur_type, cur_prices, cur_sort) {
    const category = ["모든 브랜드", "에어조던", "나이키", "아디다스", "다른 브랜드", "콜라보", "명품"];
    const category_link = ["all", "airjordan", "nike", "adidas", "others", "collaboration", "luxury"];
    var url = ``;
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>브랜드</h4></div>`;
    for(var idx = 0; idx < category_link.length; idx ++) {
        url = `/page/stock/${cur_page}/category/${category_link[idx]}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}`;
        html += `<div class="row" id="stock-tag">`;

        if(cur_category === "all") {
            if(idx === 0) {
                html += `<button id="filter-category-selected" type="button" class="btn btn-outline-dark"
                onclick="window.location='${url}';">${category[idx]}</button>`;
            }
            else {
                html += `<button id="filter-category" type="button" class="btn btn-outline-dark"
                onclick="window.location='${url}';">${category[idx]}</button>`;
            }
        }
        else {
            if(cur_category === category_link[idx]) {
                html += `<button id="filter-category-selected" type="button" class="btn btn-outline-dark"
                onclick="window.location='${url}';">${category[idx]}</button>`;
            }
            else {
                html += `<button id="filter-category" type="button" class="btn btn-outline-dark"
                onclick="window.location='${url}';">${category[idx]}</button>`;
            }
        }

        html += `</div>`;
    }

    html += `
    <div class="row justify-content-center" id="stock-tag-dropdown">
        <div class="dropdown" style="margin-right: 10px;">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                브랜드 선택
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">`;
                
    for(var idx = 0; idx < category_link.length; idx ++) {
        url = `/page/stock/${cur_page}/category/${category_link[idx]}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}`;
        html += `<a class="dropdown-item" href="${url}">${category[idx]}</a>`;
    }

    html += `
            </div>
        </div>
    </div>
    `;

    return html;
}

function show_stock_types(cur_page, cur_category, cur_type, cur_prices, cur_sort) {
    const types = ["전체", "남성", "여성", "아동"];
    const type_link = ["all", "men", "women", "kids"];
    var url = ``;
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>종류</h4></div>`;
    for(var idx = 0; idx < type_link.length; idx ++) {
        var url = `/page/stock/${cur_page}/category/${cur_category}/type/${type_link[idx]}/price/${cur_prices}/sort/${cur_sort}`;
        html += `<div class="row" id="stock-tag">`;

        if(cur_type == type_link[idx]) {
            html += `<button id="filter-category-selected" type="button" class="btn btn-light"
            onclick="window.location='${url}';">${types[idx]}</button>`;
        }
        else {
            html += `<button id="filter-category" type="button" class="btn btn-light"
            onclick="window.location='${url}';">${types[idx]}</button>`;
        }
            
        html += `</div>`;
    }

    html += `
    <div class="row justify-content-center" id="stock-tag-dropdown">
        <div class="dropdown" style="margin-right: 10px;">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                종류 선택
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">`;
                
    for(var idx = 0; idx < type_link.length; idx ++) {
        url = `/page/stock/${cur_page}/category/${cur_category}/type/${type_link[idx]}/price/${cur_prices}/sort/${cur_sort}`;
        html += `<a class="dropdown-item" href="${url}">${types[idx]}</a>`;
    }

    html += `
            </div>
        </div>
    </div>
    `;
    
    return html;
}

function show_stock_prices(cur_page, cur_category, cur_type, cur_prices, cur_sort) {
    const prices = ["~ 100000", "~ 200000", "~ 300000", "~ 400000", "400000 ~ "];
    const price_link = ["100000", "200000", "300000", "400000", "500000"];
    var url = ``;
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>가격</h4></div>`;
    for(var idx = 0; idx < prices.length; idx ++) {
        url = `/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${price_link[idx]}/sort/${cur_sort}`;
        html += `<div class="row" id="stock-tag">`;
        
        if(cur_prices === "all") {
            html += `<button id="filter-category" type="button" class="btn btn-light"
            onclick="window.location='${url}';">${prices[idx]}</button>`;
        }
        else {
            if(cur_prices == price_link[idx]) {
                html += `<button id="filter-category-selected" type="button" class="btn btn-light"
                onclick="window.location='${url}';">${prices[idx]}</button>`;
            }
            else {
                html += `<button id="filter-category" type="button" class="btn btn-light"
                onclick="window.location='${url}';">${prices[idx]}</button>`;
            }
        }

        html += `</div>`;
    }

    html += `
    <div class="row justify-content-center" id="stock-tag-dropdown">
        <div class="dropdown" style="margin-right: 10px;">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                가격 선택
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">`;
                
    for(var idx = 0; idx < price_link.length; idx ++) {
        url = `/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${price_link[idx]}/sort/${cur_sort}`;
        html += `<a class="dropdown-item" href="${url}">${prices[idx]}</a>`;
    }

    html += `
            </div>
        </div>
    </div>
    `;

    return html;
}

function add_filter(cur_page, cur_category, cur_type, cur_prices, cur_sort) {
    var filters = [];
    if(cur_category != "all") {
        if(cur_category === "airjordan") { filters.push({"title":"에어조던", "filter":"category"}); }
        if(cur_category === "nike") { filters.push({"title":"나이키", "filter":"category"}); }
        if(cur_category === "adidas") { filters.push({"title":"아디다스", "filter":"category"}); }
        if(cur_category === "others") { filters.push({"title":"다른 브랜드", "filter":"category"}); }
        if(cur_category === "collaboration") { filters.push({"title":"콜라보", "filter":"category"}); }
        if(cur_category === "luxury") { filters.push({"title":"명품", "filter":"category"}); }
    }
    if(cur_type != "all") {
        if(cur_type === "men") { filters.push({"title":"남성", "filter":"type"}); }
        if(cur_type === "women") { filters.push({"title":"여성", "filter":"type"}); }
        if(cur_type === "kids") { filters.push({"title":"아동", "filter":"type"}); }
    }
    if(cur_prices != "all") {
        if(cur_prices === "100000") { filters.push({"title":"~ 100000", "filter":"price"}); }
        if(cur_prices === "200000") { filters.push({"title":"~ 200000", "filter":"price"}); }
        if(cur_prices === "300000") { filters.push({"title":"~ 300000", "filter":"price"}); }
        if(cur_prices === "400000") { filters.push({"title":"~ 400000", "filter":"price"}); }
        if(cur_prices === "500000") { filters.push({"title":"400000 ~ ", "filter":"price"}); }
    }

    var html = ``;
    for(var idx = 0; idx < filters.length; idx ++) {
        if(filters[idx].filter === "category") {
            html += `<a id="filter-btn" class="btn btn-secondary" href="/page/stock/${cur_page}/category/all/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}" role="button">${filters[idx].title} X</a>`;
        }
        if(filters[idx].filter === "type") {
            html += `<a id="filter-btn" class="btn btn-secondary" href="/page/stock/${cur_page}/category/${cur_category}/type/all/price/${cur_prices}/sort/${cur_sort}" role="button">${filters[idx].title} X</a>`;
        }
        if(filters[idx].filter === "size") {
            html += `<a id="filter-btn" class="btn btn-secondary" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}" role="button">${filters[idx].title} X</a>`;
        }
        if(filters[idx].filter === "price") {
            html += `<a id="filter-btn" class="btn btn-secondary" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/all/sort/${cur_sort}" role="button">${filters[idx].title} X</a>`;
        }
    }
    return html;
}

function show_stock_items(cur_items, cur_page, show_items) {
    var start_idx = (cur_page - 1) * show_items;

    var html = ``;
    for(var idx = start_idx; idx < start_idx + show_items; idx ++) {
        if(idx >= cur_items.length) { break; }
        const cur_date = new Date(cur_items[idx].last_trade);

        var year = cur_date.getUTCFullYear();
        var month = cur_date.getUTCMonth() + 1;
        var day = cur_date.getUTCDate();

        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }

        html += `
        <div class="col-xl-3 col-md-4 col-sm-6 col-12">
            <div class="row justify-content-center">
                <div id="item-card" class="card">
                    <a href="/page/stock/${cur_items[idx].title}">
                        <div id="image-hover-text" class="container">
                            <img src="${cur_items[idx].image}" class="card-img-top" alt="Not Found!">
                            <div class="overlay">
                                <div class="text">차트 페이지 이동</div>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${cur_items[idx].title}</h5>
                            <p class="card-text">최저가 ${cur_items[idx].low_price} &#8361</p>
                            <p>최근거래 ${year}-${month}-${day}</p>
                        </div>
                    </a>                    
                </div>
            </div>
        </div>
        `;
    }
    return html;
}

function stock_page_navigation(cur_items, cur_category, cur_type, cur_prices, cur_sort, show_items, cur_page) {
    const page = "stock";
    var total_page;
    if((cur_items.length % show_items) == 0) { total_page = (cur_items.length / show_items); }
    else { total_page = (cur_items.length / show_items) + 1; }

    var prev_page = cur_page - 1;
    var next_page = ((cur_page * 1) + 1);

    var html = `
    <nav aria-label="Page navigation example">
        <ul class="pagination">`;

    // 처음
    if(cur_page == 1) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">처음</a></li>`; }
    else { html += `<li class="page-item"><a class="page-link" href="/page/${page}/1/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">처음</a></li>`;}

    // 이전
    if(cur_page == 1) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">이전</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${prev_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">이전</a></li>`;
    }
    
    var start_page;
    if(cur_page % 10 === 0) { start_page = (parseInt(cur_page / 10) * 10) - 9; }
    else { start_page = (parseInt(cur_page / 10) * 10) + 1; }

    // 현재 페이지
    if(start_page + 10 < total_page) {
        for(var idx = start_page; idx < start_page + 10; idx ++) {
            if(cur_page == idx) {
                html += `<li class="page-item active"><a class="page-link" href="/page/${page}/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">` + idx + `</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" href="/page/${page}/${idx}/category/${cur_category}/type/${cur_type}//price/${cur_prices}/sort/${cur_sort}">` + idx + `</a></li>`;
            }
        }
    }
    else {
        for(var idx = start_page; idx <= total_page; idx ++) {
            if(cur_page == idx) {
                html += `<li class="page-item active"><a class="page-link" href="/page/${page}/${cur_page}/category/${cur_category}/type/${cur_type}//price/${cur_prices}/sort/${cur_sort}">` + idx + `</a></li>`;
            }
            else {
                html += `<li class="page-item"><a class="page-link" href="/page/${page}/${idx}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">` + idx + `</a></li>`;
            }
        }
    }

    // 다음 
    var end_page = parseInt(total_page);
    if(cur_page == end_page) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">다음</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${next_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">다음</a></li>`;
    }

    // 끝
    if(cur_page == end_page) { html += `<li class="page-item"><a class="page-link" href="javascript:void(0);">끝</a></li>`; }
    else {
        html += `<li class="page-item"><a class="page-link" href="/page/${page}/${end_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/${cur_sort}">끝</a></li>`;
    }

    html += `
        </ul>
    </nav>
    `;
    return html;
}

function show_stock_content(cur_items, cur_category, cur_type, cur_prices, cur_sort, show_items, cur_page) {
    var cur_sort_state;
    if(cur_sort === "date") { cur_sort_state = "최근 거래순"; }
    if(cur_sort === "low_price") { cur_sort_state = "낮은 가격순"; }
    if(cur_sort === "high_price") { cur_sort_state = "높은 가격순"; }
    if(cur_sort === "name") { cur_sort_state = "이름순"; }
    if(cur_sort === "click") { cur_sort_state = "조회순"; }

    var html = ``;
    html += `
    <div class="col-sm-2 col-12">
        <div class="col">`;
    html += show_stock_category(cur_page, cur_category, cur_type, cur_prices, cur_sort);
    html += `
        </div>
        <div class="col" id="stock-div">`;
    html += show_stock_types(cur_page, cur_category, cur_type, cur_prices, cur_sort);
    html += `
        </div>
        <div class="col" id="stock-div">`;
    html += show_stock_prices(cur_page, cur_category, cur_type, cur_prices, cur_sort);
    html += `
        </div>
    </div>

    <div class="col-10">
        <div class="row justify-content-between">
            <div class="col" style="margin-left: 10px;">
                <a class="btn btn-outline-secondary" href="/page/stock/1/category/all/type/all/price/all/sort/date" role="button">전체 필터 해제</a>`;
    html += add_filter(cur_page, cur_category, cur_type, cur_prices, cur_sort);
    html += `
            </div>
            
            <div class="dropdown" style="margin-right: 10px;">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${cur_sort_state}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/date">최근 거래순</a>
                    <a class="dropdown-item" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/low_price">낮은 가격순</a>
                    <a class="dropdown-item" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/high_price">높은 가격순</a>
                    <a class="dropdown-item" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/name">이름순</a>
                    <a class="dropdown-item" href="/page/stock/${cur_page}/category/${cur_category}/type/${cur_type}/price/${cur_prices}/sort/click">조회순</a>
                </div>
            </div>
        </div>
        
        <div class="row" style="margin-top: 10px;">`;
    if(cur_items.length === 0) { html += `<div class="col justify-content-center" id="noItem">찾으려는 상품이 없습니다. 다른 조건을 적용해 주세요.</div>`; }
    else {
    html += show_stock_items(cur_items, cur_page, show_items);
    html += `
        </div>

        <div id="page-nav" class="pagination">`;
    html += stock_page_navigation(cur_items, cur_category, cur_type, cur_prices, cur_sort, show_items, cur_page);
    html += `
        </div>
    </div>
    `;
    }

    return html;
}