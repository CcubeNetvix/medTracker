# 🚀 MedPal Setup Instructions

## ❌ **Current Problem**
Your sign-in page is not working because the database is not configured.

## ✅ **Solution: Configure Supabase Database**

### **Step 1: Get Supabase Credentials**
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account (or create one)
3. Create a new project or open existing project
4. Go to **Settings** → **API**
5. Copy:
   - **Project URL** (looks like: `https://abc123.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### **Step 2: Create Environment File**
1. In your project folder, create a new file called `.env.local`
2. Add this content (replace with your actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Optional: Twilio for SMS notifications
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Optional: Gmail for email notifications
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### **Step 3: Restart Server**
1. Stop your current server (Ctrl+C)
2. Run: `npm run dev`
3. Open: `http://localhost:3000`

### **Step 4: Test Connection**
1. Go to: `http://localhost:3000/api/debug/users`
2. Should show: `✅ Database connection successful`

### **Step 5: Test Registration & Login**
1. Register a new user
2. Try logging in with those credentials
3. Should work now! 🎉

## 🔍 **What Was Wrong?**
- No `.env.local` file = No database connection
- No database = No user storage
- No user storage = Login fails

## 📁 **File Structure**
```
medicalTracker/
├── .env.local          ← Create this file
├── package.json
├── app/
├── components/
└── ...
```

## 🆘 **Need Help?**
1. Check the setup guide in your app
2. Use the debug endpoint: `/api/debug/users`
3. Check browser console for error messages

**After following these steps, your sign-in will work perfectly!** 🚀
