var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var draw_template = require('../lib/draw-template.js');
var path = require('path');

var page_title = "Draw";
var category = ["전체", "국내 온라인", "국내 오프라인", "해외"];
var category_idx = -1;
var sort = ["날짜순", "이름순", "조회순"];
var sort_idx = -1;

var draw_info;
var import_script = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="/socket.io/socket.io.js"></script>  
<script src="/js/draw.js"></script>
`;

var db = require('../lib/db');
db.query('SELECT * FROM draw_items', function (error, results, fields) {
    if (error) {
        console.log(error);
    };
    draw_info = results;
});

router.get('/', function(request, response) {
    var html = template.HTML(
        page_title,
        template.MENU(["","active","",""]),    
        draw_template.DRAW(1, "전체", "날짜순", draw_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum', function(request, response) {
    var page_num = path.parse(request.params.pageNum).base;

    var html = template.HTML(
        page_title,
        template.MENU(["","active","",""]),    
        draw_template.DRAW(page_num, "전체", "날짜순", draw_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId', function(request, response) {
    var category_param = path.parse(request.params.categoryId).base;

    if(category_param === "all") { category_idx = 0; }
    if(category_param === "domestic-online") { category_idx = 1; }
    if(category_param === "domestic-offline") { category_idx = 2; }
    if(category_param === "international") { category_idx = 3; }

    var html = template.HTML(
        page_title,
        template.MENU(["","active","",""]),   
        draw_template.DRAW(1, category[category_idx], "날짜순", draw_info),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId/sort/:sortId', function(request, response) {
    var page_num = path.parse(request.params.pageNum).base;
    var category_param = path.parse(request.params.categoryId).base;
    var sort_param = path.parse(request.params.sortId).base;

    console.log(category_param);

    if(category_param === "all") { category_idx = 0; }
    if(category_param === "domestic-online") { category_idx = 1; }
    if(category_param === "domestic-offline") { category_idx = 2; }
    if(category_param === "international") { category_idx = 3; }

    if(sort_param === "date") { sort_idx = 0; }
    if(sort_param === "name") { sort_idx = 1; }
    if(sort_param === "click") { sort_idx = 2; }

    var html = template.HTML(
        page_title,
        template.MENU(["","active","",""]),   
        draw_template.DRAW(page_num, category[category_idx], sort[sort_idx], draw_info),
        import_script
    );
    response.send(html);
});

module.exports = router;