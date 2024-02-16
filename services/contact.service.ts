import { Op } from "sequelize";

import { Contact } from "../models/contact.model"

export default class OrderService {
    public createContactS = async (email: string, phoneNumber: string) => {
        const primaryContact = await Contact.findOne({
            where: {
                [Op.or]: [{ email }, { phoneNumber }],
                linkPrecedence: 'primary'
            },
            raw: true
        })

        if (!primaryContact) {
            const newContact = await Contact.create({ phoneNumber, email, linkPrecedence: 'primary' })

            return {
                contact: {
                    primaryContact: newContact.id,
                    emails: [newContact.dataValues.email].filter((email: string) => email !== null && email !== undefined),
                    phoneNumbers: [newContact.dataValues.phoneNumber].filter((phone: string) => phone !== null && phone !== undefined),
                    secondaryContactIds: []
                }
            }
        }

        const exactContact = await Contact.findOne({
            where: { email, phoneNumber },
            raw: true
        })

        if (!exactContact) {
            await Contact.create({
                email,
                phoneNumber,
                linkPrecedence: 'secondary',
                linkedId: primaryContact.id
            })
        }

        const existContacts = await Contact.findAll({
            where: {
                [Op.or]: [
                    { id: primaryContact.id },
                    { linkedId: primaryContact.id }
                ]
            },
            order: [['createdAt', 'ASC']],
            raw: true
        })

        return {
            contact: {
                primaryContact: primaryContact.id,
                emails: [...new Set(existContacts.map(contact => contact.email))].filter(email => email !== null),
                phoneNumbers: [...new Set(existContacts.map(contact => contact.phoneNumber))].filter(phone => phone !== null),
                secondaryContactIds: existContacts.filter(contact => contact.id !== primaryContact.id).map(contact => contact.id)
            }
        }
    }
}