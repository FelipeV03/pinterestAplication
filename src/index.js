const express = require("express");
const colors = require("colors");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { format } = require("timeago.js")


// IINICIALIZACIONES
const app = express();




// SETTINGS
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




// MIDDLEWARES
// Esto nos ayuda a ver las peticiones que realizamos en el servidor
app.use(morgan("dev"));

// Este metodo nos ayuda a enteder los datos de que los formularios nos estan enviando
app.use(express.urlencoded({
    extended: false
}));

// Aca vamos a establecer en donde se van a guardar las imagenes y con que nombre
const storage = multer.diskStorage({
    // Aca ponemos el destino de las imagenes que nos etan enviado desde el formulario
    destination: path.join(__dirname, "public/img/uploads"),

    filename: (req, file, cb, filename) => {
        // Aca le estamos diciendo que le coloque as las imagenes nombres aleatorios
        // pero que los concatene con la extencion de la imagen
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

app.use(multer({
    // Aca ponemos el destino de las imagenes que nos etan enviado desde el formulario
    // dest: path.join(__dirname, "public/img/uploads"),

    // Aca importamos la variable donde definimos el nombre y la ubicacion de los archivos
    storage: storage
}).single("image"));




// VARIABLES GLOBALES
// Aca vamos a utilizar timeago.js para formatear la fecha que nos esta llegando desde la bd
// y que sea entendibe para el usuario
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});



// RUTAS
app.use(require("./routes/rutas"));




// ARCHIVOS EXTATICOS
app.use(express.static(path.join(__dirname, "public")));




// INICIAR SERVIDOR
// app.listen (app.get("port"), () => {
//     // console.log(`(っ◔◡◔)っ Server on port ${5000} (ง︡'-'︠)ง`.rainbow);
//     console.log("(っ◔◡◔)っ", "Server on port".rainbow, app.get("port"), "(ง︡'-'︠)ง");
// });

app.listen(app.get("port"), function() {
    console.log("(っ◔◡◔)っ",`http://localhost:${this.address().port}`.rainbow,);
});