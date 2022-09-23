class RoutesAPI {

    static getRoutes(routes) {

        /* ----------------- BACKEND LIST ----------------- */
        routes.get("/api/clientes", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);

                let sentenceSQL = "SELECT * FROM cliente;";

                conn.query(sentenceSQL, (err, rows) => {
                    if (err) return res.send(err);

                    res.json({ rows, sql: sentenceSQL });
                });
            });
        });

        /* --------------- BACKEND LIST LIKE -------------- */
        routes.get("/api/clientes/sp/buscar-por-nombre", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);

                let sentenceSQL = "SELECT * FROM cliente WHERE CONCAT(apellido, ' ', nombre) LIKE '%" + req.query.apellido_nombre + "%';";

                conn.query(sentenceSQL, (err, rows) => {
                    if (err) return res.send(err);

                    res.json({ rows, sql: sentenceSQL });
                });
            });
        });

        /* ----------------- BACKEND SHOW ----------------- */
        routes.get("/api/clientes/:id", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);

                let sentenceSQL = "SELECT * FROM cliente WHERE id = " + req.params.id + ";";

                conn.query(sentenceSQL, (err, row) => {
                    if (err) return res.send(err);

                    res.json({ row: row[0], sql: sentenceSQL });
                });
            });
        });

        /* ----------------- BACKEND INSERT ----------------- */
        routes.post("/api/clientes", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);

                let sentenceSQL = "INSERT INTO cliente VALUES (" +
                    "DEFAULT," +
                    " '" + req.body.apellido      + "'," +
                    " '" + req.body.nombre        + "'," +
                    " '" + req.body.documento_nro + "'," +
                    " '" + req.body.ocupacion     + "'," +
                    " '" + req.body.hobby         + "');";

                conn.query(sentenceSQL, (err, row) => {
                    if (err) return res.send(err);

                    res.json({ id: row.insertId, sql: sentenceSQL });
                });
            });
        });

        /* ----------------- BACKEND UPDATE ----------------- */
        routes.put("/api/clientes/:id", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);

                let sentenceSQL = "UPDATE cliente SET " +
                    "apellido = '"      + req.body.apellido      + "', " +
                    "nombre = '"        + req.body.nombre        + "', " +
                    "documento_nro = '" + req.body.documento_nro + "', " +
                    "ocupacion = '"     + req.body.ocupacion     + "', " +
                    "hobby = '"         + req.body.hobby         + "' " +
                    "WHERE id = "       + req.params.id          + ";";

                conn.query(sentenceSQL, (err) => {
                    if (err) return res.send(err);

                    res.json({ sql: sentenceSQL });
                });
            });
        });

        /* ----------------- BACKEND DELETE ----------------- */
        routes.delete("/api/clientes/:id", (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err)

                let sentenceSQL = "DELETE FROM cliente WHERE id = " + req.params.id + ";";

                conn.query(sentenceSQL, (err) => {
                    if (err) return res.send(err);

                    res.json({ state: true, sql: sentenceSQL });
                });
            });
        });

        return routes;
    }
}

module.exports = RoutesAPI;