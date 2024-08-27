const db = require('../config/db.config.js');
const Libro = db.Libro;

// Crear un nuevo libro
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.nombrelibro = req.body.nombrelibro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisdelautor = req.body.paisdelautor;
        libro.numeropag = req.body.numeropag;
        libro.Anioedicion = req.body.Anioedicion;
        libro.precio = req.body.precio;
        libro.copyrightby = req.body.copyrightby

        // Guardar el libro en la base de datos
        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Cargado exitosamente un Libro con id = " + result.codlibro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Recuperar todos los libros
exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "¡Obtener toda la información de los Libros exitosamente!",
                libros: libroInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Recuperar un libro por ID
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "¡Obtener exitosamente un Libro con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error
            });
        });
};

// Actualizar un libro por ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No encontrado para actualizar un Libro con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombrelibro: req.body.nombrelibro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisdelautor: req.body.paisdelautor,
                numeropag: req.body.numeropag,
                Aniooedicion: req.body.Anioedicion,
                precio: req.body.precio,
                copyrightby: req.body.copyrightby
            };

            let result = await Libro.update(updatedObject, { returning: true, where: { codlibro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "¡Error! No se puede actualizar un Libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Actualizar exitosamente un Libro con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se puede actualizar un Libro con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un libro por ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un Libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Eliminar exitosamente un Libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se puede eliminar un Libro con id = " + req.params.id,
            error: error.message,
        });
    }
};
