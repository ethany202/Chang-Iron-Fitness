import mysql from 'mysql2'

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
});

module.exports = {
    getConn() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) {
                    return reject(err);
                }
                resolve(conn);
            });
        });
    },

    async executeQuery(query: string) {
        const conn = await strapi.service('api::mysql-conn.mysql-conn').getConn()

        return new Promise((resolve, reject) => {
            conn.query(query, (err, results, field) => {
                conn.release()
                if (err) {
                    return reject(err)
                }
                resolve(results)
            })
        })
    }
}