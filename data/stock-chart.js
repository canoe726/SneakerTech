var load_data = [
    {
        "label": "평균 리셀가",
        "data": [
            {
                "y":130000,
                "x":"2020-03-18T06:18"
            },
            {
                "y":100000,
                "x":"2020-05-18T09:18"   
            },
            {
                "y":110000,
                "x":"2020-06-18T20:18"   
            },
            {
                "y":150000,
                "x":"2020-06-19T15:18"   
            },
            {
                "y":180000,
                "x":"2020-06-21T06:18"   
            },
            {
                "y":130000,
                "x":"2020-06-21T13:18"  
            }
        ],
        "borderColor": ["rgba(130, 255, 99, 1.0)"],
        "backgroundColor": ["rgba(153, 255, 153, 0.5)"],
        "fill": true,
        "lineTension": 0
    }
];

var chart_title = "에어조던 1 낫포리세일 (NotForReSale)";
var cur_size = 225;

var summary_th = ["# 누적 매물", "출시가", "프리미엄 %", "평균 리셀가"];
var summary_td = ["232", "199,000", "35%", "215,000"];

$(function() {
    $('#chart-title').html(show_chart_title());
    $('#chart-size').html(show_size_tag());
    $('#stock-summary-table').html(show_summary_table());
    $('#stock-link-table').html(show_link_table());
    show_chart(load_data, 7, 'day');
    console.log(typeof(load_data));
    console.log((load_data));
});

function show_link_table() {
    var link_th = ["사이트", "가격", "사이즈", "업로드"];
    var link_td = [
        {
            "site":"번개장터",
            "price":170000,
            "size":225,
            "update":"2020-06-23"
        },
        {
            "site":"중고나라",
            "price":230000,
            "size":225,
            "update":"2020-06-21"
        },
        {
            "site":"번개장터",
            "price":180000,
            "size":225,
            "update":"2020-06-20"
        },
    ];
    
    var html = ``;

    html += `
    <table class="table">
        <thead>
            <tr>`;
    for(var idx = 0; idx < link_th.length; idx ++) {
        html += `<th scope="col">${link_th[idx]}</th>`;
    }
    html += `
            </tr>
        </thead>
        <tbody>`;
    for(var idx = 0; idx < link_td.length; idx ++) {
        html += `<tr>`;
        html += `<td><a href="#">${link_td[idx].site}</a></td>`;
        html += `<td><a href="#">${link_td[idx].price}</a></td>`;
        html += `<td><a href="#">${link_td[idx].size}</a></td>`;
        html += `<td><a href="#">${link_td[idx].update}</a></td>`;
        html += `</tr>`;
    }
    html += ` 
        </tbody>
    </table>
    `;
    
    return html;
}

function show_summary_table() {
    var html = ``;

    html += `
    <table class="table">
        <thead>
            <tr>`;
    for(var idx = 0; idx < summary_th.length; idx ++) {
        html += `<th scope="col">${summary_th[idx]}</th>`;
    }
    html += `
            </tr>
        </thead>
        <tbody>
            <tr>`;
    for(var idx = 0; idx < summary_td.length; idx ++) {
        html += `<td>${summary_td[idx]}</td>`;
    }
    html += `
            </tr>
        </tbody>
    </table>
    `;

    return html;
}

function show_size_tag() {
    var size = [];
    for(var idx = 200; idx <= 300; idx += 5) {
        size.push({
            "size":idx,
            "activate":true
        });
    }

    var html = ``;

    html += `
    <h4 id="size-tag">사이즈</h4>
        <div id="size-dropdown" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${cur_size}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">전체</a>`;

    for(var idx = 0; idx < size.length; idx ++) {
        var able = "";
        if(size[idx].activate === false) { able = "disabled"; }

        if(size[idx].size === cur_size) { html += `<a class="dropdown-item active" href="#">${size[idx].size}</a>`; }
        else { html += `<a class="dropdown-item ${able}" href="#">${size[idx].size}</a>`; }
    }
            
    html += `
            </div>
        </div>
    `;

    return html;
}

function show_chart_title() {
    return `
    <h2>${chart_title}</h2>
    `;
}

function show_chart(data, chart_day_range, day_tick) {
    var average = 200000;

    var min_datetime = new Date();
    min_datetime.setDate(min_datetime.getDate() - chart_day_range);
    min_datetime = moment(min_datetime).format('YYYYMMDD');

    var max_datetime = new Date();
    max_datetime = moment(max_datetime).format('YYYYMMDD');

    var ctx = document.getElementById('stock-chart');
    var cfg = {
        type: 'line',
        data: {
            datasets: data,
        },
        options: {
            responsive: true,
            tooltips: {
                axis:'y',
                mode: 'y',
                intersect: true,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
				animation: {
					duration: 0
				},
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '날짜'
                    },
                    type:'time',
                    ticks: {
                        min: min_datetime,
                        max: max_datetime,
                        unit: day_tick,
                        autoSkip: true,
                        autoSkipPadding: 75,
                        maxRotation: 0,
                        sampleSize: 100
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: average + 50000,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '가격'
                    }
                }]
            }
        }
    };

    var stockChart = new Chart(ctx, cfg);

    document.getElementById("update-week").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;
        var min_datetime = new Date();
        min_datetime.setDate(min_datetime.getDate() - 7);
        min_datetime = moment(min_datetime).format('YYYYMMDD');
        set.min = min_datetime;
        set.ticks = 'day';
        stockChart.update();
    });

    document.getElementById("update-month").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;
        var min_datetime = new Date();
        min_datetime.setDate(min_datetime.getDate() - 30);
        min_datetime = moment(min_datetime).format('YYYYMMDD');
        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-three-month").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;
        var min_datetime = new Date();
        min_datetime.setDate(min_datetime.getDate() - 90);
        min_datetime = moment(min_datetime).format('YYYYMMDD');
        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-half").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;
        var min_datetime = new Date();
        min_datetime.setDate(min_datetime.getDate() - 180);
        min_datetime = moment(min_datetime).format('YYYYMMDD');
        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-year").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;
        var min_datetime = new Date();
        min_datetime.setDate(min_datetime.getDate() - 365);
        min_datetime = moment(min_datetime).format('YYYYMMDD');
        set.min = min_datetime;
        set.ticks = 'month';
        stockChart.update();
    });
}