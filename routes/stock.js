var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var stock_template = require('../lib/stock-template.js');
var path = require('path');
var db = require('../lib/db');

var page_title = "";
var stock_items;
db.query('SELECT * FROM stock_info', function (error, results, fields) {
    if (error) {
        console.log(error);
    };
    stock_items = results;
});

var import_script = `
<script src="/socket.io/socket.io.js"></script>
<script src="/js/stock.js"></script>
`;

router.get('/', function(request, response) {
    page_title = "Stock";

    var html = template.HTML(
        page_title,
        template.MENU(["","","active",""]),     
        stock_template.SHOW_STOCK_CONTENT(stock_items, "all", "all", "all", "date", 1),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId/type/:typeId/price/:priceId/sort/:sortId/', function(request, response) {
    page_title = "Stock";

    var page_num = path.parse(request.params.pageNum).base;
    var category_param = path.parse(request.params.categoryId).base;
    var type_param = path.parse(request.params.typeId).base;
    var price_param = path.parse(request.params.priceId).base;
    var sort_param = path.parse(request.params.sortId).base;

    var html = template.HTML(
        page_title,
        template.MENU(["","","active",""]),     
        stock_template.SHOW_STOCK_CONTENT(stock_items, category_param, type_param, price_param, sort_param, page_num),
        import_script
    );
    response.send(html);
});

router.get('/:pageNum/category/:categoryId/type/:typeId/price/:priceId/sort/:sortId/search/:searchId', function(request, response) {
    page_title = "Stock";

    var page_num = path.parse(request.params.pageNum).base;
    var category_param = path.parse(request.params.categoryId).base;
    var type_param = path.parse(request.params.typeId).base;
    var price_param = path.parse(request.params.priceId).base;
    var sort_param = path.parse(request.params.sortId).base;
    var search_param = path.parse(request.params.searchId).base;

    var html = template.HTML(
        page_title,
        template.MENU(["","","active",""]),     
        stock_template.SHOW_STOCK_CONTENT(stock_items, category_param, type_param, price_param, sort_param, page_num),
        import_script
    );
    response.send(html);
});

router.get('/:sneakerId', function(request, response) {
    page_title = "Chart";
    
    var sneaker_param = path.parse(request.params.sneakerId).base;
    sneakerIdParameter = sneaker_param;

    var query = 'SELECT * FROM stock_chart_info WHERE title = "' + sneakerIdParameter + '" ORDER BY last_trade DESC';
    db.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
        };

        var all_size = [];
        for(var i=0; i<results.length; i++) {
            all_size.push(results[i].size);
        }
        
        var able_size = all_size.reduce(function(a, b) {
            if(a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        able_size = able_size.sort();

        sizeIdParameter = undefined;

        page_title = "Chart";

        var html = template.HTML(
        page_title,
        template.MENU(["","","active",""]), 
        stock_template.SHOW_SNEAKER_CHART(sneaker_param, undefined, able_size),
        `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/locale/ko.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>
        <script src="/socket.io/socket.io.js"></script>  
        <script src="/js/stock-chart.js"></script>
        `
        );
        response.send(html);
    });
});

router.get('/:sneakerId/:sizeId', function(request, response) {
    var sneaker_param = path.parse(request.params.sneakerId).base;
    var size_param = path.parse(request.params.sizeId).base;
    sneakerIdParameter = sneaker_param;
    sizeIdParameter = size_param;

    page_title = "Chart";

    var query = 'SELECT * FROM stock_chart_info WHERE title = "' + sneakerIdParameter + '" ORDER BY last_trade DESC';
    db.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
        };

        var all_size = [];
        for(var i=0; i<results.length; i++) {
            all_size.push(results[i].size);
        }
        
        var able_size = all_size.reduce(function(a, b) {
            if(a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        able_size = able_size.sort();

        var html = template.HTML(
        page_title,
        template.MENU(["","","active",""]), 
        stock_template.SHOW_SNEAKER_CHART(sneaker_param, size_param, able_size),
        `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/locale/ko.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>
        <script src="/socket.io/socket.io.js"></script>  
        <script src="/js/stock-chart.js"></script>
        `
        );
        response.send(html);
    });
});

module.exports = router;