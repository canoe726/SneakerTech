module.exports = function(io, db) {
    io.on('connection', function(socket){

        /*
        db.query('SELECT * FROM release_items', function (error, results, fields) {
            if (error) {
                console.log(error);
            };
            socket.emit('release-data', results);
        });
        */
    
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

