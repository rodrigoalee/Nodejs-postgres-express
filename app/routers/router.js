let express = require('express');
let router = express.Router();

const libroController = require('../controllers/libro.controller.js');
const prestamoController = require('../controllers/prestamo.controller.js');

router.post('/api/libros/create', libroController.create);
router.get('/api/libros/all', libroController.retrieveAllLibros);
router.get('/api/libros/onebyid/:id', libroController.getLibroById);
router.put('/api/libros/update/:id', libroController.updateById);
router.delete('/api/libros/delete/:id', libroController.deleteById);

router.post('/api/prestamos/create', prestamoController.create);
router.get('/api/prestamos/all', prestamoController.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', prestamoController.getPrestamoById);
router.put('/api/prestamos/update/:id', prestamoController.updateById);
router.delete('/api/prestamos/delete/:id', prestamoController.deleteById);

module.exports = router;