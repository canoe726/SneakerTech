module.exports = function(io, db) {
    io.on('connection', function(socket){
        if(sizeIdParameter !== undefined) {
            var query = 'SELECT * FROM stock_chart_info WHERE title = "' + sneakerIdParameter + '" AND size = ' + sizeIdParameter + '  ORDER BY last_trade DESC';
            db.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error);
                };
                socket.emit('chart-data', results);
            });
        }
        else {
            var query = 'SELECT * FROM stock_chart_info WHERE title = "' + sneakerIdParameter + '" ORDER BY last_trade DESC';
            db.query(query, function (error, results, fields) {
                if (error) {
                    console.log(error);
                };
                socket.emit('chart-data', results);
            });
        }

        query = 'SELECT stock_id FROM stock_info WHERE title = "' + sneakerIdParameter + '"';
        db.query(query, function (error, results, fields) {
            if (error) {
                console.log(error);
            };

            socket.emit('summary-data', results);         
        });
        
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

