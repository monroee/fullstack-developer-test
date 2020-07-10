# fullstack-developer-test

### Databases (MongoDB and PostgreSQL)

### Backend (Node.js)
* copy .env.example file and rename it to .env
* modify .env file
* Install dependencies
    - on terminal. run: npm install
* Unit testing
    -  on terminal. run: npm test
* Run Application
    - on terminal. run : node index
        - server will be running on default : http://localhost:8000
        - csv files inside backend/data/ folder will be imported based on the database name on the file name.
        - csv file name format must be : "{Any} - {Database} - {Table Name}.csv"
        - supported databases: mongodb and postgresql.
* if data were successfully imported on the designated database,
  a file will be created on backend/data folder named : "mongodb.init.done" and "postgresdb.init.done"
    - deleting the said files will execute importing again on server startup.


### Frontend (Vue.js)
* copy .env.example file and rename it to .env
* modify .env file
* Install dependencies
    - on terminal. run: npm install
* Unit testing
    -  on terminal. run: npm run test:unit
* Run Application
    - on terminal. run: npm run serve
        - app will be running on default : http://localhost:8080
