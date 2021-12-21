import mongoose from 'mongoose';

const mongooseConnect = (db: string) => {
  //
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.log(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.log('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

export default mongooseConnect;
