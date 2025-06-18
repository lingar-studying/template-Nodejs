
import express from 'express';
import { connectToMongo } from './Services/connectionWithMongo.js';
import { createEntity } from './Services/generaldao.js';

const app = express();
const PORT = 4000;

app.use(express.json());

connectToMongo().then(async () => {
  // רק אם אתה רוצה לבדוק יצירה אוטומטית:
  await createEntity({ a: 'stringTest', b: '21341232' }, 'ArtProd');
  console.log(`the sever is with - ${PORT}`);
  app.listen(PORT, () => {
    console.log('Listen...');
  });
}).catch((err) => {
  console.error('Error with mongo: ', err.message);
});
