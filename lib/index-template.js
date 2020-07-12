module.exports = {    
    HOME_CAROUSEL: function(banner_images) {
        return `
        <div id="index-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#index-carousel" data-slide-to="0" class="active"></li>
                <li data-target="#index-carousel" data-slide-to="1"></li>
                <li data-target="#index-carousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${banner_images[0].url}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${banner_images[1].url}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${banner_images[2].url}" class="d-block w-100" alt="...">
                </div>
            </div>
            <a class="carousel-control-prev" href="#index-carousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#index-carousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;
    },
    SUMMARY_RELEASE_GALLERY: function(release_info_summary) {
        var html = ``;
        html += `
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <div class="row" id="card-header-menu">              
                        <div class="col" style="text-align: start; margin-top: auto; margin-bottom: auto;">
                            <h2>Release</h2>
                        </div>
                        <div class="col" style="text-align: end; margin-top: auto; margin-bottom: auto;">
                            <a href="/page/release">View All</a>
                        </div>
                    </div>
                </div>
                <div class="row">`;
        
        for(var idx = 0; idx < release_info_summary.length; idx ++) {
            var cur_month = get_mm(release_info_summary[idx].date);
            var cur_date = get_dd(release_info_summary[idx].date);
            html += `
            <div id="card-content" class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div id="item-card" class="card">
                    <a target="_blank" rel="noopener noreferrer" href="${release_info_summary[idx].url}">
                        <div class="top-left"><h4>${cur_month}월</h4>${cur_date}일</div>
                            <img src="${release_info_summary[idx].image}" class="card-img-top" alt="...">
                        <div class="card-body" style="text-align: center;">
                            <h5 class="card-title">${release_info_summary[idx].title}</h5>
                            <p class="card-text">${release_info_summary[idx].content}</p>
                            <p class="card-text">출시가 199,000 &#8361</p>
                            <a id="hover-btn" target="_blank" rel="release-site" href="${release_info_summary[idx].url}" class="btn btn-primary">
                                <span>${release_info_summary[idx].page_title}</span>
                                <span>VIEW RELEASE</span>
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }

        html += `
                </div>
            </div>
        </div>
        `;
        return html;
    },
    SUMMARY_DRAW_GALLERY: function(draw_info_summary) {
        var html = ``;
        html += `
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <div class="row" id="card-header-menu">              
                        <div class="col" style="text-align: start; margin-top: auto; margin-bottom: auto;">
                            <h2>Draw</h2>
                        </div>
                        <div class="col" style="text-align: end; margin-top: auto; margin-bottom: auto;">
                            <a href="/page/draw">View All</a>
                        </div>
                    </div>
                </div>
                <div class="row">`;
        
        for(var idx = 0; idx < draw_info_summary.length; idx ++) {
            var cur_month = get_mm(draw_info_summary[idx].date);
            var cur_date = get_dd(draw_info_summary[idx].date);
            html += `
            <div id="card-content" class="col-lg-3 col-md-6 col-sm-6 col-12">
                <div id="item-card" class="card">
                    <a target="_blank" rel="noopener noreferrer" href="${draw_info_summary[idx].url}">
                        <div class="top-left"><h4>${cur_month}월</h4>${cur_date}일</div>
                            <img src="${draw_info_summary[idx].image}" class="card-img-top" alt="...">
                        <div class="card-body" style="text-align: center;">
                            <h5 class="card-title">${draw_info_summary[idx].title}</h5>
                            <p class="card-text">${draw_info_summary[idx].content}</p>
                            <p class="card-text">출시가 199,000 &#8361</p>
                            <a id="hover-btn" target="_blank" rel="release-site" href="${draw_info_summary[idx].url}" class="btn btn-primary">
                                <span>${draw_info_summary[idx].page_title}</span>
                                <span>ENTER DRAW</span>
                            </a>
                        </div>
                    </a>
                </div>
            </div>
            `;
        }

        html += `
                </div>
            </div>
        </div>
        `;
        return html;
    },
    SITE_LIST: function () {
        return `<div id="sites-list"></div>`;
    }
}

function get_mm(data) {
    var cur_date = new Date(data);
    var ret = cur_date.getUTCMonth() + 1;
    if(ret < 10) {
        ret = "0" + ret;
    }
    return ret;
}

function get_dd(data) {
    var cur_date = new Date(data);
    var ret = cur_date.getUTCDate();
    if(ret < 10) {
        ret = "0" + ret;
    }
    return ret;
}