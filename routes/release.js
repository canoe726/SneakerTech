var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var release_template = require('../lib/release-template.js');
var path = require('path');

var page_title = "Release";
var category = ["전체", "국내", "해외"];
var category_idx = -1;
var sort = ["날짜순", "이름순", "조회순"];
var sort_idx = -1;

var release_info;
var import_script = `
<script src="/socket.io/socket.io.js"></script>
<script src="/js/release.js"></script>
`;

var db = require('../lib/db');
db.query('SELECT * FROM release_items ORDER BY date DESC, title', function (error, results, fields) {
    if (error) {
        console.log(error);
    };
    release_info = results;

    var cur_date = new Date();
    var year = cur_date.getUTCFullYear();
    var month = cur_date.getUTCMonth() + 1;
    if(month < 10) { month = "0" + month; }
    var date = cur_date.getUTCDate();
    if(date < 10) { date = "0" + date; }

    release_info.push({
        "country":"국내",
        "date":year + "-" + month + "-" + date,
        "image":"/image/nike_logo.png",
        "title":"나이키 코리아 RELEASE",
        "content":"공식 홈페이지의 발매 정보를 알아보세요",
        "price":null,
        "url":"https://www.nike.com/kr/launch/?type=upcoming",
        "page_title":"NIKE 코리아",
        "clicked":"9999"
    });
});

router.get('/', function(request, response) {
    var html = template.HTML(
        page_title,
        template.MENU(["active","","",""]),
        release_template.RELEASE(1, "전체", "날짜순", release_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum', function(request, response) {
    var page_num = path.parse(request.params.pageNum).base;

    var html = template.HTML(
        page_title,
        template.MENU(["active","","",""]),
        release_template.RELEASE(page_num, "전체", "날짜순", release_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId', function(request, response) {
    var category_param = path.parse(request.params.categoryId).base;

    if(category_param === "all") { category_idx = 0; }
    if(category_param === "domestic") { category_idx = 1; }
    if(category_param === "international") { category_idx = 2; }
        
    var html = template.HTML(
        page_title,
        template.MENU(["active","","",""]),
        release_template.RELEASE(1, category[category_idx], "날짜순", release_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId/sort/:sortId', function(request, response) {
    var page_num = path.parse(request.params.pageNum).base;
    var category_param = path.parse(request.params.categoryId).base;
    var sort_param = path.parse(request.params.sortId).base;

    if(category_param === "all") { category_idx = 0; }
    if(category_param === "domestic") { category_idx = 1; }
    if(category_param === "international") { category_idx = 2; }
    
    if(sort_param === "date") { sort_idx = 0; }
    if(sort_param === "name") { sort_idx = 1; }
    if(sort_param === "click") { sort_idx = 2; }

    var html = template.HTML(
        page_title,
        template.MENU(["active","","",""]),
        release_template.RELEASE(page_num, category[category_idx], sort[sort_idx], release_info),
        import_script
    );
    response.send(html);
});

module.exports = router;