'use strict'
var express=require('express');
var ConcesionarioController=require('../controllers/concesionario');    
var router=express.Router();
var multipart=require('connect-multiparty');
var multiPartMiddleWare=multipart({uploadDir:'./uploads'});
//pagina de inicio
router.get('/home',ConcesionarioController.home);
//ver informacion de todos los autos
router.get('/autos',ConcesionarioController.getAutos);
// //guardar informacion de un auto
router.post('/guardar-auto',ConcesionarioController.saveAuto);
// //ver informacion de un auto
router.get('/auto/:id',ConcesionarioController.getAuto);
// //eliminar informacion de un auto
router.delete('/auto/:id',ConcesionarioController.deleteAuto);
// //actualizar informacion de un auto
router.put('/auto/:id',ConcesionarioController.updateAuto);
// //agregar imagenes
router.post('/subir-imagen/:id',multiPartMiddleWare,ConcesionarioController.uploadImagen);
// //recuperar imagenes
router.get('/get-imagen/:imagen',ConcesionarioController.getImagen);


//ver informacion de todos los Clientes
router.get('/clientes',ConcesionarioController.getClientes);
// //guardar informacion de un Cliente
router.post('/guardar-cliente',ConcesionarioController.saveCliente);
// //ver informacion de un Cliente
router.get('/cliente/:id',ConcesionarioController.getCliente);
// //eliminar informacion de un Cliente
router.delete('/cliente/:id',ConcesionarioController.deleteCliente);
// //actualizar informacion de un Cliente
router.put('/cliente/:id',ConcesionarioController.updateCliente);

module.exports=router;