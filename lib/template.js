module.exports = {    
    HTML: function(title, tab, contents, script) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${title}</title>
                <link rel="stylesheet" href="/css/style.css">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap" rel="stylesheet">
            </head>
            <body>
                <div class="container-fluid" id="fixed-navbar">
                    <!-- Menu -->
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <!-- BRAND -->
                        <a class="navbar-brand" id="brand-link" href="/">Sneaker x Tech</a>
                        <!-- MENU -->
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav mr-auto">
                                ${tab}
                            </ul>
                            <!-- SEARCH -->
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </div>

                <div class="browse-wrapper">
                    ${contents}
                </div>

                <div class="container-fluid" id="footer">
                    <div class="row justify-content-center">
                        <div class="col-xl-3 col-md-6 col-6">
                            <li class="title">최신 업데이트</li>
                            <li><a href="#">덩크SB로우 레드</a></li>
                            <li><a href="#">조던1 트래비스스캇</a></li>
                            <li><a href="#">이지부스트700</a></li>
                        </div>
                        <div class="col-xl-3 col-md-6 col-6">
                            <li class="title">최대 클릭</li>
                            <li><a href="#">조던1 범고래</a></li>
                            <li><a href="#">조던1 피고래</a></li>
                            <li><a href="#">이지부스트350 블랙</a></li>
                        </div>
                        <div class="col-xl-3 col-md-6 col-6">
                            <li class="title">조던</li>
                            <li><a href="#">조던1</a></li>
                            <li><a href="#">조던4</a></li>
                            <li><a href="#">조던8</a></li>
                        </div>
                        <div class="col-xl-3 col-md-6 col-6">
                            <li class="title">이지부스트</li>
                            <li><a href="#">이지부스트350</a></li>
                            <li><a href="#">이지부스트500</a></li>
                            <li><a href="#">이지부스트700</a></li>
                        </div>
                    </div>
                </div>

                <div class="container-fluid" id="footer-bottom">
                    <div class="row justify-content-around">
                        <div class="col-6">
                            CONTACT
                        </div>
                        <div class="col-6">
                            canoe918@gmail.com
                        </div>
                    </div>
                </div>

                <span id="scrollUp"></span>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="http://code.jquery.com/jquery-latest.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
                <script src="/js/index.js"></script>
                ${script}
            </body>
        </html>
        `;
    },
    MENU: function(active) {
        return `
        <li class="nav-item ${active[0]}">
            <a class="nav-link" href="/page/release">Release</a>
        </li>
        <li class="nav-item ${active[1]}">
            <a class="nav-link" href="/page/draw">Draw</a>
        </li>
        <li class="nav-item ${active[2]}">
            <a class="nav-link" href="/page/stock">Stock</a>
        </li>
        <li class="nav-item ${active[3]}">
            <a class="nav-link" href="/page/sites">Sites</a>
        </li>
        `;
    }
}
