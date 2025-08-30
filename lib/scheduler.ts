import { supabase } from './supabase';
import { sendMedicineReminder, sendMissedMedicineNotification } from './notifications';

interface ScheduledReminder {
  id: string;
  userId: string;
  medicineId: string;
  scheduledTime: string;
  status: 'pending' | 'taken' | 'missed';
  medicineName: string;
  dosage: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  reminderType: 'sms' | 'email' | 'both';
}

// Check for due reminders every minute
export const checkDueReminders = async () => {
  try {
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes buffer
    
    // Get all pending reminders due within the next 5 minutes
    const { data: reminders, error } = await supabase
      .from('medicine_reminders')
      .select(`
        *,
        medicines (
          name,
          dosage
        ),
        users (
          name,
          email,
          phone
        )
      `)
      .eq('status', 'pending')
      .gte('scheduled_time', now.toISOString())
      .lte('scheduled_time', fiveMinutesFromNow.toISOString())
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.error('Error fetching due reminders:', error);
      return;
    }

    if (!reminders || reminders.length === 0) {
      return;
    }

    console.log(`Found ${reminders.length} due reminders`);

    // Process each reminder
    for (const reminder of reminders) {
      await processReminder(reminder);
    }

  } catch (error) {
    console.error('Error checking due reminders:', error);
  }
};

// Process individual reminder
const processReminder = async (reminder: any) => {
  try {
    const notificationData = {
      userId: reminder.user_id,
      userName: reminder.users?.name || 'User',
      userEmail: reminder.users?.email || '',
      userPhone: reminder.users?.phone || '',
      medicineName: reminder.medicines?.name || 'Medicine',
      dosage: reminder.medicines?.dosage || '',
      scheduledTime: reminder.scheduled_time,
      reminderType: 'both' as const // Default to both SMS and email
    };

    // Send notification
    const results = await sendMedicineReminder(notificationData);
    
    // Log results
    const successCount = results.filter(r => r.success).length;
    console.log(`Reminder ${reminder.id}: ${successCount}/${results.length} notifications sent successfully`);

    // Update reminder status to indicate notification was sent
    await supabase
      .from('medicine_reminders')
      .update({ 
        status: 'pending', // Keep as pending until user marks as taken
        updated_at: new Date().toISOString()
      })
      .eq('id', reminder.id);

  } catch (error) {
    console.error(`Error processing reminder ${reminder.id}:`, error);
  }
};

// Check for missed reminders (every 15 minutes)
export const checkMissedReminders = async () => {
  try {
    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
    
    // Get reminders that are still pending and overdue by more than 15 minutes
    const { data: missedReminders, error } = await supabase
      .from('medicine_reminders')
      .select(`
        *,
        medicines (
          name,
          dosage
        ),
        users (
          name,
          email,
          phone
        )
      `)
      .eq('status', 'pending')
      .lt('scheduled_time', fifteenMinutesAgo.toISOString())
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.error('Error fetching missed reminders:', error);
      return;
    }

    if (!missedReminders || missedReminders.length === 0) {
      return;
    }

    console.log(`Found ${missedReminders.length} missed reminders`);

    // Process each missed reminder
    for (const reminder of missedReminders) {
      await processMissedReminder(reminder);
    }

  } catch (error) {
    console.error('Error checking missed reminders:', error);
  }
};

// Process missed reminder
const processMissedReminder = async (reminder: any) => {
  try {
    const notificationData = {
      userId: reminder.user_id,
      userName: reminder.users?.name || 'User',
      userEmail: reminder.users?.email || '',
      userPhone: reminder.users?.phone || '',
      medicineName: reminder.medicines?.name || 'Medicine',
      dosage: reminder.medicines?.dosage || '',
      scheduledTime: reminder.scheduled_time,
      reminderType: 'both' as const
    };

    // Send missed medicine notification
    const results = await sendMissedMedicineNotification(notificationData);
    
    // Log results
    const successCount = results.filter(r => r.success).length;
    console.log(`Missed reminder ${reminder.id}: ${successCount}/${results.length} notifications sent successfully`);

    // Update reminder status to missed
    await supabase
      .from('medicine_reminders')
      .update({ 
        status: 'missed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reminder.id);

  } catch (error) {
    console.error(`Error processing missed reminder ${reminder.id}:`, error);
  }
};

// Check for low stock items (daily at 9 AM)
export const checkLowStockItems = async () => {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Only run once per day at 9 AM
    if (currentHour !== 9) {
      return;
    }

    // Get all inventory items below threshold
    const { data: lowStockItems, error } = await supabase
      .from('medicine_inventory')
      .select(`
        *,
        users (
          name,
          email,
          phone
        )
      `)
      .lt('stock_quantity', 'low_stock_threshold')
      .order('stock_quantity', { ascending: true });

    if (error) {
      console.error('Error fetching low stock items:', error);
      return;
    }

    if (!lowStockItems || lowStockItems.length === 0) {
      return;
    }

    console.log(`Found ${lowStockItems.length} low stock items`);

    // Process each low stock item
    for (const item of lowStockItems) {
      await processLowStockItem(item);
    }

  } catch (error) {
    console.error('Error checking low stock items:', error);
  }
};

// Process low stock item
const processLowStockItem = async (item: any) => {
  try {
    // Import the function here to avoid circular dependencies
    const { sendLowStockNotification } = await import('./notifications');
    
    const results = await sendLowStockNotification(
      item.user_id,
      item.users?.name || 'User',
      item.users?.email || '',
      item.users?.phone || '',
      item.medicine_name,
      item.stock_quantity,
      item.low_stock_threshold
    );
    
    // Log results
    const successCount = results.filter(r => r.success).length;
    console.log(`Low stock alert for ${item.medicine_name}: ${successCount}/${results.length} notifications sent successfully`);

  } catch (error) {
    console.error(`Error processing low stock item ${item.id}:`, error);
  }
};

// Main scheduler function that runs all checks
export const runScheduler = async () => {
  try {
    // Check for due reminders every minute
    await checkDueReminders();
    
    // Check for missed reminders every 15 minutes
    await checkMissedReminders();
    
    // Check for low stock items daily
    await checkLowStockItems();
    
  } catch (error) {
    console.error('Scheduler error:', error);
  }
};

// Start the scheduler (call this when the app starts)
export const startScheduler = () => {
  // Run immediately
  runScheduler();
  
  // Then run every minute
  setInterval(runScheduler, 60 * 1000);
  
  console.log('Medicine reminder scheduler started');
};