import { NextRequest, NextResponse } from 'next/server';
import { sendMedicineReminder, sendCriticalMedicineReminder, sendAppointmentReminder, sendRefillReminder } from '@/lib/notifications';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'medicine_reminder':
        result = await sendMedicineReminder(user, data.medicine, data.reminderTime);
        break;
      
      case 'critical_medicine_reminder':
        result = await sendCriticalMedicineReminder(user, data.medicine, data.reminderTime);
        break;
      
      case 'appointment_reminder':
        result = await sendAppointmentReminder(user, data.appointment);
        break;
      
      case 'refill_reminder':
        result = await sendRefillReminder(user, data.medicine, data.daysLeft);
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}