import type { Context } from "hono";

import ContactService from "../services/contact.service";

export default class ContactController extends ContactService {
    public createContact = async (ctx: Context) => {
        const { email, phoneNumber } = await ctx.req.json()

        try {
            const contact = await this.createContactS(email, phoneNumber)
            return ctx.json(contact)
        } catch (error) {
            return ctx.json({ message: 'Something went wrong!' })
        }
    }
}