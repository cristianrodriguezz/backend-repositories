const mongoose = require("mongoose");

const dbConnect = () =>{
  const DB_URI = process.env.DB_URI
  try {
    mongoose.connect(
      "mongodb+srv://cristiandosespigas:CQDrE8xfTjMSO3hX@cluster0.knbokhx.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log("conexion exitosa");
  } catch (error) {
    console.log(error);
    console.log("conexión erronea");
  }

}



module.exports = dbConnect;