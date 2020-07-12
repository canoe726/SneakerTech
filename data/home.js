var release_info_summary = [
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
];

var domestic_site = [];
var international_site = [];

var item = 12;
var cur_page = 1;
var category = "all";
var sorted = "date";

$(function() {
    $('#release').html(summary_release_gallery());
    $('#draw').html(summary_draw_gallery());
});

function summary_release_gallery() {
    var html = ``;
    for(var idx = 0; idx < release_info_summary.length; idx ++) {
        html += `
        <div id="release-card" class="card">
            <div class="top-left" style="position: absolute; top: 12px; left: 20px;"><h2>6월</h2>15일</div>
            <a target="_blank" rel="noopener noreferrer" href="#">
                <img src="../public/image/nike1.jpg" class="card-img-top" alt="...">
            </a>
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title">조던</h5>
                <p class="card-text">레트로</p>
                <a id="origin-page" target="_blank" rel="noopener noreferrer" href="#" class="btn btn-primary">NIKE</a>
            </div>
        </div>
        `;
    }
    return html;
}

function summary_draw_gallery() {
    var html = ``;
    for(var idx = 0; idx < release_info_summary.length; idx ++) {
        html += `
        <div id="release-card" class="card">
            <div class="top-left" style="position: absolute; top: 12px; left: 20px;"><h2>6월</h2>15일</div>
            <a target="_blank" rel="noopener noreferrer" href="#">
                <img src="../public/image/nike1.jpg" class="card-img-top" alt="...">
            </a>
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title">조던</h5>
                <p class="card-text">레트로</p>
                <a id="origin-page" target="_blank" rel="noopener noreferrer" href="#" class="btn btn-primary">NIKE</a>
            </div>
        </div>
        `;
    }
    return html;
}