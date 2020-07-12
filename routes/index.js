var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var index_template = require('../lib/index-template.js');

var page_title = "Sneaker x Tech";

var banner_image = require('../public/json/banner-images.json');
var index_card;
var release_info_summary = [];
var draw_info_summary = [];

var db = require('../lib/db');
db.query('SELECT * FROM release_items ORDER BY date DESC LIMIT 4', function (error, results, fields) {
    if (error) {
        console.log(error);
    };
    release_info_summary = results;
});

db.query('SELECT * FROM draw_items ORDER BY date DESC LIMIT 4', function (error, results, fields) {
    if (error) {
        console.log(error);
    };
    draw_info_summary = results;
});

router.get('/', function(request, response) {    
    var html = template.HTML(
        page_title,
        template.MENU(["","","",""]),
        index_template.HOME_CAROUSEL(banner_image) +
        index_template.SUMMARY_RELEASE_GALLERY(release_info_summary) + 
        index_template.SUMMARY_DRAW_GALLERY(draw_info_summary),
        `<script src="/js/home.js"></script>`
    );
    response.send(html);
});

module.exports = router;