var show_items = 10;
var cur_show_items = 0;

$(function() {
    get_chart_data();
});

function get_chart_data() {
    var socket = io();
    socket.on('chart-data', function(data) {
        // chart
        var datas = [];
        for(var idx = 0; idx < data.length; idx ++) {
            var trade_date;
            var date = new Date(data[idx].last_trade);
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();

            if(month < 10) { month = "0" + month; }
            if(day < 10) { day = "0" + day; }
            if(hours < 10) { hours = "0" + hours; }
            if(minutes < 10) { minutes = "0" + minutes; }

            trade_date = year + "-" + month + "-" + day + " " + hours + ":" + minutes;

            datas.push(
                {
                    x:trade_date,
                    y:data[idx].price
                }
            );
        }
        var chart_data = [
            {
                "label": data[0].title + " 리셀가",
                "data": datas,
                "borderColor": ["rgba(130, 255, 99, 1.0)"],
                "backgroundColor": ["rgba(153, 255, 153, 0.5)"],
                "fill": true,
                "lineTension": 0
            }
        ];

        show_sneaker_chart(chart_data, data[0].last_trade, 7, 'day');

        // table
        var table_data = [];
        for(var idx = 0; idx < data.length; idx ++) {
            table_data.push(
                {
                    site:data[idx].site,
                    site_url:data[idx].site_url,
                    size:data[idx].size,
                    price:data[idx].price,
                    update:data[idx].last_trade
                }
            );
        }

        $('#stock-link-table').html(show_link_table(table_data));
    });

    socket.on('summary-data', function(data) {
        $('#stock-summary-table').html(show_summary_table(data));
    });
}

function get_yyyymmdd(data) {
    var cur_date = new Date(data);

    var year = cur_date.getUTCFullYear();
    var month = cur_date.getUTCMonth() + 1;
    var day = cur_date.getUTCDate();

    if(month < 10) { month = "0" + month; }
    if(day < 10) { day = "0" + day; }

    return year + "-" + month + "-" + day;
}

function show_link_table(table_data) {
    var link_th = ["사이트", "가격", "사이즈", "업로드"];

    
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
        <tbody id="stock-table">`;
    for(var idx = 0; idx < show_items; idx ++) {
        if(idx >= table_data.length) {
            $('#load-more').hide();
            break;
        }
        var date = get_yyyymmdd(table_data[idx].update);

        html += `<tr>`;
        html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].site}</a></td>`;
        html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].price}</a></td>`;
        html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].size}</a></td>`;
        html += `<td><a target="_blank" href="${table_data[idx].site_url}">${date}</a></td>`;
        html += `</tr>`;
    }
    html += ` 
        </tbody>
    </table>
    `;

    document.getElementById("load-more").addEventListener('click', function() {
        cur_show_items += show_items;
        var html = ``;
        for(var idx = 0; idx < show_items + cur_show_items; idx ++) {
            if(idx >= table_data.length || idx > 50) {
                $('#load-more').hide();
                break;
            }
            var date = get_yyyymmdd(table_data[idx].update);
    
            html += `<tr>`;
            html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].site}</a></td>`;
            html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].price}</a></td>`;
            html += `<td><a target="_blank" href="${table_data[idx].site_url}">${table_data[idx].size}</a></td>`;
            html += `<td><a target="_blank" href="${table_data[idx].site_url}">${date}</a></td>`;
            html += `</tr>`;
        }
        
        $('#stock-table').html(html);
    });
    
    return html;
}

function show_summary_table(data) {
    var summary_th = ["# 누적 매물", "출시가", "프리미엄 %", "평균 리셀가"];
    var summary_td = data;

    var html = ``;

    html += `
    <table class="table table-bordered">
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
    html += `<td>${summary_td[0].num_of_item}</td>`;
    html += `<td>${summary_td[0].release_price}</td>`;
    html += `<td>${summary_td[0].premium_percent}</td>`;
    html += `<td>${summary_td[0].average_cost}</td>`;
    html += `
            </tr>
        </tbody>
    </table>
    `;

    return html;
}

function show_sneaker_chart(data, last_date, chart_day_range, day_tick) {
    var min_datetime = moment(last_date);
    min_datetime = min_datetime.subtract(chart_day_range, "days");
    min_datetime = min_datetime.format('YYYYMMDD');

    var max_datetime = moment(last_date);
    max_datetime = max_datetime.format('YYYYMMDD');

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

        var min_datetime = moment(last_date);
        min_datetime = min_datetime.subtract(7, "days");
        min_datetime = min_datetime.format('YYYYMMDD');

        set.min = min_datetime;
        set.ticks = 'day';
        stockChart.update();
    });

    document.getElementById("update-month").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;

        var min_datetime = moment(last_date);
        min_datetime = min_datetime.subtract(30, "days");
        min_datetime = min_datetime.format('YYYYMMDD');

        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-three-month").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;

        var min_datetime = moment(last_date);
        min_datetime = min_datetime.subtract(90, "days");
        min_datetime = min_datetime.format('YYYYMMDD');

        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-half").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;

        var min_datetime = moment(last_date);
        min_datetime = min_datetime.subtract(180, "days");
        min_datetime = min_datetime.format('YYYYMMDD');

        set.min = min_datetime;
        set.ticks = 'week';
        stockChart.update();
    });

    document.getElementById("update-year").addEventListener('click', function() {
        var set = stockChart.config.options.scales.xAxes[0].ticks;

        var min_datetime = moment(last_date);
        min_datetime = min_datetime.subtract(365, "days");
        min_datetime = min_datetime.format('YYYYMMDD');
        
        set.min = min_datetime;
        set.ticks = 'month';
        stockChart.update();
    });
}