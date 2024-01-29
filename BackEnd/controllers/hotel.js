'use strict'
var Habitacion=require("../models/habitacion");
var Reservacion=require("../models/reservacion");
var fs=require('fs');
var path=require('path');
var controller={
    home:function(req,res){
        return res.status(200).send(
            "<h1>Hola mundo desde el controlador</h1>"
        );
    },
    /*
    gethabitaciones1:function(req,res){
        habitacion.find({}).sort().exec((err,habitaciones)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!habitaciones) return res.status(404).send({message:"No hay habitaciones para mostrar"});
            return res.status(200).send({habitaciones});
        })
    },*/
    
getHabitaciones: async function (req, res) {
    try {
      const habitaciones = await Habitacion.find({}).sort();
      if (habitaciones.length === 0) {
        return res.status(404).send({ message: 'No hay habitaciones para mostrar' });
      }
      return res.status(200).send({ habitaciones });
    } catch (err) {
      return res.status(500).send({ message: 'Error al devolver los datos' });
    }
  },
  

/*
  
  savehabitacion:function(req,res){
    return new Promise((resolve,reject)=>{
 
    var habitacion=new habitacion();
    var params=req.body;
    habitacion.marca=params.marca;
    habitacion.modelo=params.modelo;
    habitacion.color=params.color;
    habitacion.anio=params.anio;
    habitacion.precio=params.precio;

    habitacion.save()
    .then(habitacionStored=>{
      resolve({habitacion:habitacionStored})
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
  
  saveHabitacion:async function(req,res){
    try{
      var habitacion=new Habitacion();
      var params=req.body;

      habitacion.NumeroHabitacion=params.NumeroHabitacion;
      habitacion.TipoHabitacion=params.TipoHabitacion;
      habitacion.CapacidadMaxima=params.CapacidadMaxima;
      habitacion.TipoCamas=params.TipoCamas;
      habitacion.Precio=params.Precio;
      habitacion.Disponibilidad=params.Disponibilidad;
      habitacion.TipoAlojamiento=params.TipoAlojamiento;
      habitacion.Imagen=params.Imagen;

      var habitacionStored=await habitacion.save();
      
      if(!habitacionStored){
        return res.status(404).send({message:'No se guardo el habitacion'});
      }
      return res.status(201).send({habitacion:habitacionStored});

    } catch (err) {
      return res.status(500).send({ message: 'Error al guardar' });
    }
  },
  

  getHabitacion: async function(req,res){
    try {
      var habitacionId=req.params.id;
      if(!habitacionId) return res.status(404).send({message: 'El habitacion no existe'});
      var habitacion = await Habitacion.findById(habitacionId);
      if(!habitacion) return res.status(404).send({message: 'El habitacion no existe'});
      return  res.status(200).send({habitacion});
    } catch (err) {
      return res.status(500).send({ message: 'Error al recuperar los datos' });
    }
  },
  

  deleteHabitacion:async function(req,res){
    try{
      var habitacionId=req.params.id;
      var habitacionRemoved=await Habitacion.findByIdAndRemove(habitacionId);
      if(!habitacionRemoved) return res.status(404).send({message:'No se puede eliminar el habitacion'});
      return res.status(200).send({habitacion:habitacionRemoved});
    }catch (err) {
      return res.status(500).send({ message: 'Error al eliminar los datos' });
    }

  },


  updateHabitacion:async function(req,res){
    try {
      var habitacionId=req.params.id;
      var update=req.body;

      var habitacionUpdate=await Habitacion.findByIdAndUpdate(habitacionId,update,{new:true});
      if(!habitacionUpdate) return res.status(404).send({message:'El habitacion no existe para actualizar'});
      return res.status(200).send({habitacion:habitacionUpdate});
    } catch (err) {
      return res.status(500).send({ message: 'Error al actualizar los datos' });
    }
  },
  
/*
  uploadImagenHabitacion:async function(req,res){
    try {
      var habitacionId=req.params.id;
      var fileName='Imagen no subida';
      if(req.files){
        var filePath=req.files.imagen.path;
        var fileSplit=filePath.split('\\');
        fileName=fileSplit[1];
        var extSplit=fileName.split('.');
        var fileExt=extSplit[1];
        if(fileExt==='png' || fileExt==='jpg' || fileExt==='jpeg' || fileExt==='gif'|| fileExt==='PNG'){
          var habitacionUpdated= await Habitacion.findByIdAndUpdate(habitacionId,{imagen:fileName},{new:true});
          if(!habitacionUpdated) return res.status(404).send({message:'El habitacion no existe y no se puede subir la imagen'});
          return res.status(200).send({habitacion:habitacionUpdated});
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
  */
  getImagenHabitacion:async function(req,res){

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
  



  //reservacions
  getReservaciones: async function (req, res) {
    try {
      const reservaciones = await Reservacion.find({}).sort();
      if (reservaciones.length === 0) {
        return res.status(404).send({ message: 'No hay reservaciones para mostrar' });
      }
      return res.status(200).send({ reservaciones });
    } catch (err) {
      return res.status(500).send({ message: 'Error al devolver los datos' });
    }
  },
  
  saveReservacion:async function(req,res){
    try{
      var reservacion=new Reservacion();
      var params=req.body;
      reservacion.IDCliente=params.IDCliente;
      reservacion.IDHabitacion=params.IDHabitacion;
      reservacion.NumAdultos=params.NumAdultos;
      reservacion.NumNinos=params.NumNinos;
      reservacion.FechaCheckIn=params.FechaCheckIn;
      reservacion.FechaCheckOut=params.FechaCheckOut;
      reservacion.Desayuno=params.Desayuno;
      reservacion.EstadoReservacion=params.EstadoReservacion;
      reservacion.EstadoPago=params.EstadoPago;
      reservacion.FechaReservacion=params.FechaReservacion;
      reservacion.FechaCancelacion=params.FechaCancelacion;
      reservacion.PrecioTotal=params.PrecioTotal;

      var reservacionStored=await reservacion.save();
      
      if(!reservacionStored){
        return res.status(404).send({message:'No se guardo el reservacion'});
      }
      return res.status(201).send({reservacion:reservacionStored});

    } catch (err) {
      return res.status(500).send({ message: 'Error al guardar' });
    }
  },
  

  getReservacion: async function(req,res){
    try {
      var reservacionId=req.params.id;
      if(!reservacionId) return res.status(404).send({message: 'El reservacion no existe'});
      var reservacion = await Reservacion.findById(reservacionId);
      if(!reservacion) return res.status(404).send({message: 'El reservacion no existe'});
      return  res.status(200).send({reservacion});
    } catch (err) {
      return res.status(500).send({ message: 'Error al recuperar los datos' });
    }
  },
  

  deleteReservacion:async function(req,res){
    try{
      var reservacionId=req.params.id;
      var reservacionRemoved=await Reservacion.findByIdAndRemove(reservacionId);
      if(!reservacionRemoved) return res.status(404).send({message:'No se puede eliminar el reservacion'});
      return res.status(200).send({reservacion:reservacionRemoved});
    }catch (err) {
      return res.status(500).send({ message: 'Error al eliminar los datos' });
    }

  },


  updateReservacion:async function(req,res){
    try {
      var reservacionId=req.params.id;
      var update=req.body;

      var reservacionUpdate=await Reservacion.findByIdAndUpdate(reservacionId,update,{new:true});
      if(!reservacionUpdate) return res.status(404).send({message:'El reservacion no existe para actualizar'});
      return res.status(200).send({reservacion:reservacionUpdate});
    } catch (err) {
      return res.status(500).send({ message: 'Error al actualizar los datos' });
    }
  },
  
}
module.exports=controller;