var draw_info = require('../public/json/draw.json');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.emit('draw-data', draw_info);
    
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

