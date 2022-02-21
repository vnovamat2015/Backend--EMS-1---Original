const dao = require ('./tiposensorDao.js')
const { TipoSensorDao } = require('./tiposensorDao.js')

exports.sensorEncontrado = function(idsensor,callback){
   tipoSensorDao.sensorEncontrado(idsensor,callback)
}
 // get sensores
exports.todosSensores = function(callback){
tipoSensorDao.listaSensores(callback)
}
// post sensores
exports.cadastrarSensor = (sensor,callback) => {
  tipoSensorDao.cadastrarSensor(sensor,callback) 
}
//put sensores
exports.atualizarSensor = (id,body,callback) => {
  tipoSensorDao.sensorEncontrado(id,(err, sensor) => {
    if(err){
        callback(err);
    } 
    else if(sensor){
     tipoSensorDao.atualizarSensor(id,body,callback);
    }
      else {
        callback({status:404,message:'Sensor não encontrado.'})
   
    }
  }) 
}
// delet sensores
exports.excluirSensor = (id,callback) => {
  tipoSensorDao.sensorEncontrado(id,(err, sensor) => {
    if(err){
        callback(err);
    } else if(sensor){
      tipoSensorDao.excluirSensor(id, callback);
    } else {
      callback({status:404,message:'Sensor não encontrado.'})
     // console.log(callback);
    }
  });
}

 exports.todosTiposSensores = async function (){
  const resultado = await TipoSensor.findAll();
 console.log('ESTOU SERVICE',resultado )
  return resultado.map(item => item.dat)
 }

const tipoSensorDao = new TipoSensorDao();

exports.todosTiposSensores = function(callback) {
	tipoSensorDao.listAll(callback);
}


