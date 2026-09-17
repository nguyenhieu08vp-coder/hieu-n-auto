// Service to send lead and order data to Google Sheets via Google Apps Script Web App Webhook

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0ipmWrPbR3HucX9RQ2n1T-YGRL1zws31x9SifJ7Xx0UpTrV4r_zF-hVGJ4Kj8xdSWpA/exec';

export interface LeadSubmissionPayload {
  name: string;
  phone: string;
  email?: string;
  car?: string;
  service?: string;
  contactMethod?: 'zalo' | 'call' | string;
  address?: string;
  note?: string;
  source?: string;
  items?: string;
  totalAmount?: string | number;
}

/**
 * Sends lead data to Google Sheets via Google Apps Script.
 * Uses mode: 'no-cors' to avoid browser CORS redirect blocks while guaranteeing delivery.
 */
export async function submitLeadToGoogleSheets(payload: LeadSubmissionPayload): Promise<boolean> {
  try {
    const dataToSend = {
      timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      name: payload.name || '',
      fullName: payload.name || '',
      phone: payload.phone || '',
      phoneNumber: payload.phone || '',
      email: payload.email || '',
      car: payload.car || '',
      carModel: payload.car || '',
      service: payload.service || '',
      serviceInterest: payload.service || '',
      contactMethod: payload.contactMethod || 'zalo',
      address: payload.address || '',
      note: payload.note || '',
      message: payload.note || '',
      source: payload.source || 'Website Lead',
      items: payload.items || '',
      totalAmount: payload.totalAmount || '',
    };

    // Google Apps Script doPost receives the body in e.postData.contents
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(dataToSend),
    });

    return true;
  } catch (error) {
    console.warn('Could not send data to Google Sheets:', error);
    return false;
  }
}
