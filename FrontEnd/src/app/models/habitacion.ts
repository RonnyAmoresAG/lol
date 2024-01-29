export class Habitacion{
    constructor(
        public _id:string,
        public NumeroHabitacion:Number,
        public TipoHabitacion:String,
        public CapacidadMaxima:Number,
        public TipoCamas:String,
        public Precio: String,
        public Disponibilidad:Boolean,
        public TipoAlojamiento:String,
        public Imagen:String
    ){}
}
