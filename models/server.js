const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server{
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        this.connectionDB();

        this.middlewares();
        
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));
    }

    listen(){
        this.app.listen(this.PORT, () => console.log(`Server running on port ${this.PORT}`));
    }

}

module.exports = Server;