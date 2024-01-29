export class Reservacion{
    constructor(
        public _id:string,
        public IDCliente:String,
        public IDHabitacion:String,
        public NumAdultos:Number,
        public NumNinos:Number,
        public FechaCheckIn:String,
        public FechaCheckOut:String,
        public Desayuno:Boolean,
        public EstadoReservacion:String,
        public EstadoPago:String,
        public FechaReservacion:String,
        public FechaCancelacion:String,
        public PrecioTotal:Number
    ){}
}
