import { Twilio } from "twilio";
import { generateRandomPhoneNumber } from "../utils/index";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = new Twilio(accountSid, authToken);

export async function assignPhoneNumberToRestaurant(restaurantId: number): Promise<string> {
  try {
    // const phoneNumber = await twilioClient.incomingPhoneNumbers
    //   .create({
    //     areaCode: "778",
    //     smsUrl: `https://your-server.com/api/call/${restaurantId}`,  // Replace with your call webhook URL
    //     voiceUrl: `https://your-server.com/api/call/${restaurantId}`  // Replace with your voice webhook URL
    //   });

    const phoneNumber = generateRandomPhoneNumber()


    return phoneNumber
  } catch (error) {
    console.error('Error assigning phone number:', error);
    throw new Error('Unable to assign phone number');
  }
}

export async function sendSMS(to: string, body: string): Promise<void> {
  try {
    await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Unable to send SMS');
  }
}

export async function makeCall(to: string, url: string): Promise<void> {
  try {
    await twilioClient.calls.create({
      url,
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });
  } catch (error) {
    console.error('Error making call:', error);
    throw new Error('Unable to make call');
  }
}
