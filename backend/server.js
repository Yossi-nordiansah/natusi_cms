import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/project.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Dapatkan __dirname menggunakan fileURLToPath dan import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi sesi
app.use(session({
    secret: 'your_secret_key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', authRoutes);
app.use('/api', projectRoutes);

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
