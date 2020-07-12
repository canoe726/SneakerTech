var load_items = [
    {
        "category":"에어조던",
        "type":"남자",
        "size":"265",
        "title":"조던1",
        "low_price":"100000",
        "last_trade":"2019-06-25T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"0"
    },
    {
        "category":"나이키",
        "type":"남자",
        "size":"270",
        "title":"조던2",
        "low_price":"120000",
        "last_trade":"2020-06-20T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"4"
    },
    {
        "category":"아디다스",
        "type":"여자",
        "size":"220",
        "title":"조던3",
        "low_price":"130000",
        "last_trade":"2020-06-26T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"1"
    },
    {
        "category":"푸마",
        "type":"여자",
        "size":"230",
        "title":"조던11",
        "low_price":"160000",
        "last_trade":"2019-06-25T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"8"
    },
    {
        "category":"아식스",
        "type":"여자",
        "size":"240",
        "title":"조던12",
        "low_price":"500000",
        "last_trade":"2019-06-29T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"30"
    },
    {
        "category":"명품",
        "type":"아동",
        "size":"200",
        "title":"조던13",
        "low_price":"400000",
        "last_trade":"2019-06-28T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"10"
    },
    {
        "category":"명품",
        "type":"아동",
        "size":"205",
        "title":"조던15",
        "low_price":"300000",
        "last_trade":"2019-06-25T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"90"
    },
    {
        "category":"콜라보",
        "type":"남자",
        "size":"300",
        "title":"조던10",
        "low_price":"200000",
        "last_trade":"2019-06-20T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"340"
    },
    {
        "category":"콜라보",
        "type":"남자",
        "size":"255",
        "title":"조던8",
        "low_price":"400000",
        "last_trade":"2019-06-25T08:27",
        "img":"../public/image/nike4.jpg",
        "click":"20"
    },
    {
        "category":"에어조던",
        "type":"여자",
        "size":"245",
        "title":"조던11",
        "low_price":"100000",
        "last_trade":"2019-06-25T09:27",
        "img":"../public/image/nike4.jpg",
        "click":"70"
    },
];

var cur_category = "전체";
var cur_type = "전체";
var cur_size = "전체";
var cur_prices = "전체";
var cur_sort = "high_price";
var cur_items = [];
var show_items = 12;

$(function() {
    sort_items();
    $('#stock-content').html(show_stock_content());
});

function sort_items() {    
    var date = function(a, b) {
        return new Date(b.last_trade) - new Date(a.last_trade);
    }

    var low_price = function(a, b) {
        return a.low_price < b.low_price ? -1 : a.low_price > b.low_price ? 1 : 0;
    }

    var high_price = function(a, b) {
        return a.low_price > b.low_price ? -1 : a.low_price < b.low_price ? 1 : 0;
    }

    var name = function(a, b) {
        return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
    }

    var click = function(a, b) {
        return a.click > b.click ? -1 : a.click < b.click ? 1 : 0;
    }

    cur_items = load_items;

    // category
    if(cur_category != "전체") {
        for(var idx = 0; idx < load_items.length; idx ++) {
            if(cur_category != load_items[idx].category) {
                cur_items.splice(idx, 1);
                idx -= 1;
            }
        }
    }
    // type
    if(cur_type != "전체") {
        for(var idx = 0; idx < load_items.length; idx ++) {
            if(cur_type != load_items[idx].type) {
                cur_items.splice(idx, 1);
                idx -= 1;
            }
        }
    }
    // size
    if(cur_size != "전체") {
        for(var idx = 0; idx < load_items.length; idx ++) {
            if(cur_size != load_items[idx].size) {
                cur_items.splice(idx, 1);
                idx -= 1;
            }
        }
    }
    // price
    if(cur_prices != "전체") {
        if(cur_prices > 400000) {
            for(var idx = 0; idx < load_items.length; idx ++) {
                if((cur_prices) > (load_items[idx].low_price*(1))) {
                    cur_items.splice(idx, 1);
                    idx -= 1;
                }
            }
        }
        else {
            for(var idx = 0; idx < load_items.length; idx ++) {
                if((cur_prices - 100000) > (load_items[idx].low_price*(1)) || 
                   (cur_prices) < (load_items[idx].low_price*(1))) {
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

function show_stock_category() {
    var category = ["모든 브랜드", "에어조던", "나이키", "아디다스", "다른 브랜드", "콜라보", "명품"];
    var html = ``;
    for(var idx = 0; idx < category.length; idx ++) {
        html += `<div class="row" id="stock-tag">`;

        if(cur_category === "전체") {
            if(idx === 0) { html += `<button id="filter-category-selected" type="button" class="btn btn-outline-dark">${category[idx]}</button>`; }
            else { html += `<button id="filter-category" type="button" class="btn btn-outline-dark">${category[idx]}</button>`; }
        }
        else {
            if(cur_category === category[idx]) { html += `<button id="filter-category-selected" type="button" class="btn btn-outline-dark">${category[idx]}</button>`; }
            else { html += `<button id="filter-category" type="button" class="btn btn-outline-dark">${category[idx]}</button>`; }
        }

        html += `</div>`;
    }
    return html;
}

function show_stock_types() {
    var types = ["전체", "남자", "여자", "아동"];
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>종류</h4></div>`;
    for(var idx = 0; idx < types.length; idx ++) {
        html += `<div class="row" id="stock-category">`;

        if(cur_type == types[idx]) { html += `<button id="filter-tag-selected" type="button" class="btn btn-light">${types[idx]}</button>`; }
        else { html += `<button id="filter-tag" type="button" class="btn btn-light">${types[idx]}</button>`; }
            
        html += `</div>`;
    }
    return html;
}

function show_stock_sizes() {
    var sizes = [];
    for(var size = 200; size <= 300; size += 5) {
        sizes.push(size);
    }
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>사이즈</h4></div>`;
    html += `<div class="row" id="stock-category">`;
    for(var idx = 0; idx < sizes.length; idx ++) {
        html += `<div class="col-md-4 col-sm-6" id="nopadding">`;
        
        if(cur_size == sizes[idx]) { html += `<button id="filter-tag-selected" type="button" class="btn btn-light">${sizes[idx]}</button>`; }
        else { html += `<button id="filter-tag" type="button" class="btn btn-light">${sizes[idx]}</button>`; }
        
        html += `</div>`;
    }
    html += `</div>`;
    return html;
}

function show_stock_prices() {
    var prices = ["~ 100000", "~ 200000", "~ 300000", "~ 400000", "400000 ~ "];
    var html = ``;
    html += `<div class="row" id="stock-category"><h4>가격</h4></div>`;
    for(var idx = 0; idx < prices.length; idx ++) {
        html += `<div class="row" id="stock-category">`;
        
        if(cur_prices == prices[idx]) { html += `<button id="filter-tag-selected" type="button" class="btn btn-light">${prices[idx]}</button>`; }
        else { html += `<button id="filter-tag" type="button" class="btn btn-light">${prices[idx]}</button>`; }


        html += `</div>`;
    }
    return html;
}

function show_stock_items() {
    var html = ``;
    for(var idx = 0; idx < cur_items.length; idx ++) {
        const cur_date = new Date(cur_items[idx].last_trade);
        const year = cur_date.getFullYear();
        var month = cur_date.getMonth();
        const day = cur_date.getDate();
        if((month*1) < 10) {
            var temp = month;
            month = "0";
            month = month + temp;
        }

        html += `
        <div class="col-xl-3 col-md-4 col-sm-6 col-12">
            <a href="#">
                <div id="stock-card" class="card">
                        <img src="${cur_items[idx].img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cur_items[idx].title}</h5>
                        <p class="card-text">최저가 ${cur_items[idx].low_price}</p>
                        <p>최근거래 ${year}-${month}-${day}</p>
                    </div>
                </div>
            </a>
        </div>
        `;
    }
    return html;
}

function add_filter() {
    var filters = [];
    if(cur_category != "전체") { filters.push(cur_category); }
    if(cur_type != "전체") { filters.push(cur_type); }
    if(cur_size != "전체") { filters.push(cur_size); }
    if(cur_prices != "전체") { filters.push(cur_prices); }

    var html = ``;
    for(var idx = 0; idx < filters.length; idx ++) {
        html += `<a id="filter-btn" class="btn btn-secondary" href="#" role="button">${filters[idx]} X</a>`;
    }
    return html;
}

function show_stock_content() {
    var html = ``;
    html += `
    <div class="col-sm-2 col-4">
        <div class="col">`;
    html += show_stock_category();
    html += `
        </div>
        <div class="col" id="stock-div">`;
    html += show_stock_types();
    html += `
        </div>
        <div class="col" id="stock-div">`;
    html += show_stock_sizes();
    html += `
        </div>
        <div class="col" id="stock-div">`;
    html += show_stock_prices();
    html += `
        </div>
    </div>
    <div class="col-10">
        <div class="row justify-content-between">
            <div class="col" style="margin-left: 10px;">
                <a class="btn btn-outline-secondary" href="#" role="button">전체 필터 해제</a>`;
    html += add_filter();
    html += `
            </div>
            
            <div class="dropdown" style="margin-right: 10px;">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    최신 거래순
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">최신 거래순</a>
                    <a class="dropdown-item" href="#">낮은 가격순</a>
                    <a class="dropdown-item" href="#">높은 가격순</a>
                    <a class="dropdown-item" href="#">이름순</a>
                    <a class="dropdown-item" href="#">조회순</a>
                </div>
            </div>
        </div>
        
        <div class="row" style="margin-top: 15px;">`;
    if(cur_items.length === 0) { html += `<div class="col justify-content-center" id="noItem">찾으려는 상품이 없습니다. 다른 조건을 적용해 주세요.</div>`; }
    else {
    html += show_stock_items();
    html += `
        </div>

    <div class="row justify-content-center">
        <nav>
            <ul id="page-nav" class="pagination">
                <li class="page-item">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">&laquo;</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item" aria-current="page">
                <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#">&raquo;</a>
                </li>
            </ul>
        </nav>
    </div>
    `;
    }

    return html;
}