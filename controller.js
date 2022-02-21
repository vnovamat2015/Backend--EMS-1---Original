const express = require('express');
const { listaSensores } = require('./tiposensorDao');
const router = express.Router()
const service = require('./service')

router.get('/sensores', (req, res) => {
    service.todosSensores((erro,sensores)=>{
      if(erro)
        res.status(500).send(erro);
      else
        if(sensores.length == 0) 
         res.sendStatus(404); 
        else
            res.json(sensores);
    });
});

router.get('/sensores/:id', (req, res) => {
     service.sensorEncontrado(req.params.id,(erro,sensor)=>{
        if(erro)
          res.status(500).send(erro);
        else if(sensor){
            res.json(sensor)
        } else{
            res.sendStatus(404)
        }
        
      })
});

router.post('/sensores', (req, res) =>{
    service.cadastrarSensor(req.body,erro =>{
        if(erro)
            res.status(500).send(erro);
        else
            res.sendStatus(201);
    });
   
});

router.put('/sensores/:id',(req,res) =>{
    service.atualizarSensor(req.params.id,req.body,err =>{
        if(err && err.status == 404)
         res.sendStatus(404);
        else  if(err && err.errno == 1451)
         res.sendStatus(400);
        else  if(err)
         res.sendStatus(500);
        else
         res.sendStatus(200);
    })
    
})  

router.delete('/sensores/:id',(req,res) =>{
    service.excluirSensor(req.params.id,(err) =>{
        if(err && err.status == 404)
            res.status(404).send(err);
        else  if(err && err.errno == 1451)
            res.sendStatus(400);
        else  if(err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
})

router.get('/tipos-sensores', async(req, res) => {
     service.todosTiposSensores((error,dados) => {
        if(error){
            res.sendStatus(500);
        } else {
            res.json(dados);
        }
    })
});

module.exports =  router
    
