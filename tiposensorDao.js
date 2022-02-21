const { ConnectionFactory } = require("./conectorFactor");

class TipoSensorDao {

    constructor() {
        this.connectionFactory = new ConnectionFactory(); 
    }
  // get('/sensores')
    listaSensores(callback) {
                this.connectionFactory.getConnection(function(err, connection) {
            if(err){
                if(connection)
                    connection.release();
                callback(err);
            } else {
                connection.query(`select id,idTipoSensor,coordenadas,numSerie  from sensores`, [], function(err, sensores) {
                    connection.release();
                    if(err) {
                        callback(err);
                    } else {
                        callback(err, sensores);
                    }
                });
            }
        });
    }
    sensorEncontrado(id,callback) {
        
        this.connectionFactory.getConnection(function(err, connection) {
            if(err){
                if(connection)
                    connection.release();
                callback(err);
            } else {
                connection.query(`select id,idTipoSensor,coordenadas,numSerie  from sensores where id = ?`, [id], function(err, sensores) {
                    connection.release();
                    if(err) {
                        callback(err);
                    } else {
                        callback(err, sensores[0]);
                    }
                });
            }
        });
    }


    cadastrarSensor(sensor, callback) {
        this.connectionFactory.getConnection(function(err, connection) {
            if(err) {
                if(connection)
                    connection.release();
                callback(err);
            } else {
                connection.query('INSERT INTO sensores(id,idTipoSensor,coordenadas,numSerie) VALUES(?,?,?,?)', 
				[sensor.id, sensor.idTipoSensor, sensor.coordenadas, sensor.numSerie],
                function(errors) {
                    connection.release();
                    callback(errors);
                });
            }
        });
    }

    atualizarSensor(id, sensor, callback) {
        this.connectionFactory.getConnection(function(err, connection) {
            if(err) {
                if(connection)
                    connection.release();
                callback(err);

            } else {
                connection.query('UPDATE sensores SET idTipoSensor=?, coordenadas=?, numSerie=? WHERE id = ?', 
				[sensor.idTipoSensor, sensor.coordenadas, sensor.numSerie, id],
                function(errors) {
                    connection.release();
                    callback(errors);
                });
            }
        });
    }

    excluirSensor(id, callback) {
        this.connectionFactory.getConnection(function(err, connection) {
            if(err) {
                if(connection)
                    connection.release();
                callback(err);
            } else {
                connection.query('DELETE FROM sensores WHERE id = ?', 
				[id],
                function(errors) {
                connection.release();
                    callback(errors);
                });
            }
        });
    }
};

/// get tipos-sensores
/*
listAll(callback){
            this.connectionFactory.getConnection(function(err, connection) {
        if(err){
            if(connection)
                connection.release();
            callback(err);
        } else {
            connection.query(`select id,nome`, [], function(err, dados) {
                connection.release();
                if(err) {
                    callback(err);
                } else {
                    callback(err, dados);
                }
            });
        }
    })
};
*/

exports.TipoSensorDao = TipoSensorDao;


