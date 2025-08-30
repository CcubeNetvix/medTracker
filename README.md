# MedPal - Healthcare Management Platform

A comprehensive full-stack healthcare management application built with Next.js, featuring medicine reminders, health tracking, and automated notifications via Twilio SMS and email.

## 🚀 Features

### Core Healthcare Management
- **Medicine Reminders**: Schedule and track daily medications
- **Medicine Inventory**: Manage medicine stock and expiry dates
- **Health Charts**: Visualize health metrics and trends
- **Medical Documents**: Secure storage for medical records
- **Appointment Management**: Schedule and track doctor appointments
- **Family Care Dashboard**: Manage family members' health

### 🆕 NEW: Automated Notifications System
- **Twilio SMS Integration**: Send medicine reminders via text message
- **Email Notifications**: Beautiful HTML email reminders
- **Smart Scheduling**: Automated reminder system with configurable timing
- **Missed Dose Alerts**: Automatic notifications for missed medications
- **Low Stock Alerts**: Notifications when medicine supply is running low
- **Family Notifications**: Alert family members for missed doses
- **Quiet Hours**: Reduce notifications during sleep time
- **Test Notifications**: Verify SMS and email delivery

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Notifications**: Twilio SMS API, Nodemailer
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Twilio account (for SMS notifications)
- Gmail account (for email notifications)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd medicalTracker
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Twilio Configuration (for SMS notifications)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration (for email notifications)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 3. Twilio Setup

1. **Create a Twilio Account**:
   - Go to [twilio.com](https://www.twilio.com) and sign up
   - Verify your phone number
   - Get your Account SID and Auth Token from the dashboard

2. **Get a Twilio Phone Number**:
   - In the Twilio Console, go to Phone Numbers → Manage → Buy a number
   - Choose a number that supports SMS capabilities
   - Note down the phone number

3. **Set Environment Variables**:
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### 4. Gmail Setup (for Email Notifications)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your environment variables

3. **Set Environment Variables**:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

### 5. Database Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Run Database Migrations**:
   ```bash
   # The database schema is already included in supabase/migrations/
   # Supabase will automatically run these when you set up your project
   ```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Notification Preferences

Users can configure their notification preferences through the Notification Settings page:

- **SMS Notifications**: Enable/disable text message reminders
- **Email Notifications**: Enable/disable email reminders
- **Reminder Timing**: Set how many minutes before scheduled time to send reminders
- **Quiet Hours**: Configure times when notifications should be reduced
- **Family Notifications**: Set up emergency contacts for missed doses
- **Critical Alerts**: Always notify for important medications

### Testing Notifications

1. Navigate to **Notifications** in the sidebar
2. Configure your preferences
3. Use the **Test SMS** and **Test Email** buttons to verify delivery
4. Check the test results section for delivery status

## 📱 Notification Types

### 1. Medicine Reminders
- **SMS**: Text message with medicine name, dosage, and time
- **Email**: Beautiful HTML email with detailed information
- **Timing**: Configurable (default: 15 minutes before scheduled time)

### 2. Missed Dose Alerts
- **Trigger**: Automatically sent 15 minutes after scheduled time
- **Content**: Urgent reminder with instructions to take medicine
- **Channels**: SMS and email (configurable)

### 3. Low Stock Alerts
- **Trigger**: Daily check at 9 AM for medicines below threshold
- **Content**: Stock level information and refill reminders
- **Channels**: Both SMS and email

### 4. Family Notifications
- **Trigger**: When family notifications are enabled and doses are missed
- **Content**: Alert family members about missed medications
- **Channels**: SMS to family contact phone

## 🔒 Security Features

- **Environment Variables**: All sensitive data stored in environment variables
- **Supabase Auth**: Secure user authentication and authorization
- **Data Encryption**: Database-level encryption for sensitive health information
- **API Rate Limiting**: Built-in protection against abuse

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Twilio notifications"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables in Production

Make sure to set all environment variables in your production environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_email_password
```

## 🧪 Testing

### Test SMS Notifications
1. Ensure Twilio is properly configured
2. Use the test button in Notification Settings
3. Check your phone for the test message
4. Verify delivery status in the test results

### Test Email Notifications
1. Ensure Gmail is properly configured
2. Use the test button in Notification Settings
3. Check your email for the test message
4. Verify delivery status in the test results

## 📊 Monitoring

### Twilio Console
- Monitor SMS delivery status
- View usage statistics
- Check error logs
- Manage phone numbers

### Application Logs
- Check browser console for client-side errors
- Monitor server logs for API errors
- Verify notification delivery status

## 🆘 Troubleshooting

### Common Issues

1. **SMS Not Sending**:
   - Verify Twilio credentials
   - Check phone number format (+1234567890)
   - Ensure sufficient Twilio credits

2. **Email Not Sending**:
   - Verify Gmail credentials
   - Check app password is correct
   - Ensure 2FA is enabled

3. **Notifications Not Working**:
   - Check environment variables
   - Verify database connection
   - Check browser console for errors

### Support

- Check the [Twilio documentation](https://www.twilio.com/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Check application logs for detailed error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Twilio](https://www.twilio.com) for SMS API services
- [Supabase](https://supabase.com) for backend services
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**MedPal** - Your trusted healthcare companion for better health management and improved quality of life. 💊💙
