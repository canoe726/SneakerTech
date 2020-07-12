var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var sites_template = require('../lib/sites-template.js');

var page_title = "Sites";

var import_script = `
<script src="/socket.io/socket.io.js"></script>
<script src="/js/sites.js"></script>
`;

router.get('/', function(request, response) {
    var html = template.HTML(
        page_title,
        template.MENU(["","","","active"]),     
        sites_template.SITE_LIST(),
        import_script
    );
    response.send(html);
});

module.exports = router;
