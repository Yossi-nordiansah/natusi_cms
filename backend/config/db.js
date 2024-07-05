import mysql from "mysql"

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'natusi_server'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default db
