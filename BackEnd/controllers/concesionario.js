'use strict'
var Auto=require("../models/auto");
var Cliente=require("../models/cliente");
var fs=require('fs');
var path=require('path');
var controller={
    home:function(req,res){
        return res.status(200).send(
            "<h1>Hola mundo desde el controlador</h1>"
        );
    },
    /*
    getAutos1:function(req,res){
        Auto.find({}).sort().exec((err,autos)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!autos) return res.status(404).send({message:"No hay autos para mostrar"});
            return res.status(200).send({autos});
        })
    },*/
    
getAutos: async function (req, res) {
    try {
      const autos = await Auto.find({}).sort();
      if (autos.length === 0) {
        return res.status(404).send({ message: 'No hay autos para mostrar' });
      }
      return res.status(200).send({ autos });
    } catch (err) {
      return res.status(500).send({ message: 'Error al devolver los datos' });
    }
  },
  

/*
  
  saveAuto:function(req,res){
    return new Promise((resolve,reject)=>{
 
    var auto=new Auto();
    var params=req.body;
    auto.marca=params.marca;
    auto.modelo=params.modelo;
    auto.color=params.color;
    auto.anio=params.anio;
    auto.precio=params.precio;

    auto.save()
    .then(autoStored=>{
      resolve({auto:autoStored})
    })
    .catch(err=>{
      reject(err)
    })
    })

    .then(data=>{
      return res.status(201).send(data);
    })
    .catch(err=>{
      return res.status(500).send({message:'Error al guardar'});
    })
  },*/
  
  saveAuto:async function(req,res){
    try{
      var auto=new Auto();
      var params=req.body;
      auto.marca=params.marca;
      auto.modelo=params.modelo;
      auto.color=params.color;
      auto.anio=params.anio;
      auto.precio=params.precio;
      auto.imagen=null;

      var autoStored=await auto.save();
      
      if(!autoStored){
        return res.status(404).send({message:'No se guardo el auto'});
      }
      return res.status(201).send({auto:autoStored});

    } catch (err) {
      return res.status(500).send({ message: 'Error al guardar' });
    }
  },
  

  getAuto: async function(req,res){
    try {
      var autoId=req.params.id;
      if(!autoId) return res.status(404).send({message: 'El auto no existe'});
      var auto = await Auto.findById(autoId);
      if(!auto) return res.status(404).send({message: 'El auto no existe'});
      return  res.status(200).send({auto});
    } catch (err) {
      return res.status(500).send({ message: 'Error al recuperar los datos' });
    }
  },
  

  deleteAuto:async function(req,res){
    try{
      var autoId=req.params.id;
      var autoRemoved=await Auto.findByIdAndRemove(autoId);
      if(!autoRemoved) return res.status(404).send({message:'No se puede eliminar el auto'});
      return res.status(200).send({auto:autoRemoved});
    }catch (err) {
      return res.status(500).send({ message: 'Error al eliminar los datos' });
    }

  },


  updateAuto:async function(req,res){
    try {
      var autoId=req.params.id;
      var update=req.body;

      var autoUpdate=await Auto.findByIdAndUpdate(autoId,update,{new:true});
      if(!autoUpdate) return res.status(404).send({message:'El auto no existe para actualizar'});
      return res.status(200).send({auto:autoUpdate});
    } catch (err) {
      return res.status(500).send({ message: 'Error al actualizar los datos' });
    }
  },
  
 
  uploadImagen:async function(req,res){
    try {
      var autoId=req.params.id;
      var fileName='Imagen no subida';
      if(req.files){
        var filePath=req.files.imagen.path;
        var fileSplit=filePath.split('\\');
        fileName=fileSplit[1];
        var extSplit=fileName.split('.');
        var fileExt=extSplit[1];
        if(fileExt==='png' || fileExt==='jpg' || fileExt==='jpeg' || fileExt==='gif'|| fileExt==='PNG'){
          var autoUpdated= await Auto.findByIdAndUpdate(autoId,{imagen:fileName},{new:true});
          if(!autoUpdated) return res.status(404).send({message:'El auto no existe y no se puede subir la imagen'});
          return res.status(200).send({auto:autoUpdated});
        }else{
          fs.unlink(filePath,(err)=>{
            return res.status(200).send({message:'Extensión no válida'});
          });
        }
      }else{
        return res.status(200).send({message: fileName});
      }
    } catch (err) {
      return res.status(500).send({ message: 'La imagen no se ha subido' });
    }
  },
  
  getImagen:async function(req,res){

    try {
      var file=req.params.imagen;
      var path_file="./uploads/"+file;
      
      var exists=await fs.promises.access(path_file)
      .then(()=>true)
      .catch(()=>false);
      if(exists)return res.sendFile(path.resolve(path_file));
      else return res.status(200).send({message:'la imagen no existe'});
    } catch (err) {
      return res.status(500).send({ message: 'Error al recuperar la imagen' });
    }
  },
  



  //clientes
  getClientes: async function (req, res) {
    try {
      const clientes = await Cliente.find({}).sort();
      if (clientes.length === 0) {
        return res.status(404).send({ message: 'No hay clientes para mostrar' });
      }
      return res.status(200).send({ clientes });
    } catch (err) {
      return res.status(500).send({ message: 'Error al devolver los datos' });
    }
  },
  
  saveCliente:async function(req,res){
    try{
      var cliente=new Cliente();
      var params=req.body;
      cliente.nombre=params.nombre;
      cliente.apellido=params.apellido;
      cliente.ci=params.ci;
      cliente.numero_telefonico=params.numero_telefonico;
      cliente.direccion=params.direccion;
      var clienteStored=await cliente.save();
      
      if(!clienteStored){
        return res.status(404).send({message:'No se guardo el cliente'});
      }
      return res.status(201).send({cliente:clienteStored});

    } catch (err) {
      return res.status(500).send({ message: 'Error al guardar' });
    }
  },
  

  getCliente: async function(req,res){
    try {
      var clienteId=req.params.id;
      if(!clienteId) return res.status(404).send({message: 'El cliente no existe'});
      var cliente = await Cliente.findById(clienteId);
      if(!cliente) return res.status(404).send({message: 'El cliente no existe'});
      return  res.status(200).send({cliente});
    } catch (err) {
      return res.status(500).send({ message: 'Error al recuperar los datos' });
    }
  },
  

  deleteCliente:async function(req,res){
    try{
      var clienteId=req.params.id;
      var clienteRemoved=await Cliente.findByIdAndRemove(clienteId);
      if(!clienteRemoved) return res.status(404).send({message:'No se puede eliminar el cliente'});
      return res.status(200).send({cliente:clienteRemoved});
    }catch (err) {
      return res.status(500).send({ message: 'Error al eliminar los datos' });
    }

  },


  updateCliente:async function(req,res){
    try {
      var clienteId=req.params.id;
      var update=req.body;

      var clienteUpdate=await Cliente.findByIdAndUpdate(clienteId,update,{new:true});
      if(!clienteUpdate) return res.status(404).send({message:'El cliente no existe para actualizar'});
      return res.status(200).send({cliente:clienteUpdate});
    } catch (err) {
      return res.status(500).send({ message: 'Error al actualizar los datos' });
    }
  },
  
}
module.exports=controller;