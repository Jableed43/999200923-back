import mongoose from 'mongoose'

const statusEnum = ["AVAILABLE", "NOT_AVAILABLE", "DISCONTINUED"]

const productSchema = new mongoose.Schema({
    // name
    name: {
        type: String,
        // El campo es obligatorio
        required: [true, "Name field is required"],
        // largo minimo en caracteres
        minLength: 2,
        // campo unico, dos productos no se van a llamar igual
        unique: true,
        // el dato se va a guardar en minuscula
        lowercase: true,
        // Quita espacios delante y detras de un string
        trim: true,
    },
    // price
    price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price field has to be a number"],
    },
    // rango de ganancia
    profitRate: {
        type: Number,
        default: 1.21,
        min: [1, "Profit rate must be greater than 1" ]
    },
    // description
    description: String,
    // quantity
    quantity: Number,

    // status
    status: {
        type: String,
        validate: {
            validator: function (value) {
                // El uso de enums nos permite manejarnos con valores predefinidos desde un listado
                return statusEnum.includes(value)
            },
            // props toma el valor que se le fue dado al campo status
            message: props => `${props.value} nos es un estado valido`
        }
    },

    // category
    category: String,
    highlighted: Boolean

})

// Virtual genera un campo que es calculado
productSchema.virtual("finalPrice").get(function () {
    return this.price * this.profitRate
})

productSchema.set("toJSON", {
    getters: true,
    setters: true,
    virtuals: true
})

export default mongoose.model("product", productSchema)