import { NextApiRequest, NextApiResponse } from 'next';
import { BitrixAPI } from '@/lib/bitrix';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // try {
    //   const { name, email, phone } = req.body;
      
    //   const contactId = await BitrixAPI.createContact({
    //     NAME: name,
    //     EMAIL: [{ VALUE: email, VALUE_TYPE: 'WORK' }],
    //     PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
    //   });
      
    //   res.status(200).json({ contactId });
    // } catch (error) {
    //   console.error('Create contact error:', error);
    //   res.status(500).json({ error: 'Failed to create contact' });
    // }
  } else if (req.method === 'PATCH') {
    // try {
    //   const { contactId, name, email, phone } = req.body;
      
    //   await BitrixAPI.updateContact(contactId, {
    //     NAME: name,
    //     EMAIL: [{ VALUE: email, VALUE_TYPE: 'WORK' }],
    //     PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
    //   });
      
    //   res.status(200).json({ success: true });
    // } catch (error) {
    //   console.error('Update contact error:', error);
    //   res.status(500).json({ error: 'Failed to update contact' });
    // }
  } else {
    res.setHeader('Allow', ['POST', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}