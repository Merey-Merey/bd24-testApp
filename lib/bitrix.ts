const BITRIX_WEBHOOK = process.env.BITRIX_WEBHOOK;

export interface BitrixContact {
  NAME: string;
  EMAIL: { VALUE: string; VALUE_TYPE: string }[];
  PHONE: { VALUE: string; VALUE_TYPE: string }[];
}

export class BitrixAPI {
  static async createContact(contact: BitrixContact): Promise<number> {
    const response = await fetch(`${BITRIX_WEBHOOK}/crm.contact.add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: contact,
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error_description);
    }

    return result.result;
  }

  static async updateContact(contactId: number, contact: Partial<BitrixContact>): Promise<boolean> {
    const response = await fetch(`${BITRIX_WEBHOOK}/crm.contact.update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: contactId,
        fields: contact,
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error_description);
    }

    return result.result;
  }

  static async getContact(contactId: number): Promise<any> {
    const response = await fetch(`${BITRIX_WEBHOOK}/crm.contact.get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: contactId,
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error_description);
    }

    return result.result;
  }
}