import twilio from 'twilio';
import nodemailer from 'nodemailer';

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Email configuration
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Initialize Twilio client
const twilioClient = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Initialize email transporter
const emailTransporter = emailUser && emailPass ? nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
}) : null;

export interface NotificationData {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  medicineName: string;
  dosage: string;
  scheduledTime: string;
  reminderType: 'sms' | 'email' | 'both';
}

export interface NotificationResult {
  success: boolean;
  message: string;
  type: 'sms' | 'email';
}

// Send SMS notification via Twilio
export const sendSMSNotification = async (
  phoneNumber: string, 
  message: string
): Promise<NotificationResult> => {
  if (!twilioClient || !twilioPhoneNumber) {
    return {
      success: false,
      message: 'Twilio not configured',
      type: 'sms'
    };
  }

  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhone
    });

    return {
      success: true,
      message: 'SMS sent successfully',
      type: 'sms'
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send SMS',
      type: 'sms'
    };
  }
};

// Send email notification
export const sendEmailNotification = async (
  email: string,
  subject: string,
  htmlContent: string
): Promise<NotificationResult> => {
  if (!emailTransporter) {
    return {
      success: false,
      message: 'Email service not configured',
      type: 'email'
    };
  }

  try {
    await emailTransporter.sendMail({
      from: emailUser,
      to: email,
      subject: subject,
      html: htmlContent
    });

    return {
      success: true,
      message: 'Email sent successfully',
      type: 'email'
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      type: 'email'
    };
  }
};

// Send medicine reminder notification
export const sendMedicineReminder = async (
  notificationData: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  
  // Create SMS message
  const smsMessage = `🔔 MEDPAL REMINDER 🔔\n\nHi ${notificationData.userName},\n\nIt's time to take your medicine:\n💊 ${notificationData.medicineName}\n📏 ${notificationData.dosage}\n⏰ ${new Date(notificationData.scheduledTime).toLocaleTimeString()}\n\nPlease take it now and mark as taken in the app.\n\nStay healthy! 💪`;

  // Create email HTML content
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .medicine-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .time { background: #e3f2fd; padding: 10px; border-radius: 5px; text-align: center; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 MEDPAL Medicine Reminder</h1>
        </div>
        <div class="content">
          <h2>Hi ${notificationData.userName},</h2>
          <p>It's time to take your medicine!</p>
          
          <div class="medicine-card">
            <h3>💊 ${notificationData.medicineName}</h3>
            <p><strong>Dosage:</strong> ${notificationData.dosage}</p>
            <div class="time">
              ⏰ ${new Date(notificationData.scheduledTime).toLocaleString()}
            </div>
          </div>
          
          <p><strong>Please:</strong></p>
          <ul>
            <li>Take your medicine now</li>
            <li>Mark it as taken in the MedPal app</li>
            <li>Stay on schedule for better health</li>
          </ul>
          
          <p>If you have any questions, please consult your healthcare provider.</p>
        </div>
        <div class="footer">
          <p>This is an automated reminder from MedPal - Your trusted healthcare companion</p>
          <p>Stay healthy! 💪</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send notifications based on preference
  if (notificationData.reminderType === 'sms' || notificationData.reminderType === 'both') {
    const smsResult = await sendSMSNotification(notificationData.userPhone, smsMessage);
    results.push(smsResult);
  }

  if (notificationData.reminderType === 'email' || notificationData.reminderType === 'both') {
    const emailResult = await sendEmailNotification(
      notificationData.userEmail,
      '🔔 MedPal Medicine Reminder',
      emailHtml
    );
    results.push(emailResult);
  }

  return results;
};

// Send missed medicine notification
export const sendMissedMedicineNotification = async (
  notificationData: NotificationData
): Promise<NotificationResult[]> => {
  const results: NotificationResult[] = [];
  
  // Create SMS message for missed medicine
  const smsMessage = `⚠️ MEDPAL ALERT ⚠️\n\nHi ${notificationData.userName},\n\nYou missed taking your medicine:\n💊 ${notificationData.medicineName}\n📏 ${notificationData.dosage}\n⏰ ${new Date(notificationData.scheduledTime).toLocaleTimeString()}\n\nPlease take it as soon as possible and update the app.\n\nIf you need assistance, contact your healthcare provider.`;

  // Create email HTML for missed medicine
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .medicine-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid #ff6b6b; }
        .time { background: #ffebee; padding: 10px; border-radius: 5px; text-align: center; font-weight: bold; color: #c62828; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚠️ MEDPAL Missed Medicine Alert</h1>
        </div>
        <div class="content">
          <h2>Hi ${notificationData.userName},</h2>
          <p><strong>You missed taking your medicine!</strong></p>
          
          <div class="medicine-card">
            <h3>💊 ${notificationData.medicineName}</h3>
            <p><strong>Dosage:</strong> ${notificationData.dosage}</p>
            <div class="time">
              ⏰ ${new Date(notificationData.scheduledTime).toLocaleString()}
            </div>
          </div>
          
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Take your medicine as soon as possible</li>
            <li>Mark it as taken in the MedPal app</li>
            <li>Check if you need to adjust your schedule</li>
          </ul>
          
          <p><strong>Important:</strong> If you're unsure about taking a missed dose, please consult your healthcare provider.</p>
        </div>
        <div class="footer">
          <p>This is an automated alert from MedPal - Your trusted healthcare companion</p>
          <p>Stay on track with your health! 💪</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send notifications based on preference
  if (notificationData.reminderType === 'sms' || notificationData.reminderType === 'both') {
    const smsResult = await sendSMSNotification(notificationData.userPhone, smsMessage);
    results.push(smsResult);
  }

  if (notificationData.reminderType === 'email' || notificationData.reminderType === 'both') {
    const emailResult = await sendEmailNotification(
      notificationData.userEmail,
      '⚠️ MedPal Missed Medicine Alert',
      emailHtml
    );
    results.push(emailResult);
  }

  return results;
};

// OTP Generation and Verification
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOTP = async (phone: string, otp: string): Promise<NotificationResult> => {
  const message = `🏥 Your MedPal verification code is: ${otp}. This code will expire in 10 minutes. Do not share this code with anyone.`;
  return await sendSMSNotification(phone, message);
};

// Send low stock notification
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
  
  const smsMessage = `📦 MEDPAL STOCK ALERT 📦\n\nHi ${userName},\n\nYour medicine stock is running low:\n💊 ${medicineName}\n📊 Current: ${currentStock}\n⚠️ Threshold: ${threshold}\n\nPlease refill your prescription soon to avoid running out.\n\nStay prepared! 💪`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ffa726 0%, #ff9800 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .stock-card { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid #ffa726; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📦 MEDPAL Stock Alert</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p><strong>Your medicine stock is running low!</strong></p>
          
          <div class="stock-card">
            <h3>💊 ${medicineName}</h3>
            <p><strong>Current Stock:</strong> ${currentStock}</p>
            <p><strong>Low Stock Threshold:</strong> ${threshold}</p>
          </div>
          
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Refill your prescription soon</li>
            <li>Contact your pharmacy or healthcare provider</li>
            <li>Update your inventory in the MedPal app</li>
          </ul>
          
          <p>Don't wait until you run out - stay prepared for your health!</p>
        </div>
        <div class="footer">
          <p>This is an automated alert from MedPal - Your trusted healthcare companion</p>
          <p>Stay prepared! 💪</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send both SMS and email for stock alerts
  const smsResult = await sendSMSNotification(userPhone, smsMessage);
  results.push(smsResult);

  const emailResult = await sendEmailNotification(
    userEmail,
    '📦 MedPal Stock Alert',
    emailHtml
  );
  results.push(emailResult);

  return results;
};