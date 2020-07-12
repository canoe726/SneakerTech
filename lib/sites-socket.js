module.exports = function(io, db) {
    io.on('connection', function(socket){

        db.query('SELECT * FROM site_list', function (error, results, fields) {
            if (error) {
                console.log(error);
            };
            socket.emit('sites-data', results);
        });
    
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

