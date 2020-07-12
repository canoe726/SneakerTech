$(function() {
    get_release_data();
});

function get_release_data() {
    var socket = io();
    socket.on('release-data', function(data) {
        console.log(data);
    });
}

