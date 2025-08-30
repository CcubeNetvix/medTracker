import { NextRequest, NextResponse } from 'next/server';
import { sendMedicineReminder, sendMissedMedicineNotification, sendLowStockNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, 
      notificationData 
    } = body;

    let results;

    switch (type) {
      case 'medicine-reminder':
        results = await sendMedicineReminder(notificationData);
        break;
      
      case 'missed-medicine':
        results = await sendMissedMedicineNotification(notificationData);
        break;
      
      case 'low-stock':
        results = await sendLowStockNotification(
          notificationData.userId,
          notificationData.userName,
          notificationData.userEmail,
          notificationData.userPhone,
          notificationData.medicineName,
          notificationData.currentStock,
          notificationData.threshold
        );
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid notification type' },
          { status: 400 }
        );
    }

    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;

    return NextResponse.json({
      success: true,
      message: `Notifications sent: ${successCount}/${totalCount}`,
      results
    });

  } catch (error) {
    console.error('Notification sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send notifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
