$(function() {
   // get_draw_data();
});

function get_draw_data() {
    var socket = io();
    socket.on('draw-data', function(data) {

        var ddaytimer = setInterval(function() {
            tick_timer(data[0])
        }, 1000);
    });
}

function tick_timer(data) {
    var timer = document.querySelectorAll(".d-day-timer");

    var d_day = moment(data.time, 'YYYY-MM-DD HH:mm');
    console.log(d_day);
    var cur_day = moment();

    var diffTime = {
        day: moment.duration(d_day.diff(cur_day)).days(),
        hour: moment.duration(d_day.diff(cur_day)).hours(),
        minute: moment.duration(d_day.diff(cur_day)).minutes(),
        second: moment.duration(d_day.diff(cur_day)).seconds(),
    }

    for(var idx = 0; idx < timer.length; idx ++) {
        timer[idx].innerHTML = `${diffTime.day} 일 : ${diffTime.hour} 시간 : ${diffTime.minute} 분 : ${diffTime.second} 초`;
    }
}