import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK using environment variables
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { token, title, message, link } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" });
    }

    const payload: Message = {
      token,
      notification: {
        title,
        body: message,
      },
      webpush: link
        ? {
            fcmOptions: {
              link,
            },
          }
        : undefined,
    };

    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Notification Error:", error);
    
    const errorMessage = (error as Error).message || "An unknown error occurred";
    return NextResponse.json({ success: false, error: errorMessage });
  }
}