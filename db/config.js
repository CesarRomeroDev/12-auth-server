const mongoose  = require('mongoose');

/**
 * async:
 * Cuando se llama a una función async, esta devuelve un elemento Promise.
 * Cuando la función async devuelve un valor, Promise se resolverá con el valor devuelto. 
 * Si la función async genera una excepción o algún valor, Promise se rechazará con el valor generado.
 */
const dbConection = async() => {


    try {

      await mongoose.connect( process.env.BD_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('Base de datos Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB')
    }
}

module.exports = {
    dbConection

}