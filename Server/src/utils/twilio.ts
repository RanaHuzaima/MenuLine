import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = new Twilio(accountSid, authToken);

export async function assignPhoneNumberToRestaurant(restaurantId: number): Promise<string> {
  try {
    // Purchase a new phone number from Twilio (from a pool of numbers)
    const phoneNumber = await twilioClient.incomingPhoneNumbers
      .create({ 
        smsUrl: `https://your-server.com/api/call/${restaurantId}`,  // Replace with your call webhook URL
        voiceUrl: `https://your-server.com/api/call/${restaurantId}`  // Replace with your voice webhook URL
      });

    return phoneNumber.phoneNumber; // Return the assigned phone number
  } catch (error) {
    console.error('Error assigning phone number:', error);
    throw new Error('Unable to assign phone number');
  }
}
