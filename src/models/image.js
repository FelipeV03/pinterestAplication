// // Aca vamos a guardar las propiedades de las imagenes
// const mongoose = require("mongoose");


// // Aca creamos un esquema nuevo para las imagenes
// // Aca colocamos toda la informacion de la imagen que queremos guardar
// const imageSchema = new mongoose.Schema({
//     title: {type: String},
//     descripcion: {type: String},
//     filename: {type: String},
//     path: {type: String},
//     originalname: {type:String},
//     mimetype: {type: String},
//     size: {type: Number},

//     // Aca le decimos que queremos guardar la fecha de creacion
//     // pero que si no tiene fecha entonces le pnga la fecha en la que se guardo el dato
//     created_at: {
//         type: Date,
//         default: Date.now()
//     }
// });


// // Para que funcione el Schema tiene que pasar por el model
// // Aca le designamos un nombre para el modelo y el nombre del Schema
// module.exports = mongoose.model("image", imageSchema);