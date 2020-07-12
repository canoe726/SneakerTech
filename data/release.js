var site_page = [
    {
        country : "국내",
        month : "6월",
        date : "12일",
        img : "../public/image/nike4.jpg",
        title : "조던 1",
        content : "조던 1 레트로",
        url : "https://www.nike.com/kr/launch/?type=feed",
        page : "NIKE KOREA",
        clicked : 50,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "국내",
        month : "6월",
        date : "14일",
        img : "../public/image/nike4.jpg",
        title : "조던 2",
        content : "조던 2 레트로",
        url : "https://www.kasina.co.kr/main/html.php?htmid=proc/datedrop.html",
        page : "KASINA",
        clicked : 20,
    },
    {
        country : "해외",
        month : "6월",
        date : "13일",
        img : "../public/image/nike4.jpg",
        title : "조던 3",
        content : "조던 3 레트로",
        url : "https://launches.endclothing.com/",
        page : "END",
        clicked : 40,
    },
    {
        country : "해외",
        month : "6월",
        date : "15일",
        img : "../public/image/nike4.jpg",
        title : "조던 4",
        content : "조던 4 레트로",
        url : "https://www.shinzo.paris/en/184-coming-soon",
        page : "SHINZO",
        clicked : 30,
    },
    {
        country : "해외",
        month : "6월",
        date : "11일",
        img : "../public/image/nike5.jpg",
        title : "조던 5",
        content : "조던 5 레트로",
        url : "https://bdgastore.com/blogs/upcoming-releases",
        page : "Bodega",
        clicked : 10,
    },
    {
        country : "해외",
        month : "6월",
        date : "11일",
        img : "../public/image/nike5.jpg",
        title : "조던 5",
        content : "조던 5 레트로",
        url : "https://bdgastore.com/blogs/upcoming-releases",
        page : "Bodega",
        clicked : 10,
    },
    {
        country : "해외",
        month : "6월",
        date : "11일",
        img : "../public/image/nike5.jpg",
        title : "조던 5",
        content : "조던 5 레트로",
        url : "https://bdgastore.com/blogs/upcoming-releases",
        page : "Bodega",
        clicked : 10,
    },
    {
        country : "해외",
        month : "6월",
        date : "11일",
        img : "../public/image/nike5.jpg",
        title : "조던 5",
        content : "조던 5 레트로",
        url : "https://bdgastore.com/blogs/upcoming-releases",
        page : "Bodega",
        clicked : 10,
    },
    {
        country : "해외",
        month : "6월",
        date : "11일",
        img : "../public/image/nike5.jpg",
        title : "조던 5",
        content : "조던 5 레트로",
        url : "https://bdgastore.com/blogs/upcoming-releases",
        page : "Bodega",
        clicked : 10,
    },
];

var domestic_site = [];
var international_site = [];

var item = 12;
var cur_page = 1;
var category = "all";
var sorted = "date";

$(function() {
    $('#drop-category').html(dropCategory());
    $('#drop-sort').html(dropSort());
    $('#release').html(releaseCard());
    $('#page-nav').html(pageNav());
});

function dropCategory() {
    var html = ``;
    var idx = -1;
    if(category === "all") { idx = 0; }
    else if(category === "domestic") { idx = 1; }
    else if(category === "international") { idx = 2; }

    var cur_category = ["전체", "국내", "해외"];
    
    html += `
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${cur_category[idx]}
    </a>
    
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" href="#">전체</a>
        <a class="dropdown-item" href="#">국내</a>
        <a class="dropdown-item" href="#">해외</a>
    </div>
    `;

    return html;
}

function dropSort() {
    var html = ``;
    var idx = -1;
    if(sorted === "date") { idx = 0; }
    else if(sorted === "name") { idx = 1; }
    else if(sorted === "click") { idx = 2; }

    var cur_sorted = ["날짜순", "이름순", "조회순"];
    
    html += `
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${cur_sorted[idx]}
    </a>
    
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" href="#">날짜순</a>
        <a class="dropdown-item" href="#">이름순</a>
        <a class="dropdown-item" href="#">조회순</a>
    </div>
    `;

    return html;
}

function releaseCard() {
    var html = ``;
    var start_idx = (cur_page - 1) * item;
    
    // split country
    if(category === "domestic") {
        for(var idx = 0; idx < site_page.length; idx ++) {
            if(site_page[idx].country === "국내") { domestic_site.push(site_page[idx]); }
        }
    }

    if(category === "international") {
        for(var idx = 0; idx < site_page.length; idx ++) {
            if(site_page[idx].country === "해외") { international_site.push(site_page[idx]); }
        }
    }

    // sorted object
    if(sorted === "date") {
        if(category === "domestic") {
            domestic_site.sort(function(a, b) {
                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
            });
        }
        else if (category === "international") {
            international_site.sort(function(a, b) {
                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
            });
        }
        else if (category === "all") {
            site_page.sort(function(a, b) {
                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
            });
        }
    }
    else if(sorted === "name") {
        if(category === "domestic") {
            domestic_site.sort(function(a, b) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            });
        }
        else if (category === "international") {
            international_site.sort(function(a, b) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            });
        }
        else if (category === "all") {
            site_page.sort(function(a, b) {
                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
            });
        }
    }
    else if(sorted === "click") {
        if(category === "domestic") {
            domestic_site.sort(function(a, b) {
                return a.clicked > b.clicked ? -1 : a.clicked < b.clicked ? 1 : 0;
            });
        }
        else if (category === "international") {
            international_site.sort(function(a, b) {
                return a.clicked > b.clicked ? -1 : a.clicked < b.clicked ? 1 : 0;
            });
        }
        else if (category === "all") {
            site_page.sort(function(a, b) {
                return a.clicked > b.clicked ? -1 : a.clicked < b.clicked ? 1 : 0;
            });
        }
    }

    // show object
    if(category === "domestic") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= domestic_site.length) { break; }
            html += `
            <div id="release-card" class="card">
                <div class="top-left" style="position: absolute; top: 12px; left: 20px;"><h2>${domestic_site[idx].month}</h2>${domestic_site[idx].date}</div>
                <a target="_blank" rel="noopener noreferrer" href="${domestic_site[idx].url}">
                    <img src="${domestic_site[idx].img}" class="card-img-top" alt="...">
                </a>
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title">${domestic_site[idx].title}</h5>
                    <p class="card-text">${domestic_site[idx].content}</p>
                    <a id="origin-page" target="_blank" rel="noopener noreferrer" href="${domestic_site[idx].url}" class="btn btn-primary">${domestic_site[idx].page}</a>
                </div>
            </div>
            `;
        }
    }

    if(category === "international") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= international_site.length) { break; }
            html += `
            <div id="release-card" class="card">
                <div class="top-left" style="position: absolute; top: 12px; left: 20px;"><h2>${international_site[idx].month}</h2>${international_site[idx].date}</div>
                <a target="_blank" rel="noopener noreferrer" href="${international_site[idx].url}">
                    <img src="${international_site[idx].img}" class="card-img-top" alt="...">
                </a>
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title">${international_site[idx].title}</h5>
                    <p class="card-text">${international_site[idx].content}</p>
                    <a id="origin-page" target="_blank" rel="noopener noreferrer" href="${international_site[idx].url}" class="btn btn-primary">${international_site[idx].page}</a>
                </div>
            </div>
            `;
        }
    }

    console.log(site_page[0].img)

    if(category === "all") {
        for(var idx = start_idx; idx < start_idx + item; idx ++) {
            if(idx >= site_page.length) { break; }
            html += `
            <div id="release-card" class="card">
                <div class="top-left" style="position: absolute; top: 12px; left: 20px;"><h2>${site_page[idx].month}</h2>${site_page[idx].date}</div>
                <a target="_blank" rel="noopener noreferrer" href="${site_page[idx].url}">
                    <img src="${site_page[idx].img}" class="card-img-top" alt="...">
                </a>
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title">${site_page[idx].title}</h5>
                    <p class="card-text">${site_page[idx].content}</p>
                    <a id="origin-page" target="_blank" rel="noopener noreferrer" href="${site_page[idx].url}" class="btn btn-primary">${site_page[idx].page}</a>
                </div>
            </div>
            `;
        }
    }

    return html;
}

function pageNav() {
    var total_page;
    console.log((international_site.length % item));
    if(category === "domestic") {
        if((domestic_site.length % item) == 0) { total_page = (domestic_site.length / item); }
        else { total_page = (domestic_site.length / item) + 1; }
    }
    else if(category === "international") {
        if((international_site.length % item) == 0) { total_page = (international_site.length / item); }
        else { total_page = (international_site.length / item) + 1; }
    }
    else if(category === "all") {
        if((site_page.length % item) == 0) { total_page = (site_page.length / item); }
        else { total_page = (site_page.length / item) + 1; }
    }

    var html = `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">이전</a></li>`;

    for(var idx = 1; idx <= total_page; idx ++) {
        if(cur_page === idx) {
            html += `<li class="page-item active"><a class="page-link" href="./page/` + idx + `">` + idx + `</a></li>`;
        }
        else {
            html += `<li class="page-item"><a class="page-link" href="./page/">` + idx + `</a></li>`;
        }
    }
    html += `
            <li class="page-item"><a class="page-link" href="#">다음</a></li>
        </ul>
    </nav>
    `;

    return html;
}
