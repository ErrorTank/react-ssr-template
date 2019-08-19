const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");

const app = next({ dev: !process.env.NODE_ENV === "development" });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();

    if (!process.env.NODE_ENV === "development") {
        /* Helmet helps secure our app by setting various HTTP headers */
        server.use(helmet());
        /* Compression gives us gzip compression */
        server.use(compression());
    }

    /* Body Parser built-in to Express as of version 4.16 */
    server.use(express.json());
    /* Express Validator will validate form data sent to the backend */

    /* give all Next.js's requests to Next.js server */
    server.get("/_next/*", (req, res) => {
        handle(req, res);
    });

    server.get("/static/*", (req, res) => {
        handle(req, res);
    });




    /* default route
       - allows Next to handle all other routes
       - includes the numerous `/_next/...` routes which must    be exposedfor the next app to work correctly
       - includes 404'ing on unknown routes */
    server.get("*", (req, res) => {
        handle(req, res);
    });

    server.listen(process.env.PORT, err => {
        if (err) throw err;
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});
