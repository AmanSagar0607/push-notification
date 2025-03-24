import { NextResponse } from 'next/server';
import admin from '../../../lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { token, title, body, image } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const message = {
      token,
      notification: {
        title,
        body,
        image
      },
      data: {
        click_action: '/',
        timestamp: new Date().toISOString()
      }
    };

    await admin.messaging().send(message);

    return NextResponse.json(
      { message: 'Notification sent successfully' }
    );
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
