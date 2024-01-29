import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habitacion } from '../models/habitacion';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class HotelService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    getHabitaciones():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'habitaciones',{headers:headers});
    }
    guardarHabitacion(habitacion:Habitacion):Observable<any>{
        let params=JSON.stringify(habitacion);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardar-habitacion',params,{headers:headers});
    }
    getHabitacion(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'habitacion/'+id,{headers:headers});
    }
    updateHabitacion(habitacion:Habitacion):Observable<any>{
        let params=JSON.stringify(habitacion);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'habitacion/'+habitacion._id,params,{headers:headers});
    }
    //eliminar un habitacion
    //http://localhost:3600/habitacion/:id
    deleteHabitacion(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'habitacion/'+id,{headers:headers});
    }
}