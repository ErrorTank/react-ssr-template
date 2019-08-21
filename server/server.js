const configExpressServer = require("./config/express");
const next = require("next");
const app = next({dev: !process.env.NODE_ENV === "development"});
const handle = app.getRequestHandler();
const initDb = require("./config/db");

initDb()
    .then((db) => {
        return app.prepare().then(() => db).catch(() => Promise.reject());
    })
    .then((db) => {

        const server = configExpressServer({useCors: false, nextHandler: handle});

        server.use(require("./routes/index")(db));

        server.use(require("./utils/error-handlers"));
        server.listen(process.env.PORT, err => {
            if (err) throw err;
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    });
