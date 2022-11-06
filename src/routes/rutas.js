const {Router } = require("express");
const router = Router();
const pool = require("../database");
// Aca requerimos el modoleo de la imagen
// Este image es el que nos permite crear un nuevo objeto y guardarlo dentro de la base de datos
// const Image = require("../models/image")


router.get(("/"), async (req, res) => {
    const images = await pool.query("SELECT * FROM image");
    // console.log("**Log Images**", images);
    // res.send("<h1>Ola</h1>");
    res.render("index", {images});

});

router.get(("/upload"), (req, res) => {
    // res.send("<h1>Ola Uploads</h1>");
    res.render("upload");
});
router.post(("/upload"), async (req, res) => {
    // console.log("Este es el **ReqFile**",req.file);
    // console.log("Este es el **ReqBody**",req.body);

    // // Aca vamos a crear una nueva imagen
    // const image = new Image();
    // // Aca le pasamos los datos para que se guarden
    // image.title = req.body.title;
    // image.descripcion = req.body.descripcion;
    // image.filename = req.file.filename;
    // // Aca tenemos la ubicacion de nuestro archivo y la concatenamos con el nombre del archivo
    // // esto para que podamos utilizar la ruta a taraves de nuestras vistas y poder mostrar las imgs
    // image.path = "/img/uploads/" + req.file.filename;
    // image.originalname = req.file.originalname;
    // image.mimetype = req.file.mimetype;
    // image.size = req.file.size;
    // console.log(image)
    // // Aca vamos a guardar las inf de las imagenes
    // await image.save();
    const {title, descripcion} = req.body
    const {filename, path, originalname, mimetype, size} = req.file

    const newimage = {
        title,
        descripcion,
        filename,
        path,
        originalname,
        mimetype,
        size
    }

    await pool.query("INSERT INTO image set ?", [newimage]);
    // res.send("<h1>Ola Subido</h1>");
    res.redirect("/");
});

router.get(("/image/:id"), async (req, res) => {
    // res.send("<h1>Ola Perfil</h1>");
    const {id} = req.params
    const image = await pool.query("SELECT * FROM image where _id = ?", [id]);
    console.log(image);
    res.render("profile", {image: image});
});

router.get(("/image/:id/delte"), (req, res) =>{
    res.send("<h1>Ola Eliminado</h1>");
});





module.exports = router;