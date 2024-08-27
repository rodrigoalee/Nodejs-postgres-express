module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
        codlibro: {
            type: Sequelize.INTEGER,autoIncrement: true,primaryKey: true},
        nombrelibro: { 
            type: Sequelize.STRING },
        editorial: { 
            type: Sequelize.STRING},
        autor: { 
            type: Sequelize.STRING },
        genero: { 
            type: Sequelize.STRING },
        paisdelautor: { 
            type: Sequelize.STRING },
        umeropag: { 
            type: Sequelize.INTEGER },
        Añoedicion: { 
            type: Sequelize.INTEGER },
        precio: { 
            type: Sequelize.FLOAT },
        copyrightby: { 
            type: Sequelize.STRING, defaultValue: 'Biblioteca ZanPablo' 

        }});

    return Libro;
}