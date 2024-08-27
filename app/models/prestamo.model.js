module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {
        numeropedido: {
            type: Sequelize.INTEGER,autoIncrement: true,primaryKey: true},
        codigolibro: { 
            type: Sequelize.INTEGER },
        codusuario: { 
            type: Sequelize.INTEGER },
        fechasalida: { 
            type: Sequelize.DATE },
        fechamaximadevolucion: { 
            type: Sequelize.DATE },
        fechadevolucion: { 
            type: Sequelize.DATE },
        copyrightby: { 
            type: Sequelize.STRING, defaultValue: 'Biblioteca ZanPablo' 

        }});

    return Prestamo;
}