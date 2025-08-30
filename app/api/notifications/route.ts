import { NextRequest, NextResponse } from 'next/server';
import {
  sendMedicineReminder,
  sendCriticalMedicineReminder,
  sendAppointmentReminder,
  sendRefillReminder,
} from '@/lib/notifications';
import { verifyToken } from '@/lib/auth';

interface NotificationRequestBody {
  type: 'medicine_reminder' | 'critical_medicine_reminder' | 'appointment_reminder' | 'refill_reminder';
  data: {
    medicine?: string;
    reminderTime?: string;
    appointment?: string;
    daysLeft?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    // 🔑 Get and verify JWT token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 📩 Parse request body
    const body: NotificationRequestBody = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'medicine_reminder':
        if (!data.medicine || !data.reminderTime) {
          return NextResponse.json({ error: 'Missing medicine or reminderTime' }, { status: 400 });
        }
        result = await sendMedicineReminder(user, data.medicine, data.reminderTime);
        break;

      case 'critical_medicine_reminder':
        if (!data.medicine || !data.reminderTime) {
          return NextResponse.json({ error: 'Missing medicine or reminderTime' }, { status: 400 });
        }
        result = await sendCriticalMedicineReminder(user, data.medicine, data.reminderTime);
        break;

      case 'appointment_reminder':
        if (!data.appointment) {
          return NextResponse.json({ error: 'Missing appointment details' }, { status: 400 });
        }
        result = await sendAppointmentReminder(user, data.appointment);
        break;

      case 'refill_reminder':
        if (!data.medicine || data.daysLeft === undefined) {
          return NextResponse.json({ error: 'Missing medicine or daysLeft' }, { status: 400 });
        }
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
