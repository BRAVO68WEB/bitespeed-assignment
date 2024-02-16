import "./helpers/env";
import { Hono } from "hono";

import { sql } from "./models/contact.model";
import routes from "./routes";

sql.sync();

const app = new Hono();

app.all("/", async (ctx) => {
    return ctx.text("BiteSpeed API is running!")
});

app.get("/health", async (ctx) => {
    return ctx.text("OK!")
});

app.route("/", routes);

app.all("*", async (ctx) => {
    return ctx.json({ message: "NOT_FOUND" }, 404)
});

export default { 
    port: 4000, 
    fetch: app.fetch, 
};