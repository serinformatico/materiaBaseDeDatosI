class RoutesAPP {

    static getRoutes(routes) {

        /* ----------------- FRONTEND LIST ----------------- */
        routes.get("/app/clientes", (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });

        return routes;
    }
}

module.exports = RoutesAPP;