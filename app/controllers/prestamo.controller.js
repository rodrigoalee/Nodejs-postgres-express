const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

// Crear un nuevo préstamo
exports.create = (req, res) => {
    let prestamo = {};

    try {
        prestamo.codigolibro = req.body.codigolibro;
        prestamo.codusuario = req.body.codusuario;
        prestamo.fechasalida = req.body.fechasalida;
        prestamo.fechamaximadevolucion = req.body.fechamaximadevolucion;
        prestamo.fechadevolucion = req.body.fechadevolucion;
        prestamo.copyrightby = req.body.copyrightby || 'Biblioteca ZanPablo';

        // Guardar el préstamo en la base de datos
        Prestamo.create(prestamo).then(result => {
            res.status(200).json({
                message: "Cargado exitosamente un Préstamo con id = " + result.numeropedido,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Recuperar todos los préstamos
exports.retrieveAllPrestamos = (req, res) => {
    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "¡Obtener toda la información de los Préstamos exitosamente!",
                prestamos: prestamoInfos
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

// Recuperar un préstamo por ID
exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "¡Obtener exitosamente un Préstamo con id = " + prestamoId,
                prestamo: prestamo
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

// Actualizar un préstamo por ID
exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No encontrado para actualizar un Préstamo con id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                codigolibro: req.body.codigolibro,
                codusuario: req.body.codusuario,
                fechasalida: req.body.fechasalida,
                fechamaximadevolucion: req.body.fechamaximadevolucion,
                fechadevolucion: req.body.fechadevolucion,
                copyrightby: req.body.copyrightby || 'Biblioteca ZanPablo'
            };

            let result = await Prestamo.update(updatedObject, { returning: true, where: { numeropedido: prestamoId } });

            if (!result) {
                res.status(500).json({
                    message: "¡Error! No se puede actualizar un Préstamo con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Actualizar exitosamente un Préstamo con id = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se puede actualizar un Préstamo con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un préstamo por ID
exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe un Préstamo con id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Eliminar exitosamente un Préstamo con id = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "¡Error! No se puede eliminar un Préstamo con id = " + req.params.id,
            error: error.message,
        });
    }
};
