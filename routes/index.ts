import { Hono } from "hono";

import ContactController from "../controllers/contact.controller";

const app = new Hono();
const contact = new ContactController();

app.post("/identify", contact.createContact);

export default app;