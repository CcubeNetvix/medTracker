// notificationService.ts
import twilio from 'twilio';
import nodemailer from 'nodemailer';

// ----------------------------
// CONFIGURATION
// ----------------------------
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Initialize Twilio client
const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Initialize email transporter
const emailTransporter = emailUser && emailPass
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })
  : null;

// ----------------------------
// INTERFACES
// ----------------------------
export interface NotificationData {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  medicineName: string;
  dosage: string;
  scheduledTime: string;
  reminderType: 'sms' | 'email' | 'both';

  // optional fields
  appointmentDate?: string;
  daysLeft?: number;
}

export interface NotificationResult {
  success: boolean;
  message: string;
  type: 'sms' | 'email';
}

// ----------------------------
// CORE UTILITIES
// ----------------------------
export const sendSMSNotification = async (
  phoneNumber: string,
  message: string
): Promise<NotificationResult> => {
  if (!twilioClient || !twilioPhoneNumber) {
    return { success: false, message: 'Twilio not configured', type: 'sms' };
  }

  try {
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+${phoneNumber}`;

    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhone,
    });

    return { success: true, message: 'SMS sent successfully', type: 'sms' };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send SMS',
      type: 'sms',
    };
  }
};

export const sendEmailNotification = async (
  email: string,
  subject: string,
  htmlContent: string
): Promise<NotificationResult> => {
  if (!emailTransporter) {
    return {
      success: false,
      message: 'Email service not configured',
      type: 'email',
    };
  }

  try {
    await emailTransporter.sendMail({
      from: emailUser,
      to: email,
      subject,
      html: htmlContent,
    });

    return { success: true, message: 'Email sent successfully', type: 'email' };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      type: 'email',
    };
  }
};

// ----------------------------
// REMINDER FUNCTIONS
// ----------------------------
export const sendMedicineReminder = async (
  data: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `🔔 MEDPAL REMINDER 🔔\n\nHi ${data.userName},\n\nIt's time to take your medicine:\n💊 ${data.medicineName}\n📏 ${data.dosage}\n⏰ ${new Date(
    data.scheduledTime
  ).toLocaleTimeString()}`;

  const emailHtml = `<h1>🔔 Medicine Reminder</h1><p>Hi ${data.userName}, it's time to take your medicine.</p>`;

  if (data.reminderType === 'sms' || data.reminderType === 'both') {
    results.push(await sendSMSNotification(data.userPhone, smsMessage));
  }
  if (data.reminderType === 'email' || data.reminderType === 'both') {
    results.push(
      await sendEmailNotification(
        data.userEmail,
        '🔔 MedPal Medicine Reminder',
        emailHtml
      )
    );
  }

  return results;
};

export const sendMissedMedicineNotification = async (
  data: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `⚠️ MEDPAL ALERT ⚠️\n\nHi ${data.userName}, you missed your medicine:\n💊 ${data.medicineName}\n📏 ${data.dosage}`;

  if (data.reminderType === 'sms' || data.reminderType === 'both') {
    results.push(await sendSMSNotification(data.userPhone, smsMessage));
  }
  if (data.reminderType === 'email' || data.reminderType === 'both') {
    results.push(
      await sendEmailNotification(
        data.userEmail,
        '⚠️ Missed Medicine Alert',
        `<h1>⚠️ You missed your medicine</h1>`
      )
    );
  }

  return results;
};

export const sendLowStockNotification = async (
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  medicineName: string,
  currentStock: number,
  threshold: number
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `📦 MEDPAL STOCK ALERT 📦\n\nHi ${userName}, your stock for ${medicineName} is low (${currentStock} left). Please refill soon!`;

  results.push(await sendSMSNotification(userPhone, smsMessage));
  results.push(
    await sendEmailNotification(
      userEmail,
      '📦 MedPal Stock Alert',
      `<h1>Low Stock Alert</h1>`
    )
  );

  return results;
};

// OTP
export const generateOTP = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (
  phone: string,
  otp: string
): Promise<NotificationResult> => {
  const message = `🏥 Your MedPal verification code is: ${otp}`;
  return await sendSMSNotification(phone, message);
};

// Critical reminder
export const sendCriticalMedicineReminder = async (
  data: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `🚨 CRITICAL ALERT 🚨\nHi ${data.userName}, please take your critical medicine:\n💊 ${data.medicineName}\n📏 ${data.dosage}`;

  if (data.reminderType === 'sms' || data.reminderType === 'both') {
    results.push(await sendSMSNotification(data.userPhone, smsMessage));
  }
  if (data.reminderType === 'email' || data.reminderType === 'both') {
    results.push(
      await sendEmailNotification(
        data.userEmail,
        '🚨 Critical Medicine Reminder',
        `<h1>🚨 Critical Reminder</h1>`
      )
    );
  }

  return results;
};

// Appointment reminder
export const sendAppointmentReminder = async (
  data: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `📅 APPOINTMENT REMINDER 📅\nHi ${data.userName}, you have an appointment on:\n⏰ ${data.appointmentDate}`;

  if (data.reminderType === 'sms' || data.reminderType === 'both') {
    results.push(await sendSMSNotification(data.userPhone, smsMessage));
  }
  if (data.reminderType === 'email' || data.reminderType === 'both') {
    results.push(
      await sendEmailNotification(
        data.userEmail,
        '📅 Appointment Reminder',
        `<h1>Appointment Reminder</h1>`
      )
    );
  }

  return results;
};

// Refill reminder
export const sendRefillReminder = async (
  data: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  const smsMessage = `💊 REFILL REMINDER 💊\nHi ${data.userName}, your medicine ${data.medicineName} will run out soon. Only ${data.daysLeft} days left!`;

  if (data.reminderType === 'sms' || data.reminderType === 'both') {
    results.push(await sendSMSNotification(data.userPhone, smsMessage));
  }
  if (data.reminderType === 'email' || data.reminderType === 'both') {
    results.push(
      await sendEmailNotification(
        data.userEmail,
        '💊 Refill Reminder',
        `<h1>Refill Reminder</h1>`
      )
    );
  }

  return results;
};
