import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
//mongodb+srv://admin-ums:3jvyioVoMWTK3oQz@cluster0.pppehle.mongodb.net/first-projects?retryWrites=true&w=majority&appName=Cluster0
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(config.database_url);
    app.listen(config.port, () => {
      console.log(`Example app listening on port  ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();
