import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { User } from './models/user.js';
import { Offer } from './models/offer.js';
import { Review } from './models/review.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();