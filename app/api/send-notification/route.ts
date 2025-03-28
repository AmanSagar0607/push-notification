import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK using environment variables
let firebaseInitialized = false;

const initializeFirebase = () => {
  if (!firebaseInitialized) {
    try {
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      firebaseInitialized = true;
    } catch (error) {
      console.error("Firebase initialization error:", error);
      throw new Error("Failed to initialize Firebase");
    }
  }
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request: NextRequest) {
  try {
    initializeFirebase();
    
    const { token, title, message, link } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400, headers: corsHeaders });
    }

    if (!title || !message) {
      return NextResponse.json({ success: false, error: "Title and message are required" }, { status: 400, headers: corsHeaders });
    }

    const payload: Message = {
      token,
      notification: {
        title,
        body: message,
      },
      data: {
        link,
      },
    };

    const response = await admin.messaging().send(payload);
    return NextResponse.json({ success: true, messageId: response }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405, headers: corsHeaders }
  );
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { success: true },
    { headers: corsHeaders }
  );
}
