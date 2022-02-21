const mysql = require('mysql');
class ConnectionFactory {

    constructor(){
        
        this._dbConfig = {
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: 'and310399',
            database: 'ems-1',
            port: 3306,
            insecureAuth:true
        };

        this._createPool();
    }

    
    _createPool() {
        this._pool = mysql.createPool(this._dbConfig);
    }

    getConnection(callback) {

        var me = this;

        this._pool.getConnection(function (err, connection) {
            if(err) {
                console.log('Error getting mysql_pool connection: ' + err);
                me._pool.end(function onEnd(error) {
                    if(error) {
                        console.log('Error on finishing pool: ' + error);
                    }
                    me._createPool();
                });
                callback(err);
            } else {
                callback(null, connection);
            }
        });

    }

}


exports.ConnectionFactory = ConnectionFactory;