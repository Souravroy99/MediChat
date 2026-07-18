"use server";

// import { feedbackSchema } from "@/constants"; // kept for reference / validation if needed
import { db } from "@/firebase/admin";
import Groq from "groq-sdk";


export async function getInterviewsByUserId(userId) {
  if (!userId) {
    console.warn("getInterviewsByUserId: userId is undefined or null");
    return [];
  }

  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error in getInterviewsByUserId:", error);
    return [];
  }
}

export async function getLatestInterviews(params = {}) {
  const { limit = 20 } = params;

  try {
    const snapshot = await db
      .collection("medical_chats")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching medical chats:", error);
    return [];
  }
}

export async function getUniqueInterviewById(id) {
  console.log("IIIddd:", id);

  if (!id) return null;

  try {
    const interviewDoc = await db
      .collection("medical_chats")
      .doc(id)
      .get();

    console.log("Exists:", interviewDoc.exists);

    if (!interviewDoc.exists) {
      return null;
    }

    const data = {
      id: interviewDoc.id,
      ...interviewDoc.data(),
    };

    console.log("Final Data:", data);

    return data;
  } catch (error) {
    console.error(
      "Error in getUniqueInterviewById:",
      error
    );
    return null;
  }
}

/**
 * createFeedback
 * - Uses Groq (llama-3.1-8b-instant) to generate a structured JSON evaluation.
 * - Expects `transcript` as an array of { role, content } items.
 * - Saves parsed feedback into Firestore under `feedback`.
 */

export async function saveMedicalSummary(params) {
  const { userId, transcript } = params || {};

  if (!userId || !Array.isArray(transcript)) {
    return {
      success: false,
      message: "Missing required parameters",
    };
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const formattedTranscript = transcript
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const systemPrompt = `
You are a medical conversation summarizer.

Return ONLY a valid JSON object.

Required fields:

{
  "chiefComplaint": "",
  "symptoms": [],
  "possibleConditions": [],
  "recommendations": [],
  "severityLevel": "",
  "summary": ""
}

Rules:
- Do not diagnose with certainty.
- Keep recommendations general.
- Return JSON only.
`;

    const userPrompt = `
Conversation Transcript:

${formattedTranscript}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0,
      max_tokens: 1000,
    });

    const text =
      response?.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);

      if (!match) {
        throw new Error("Invalid JSON response");
      }

      parsed = JSON.parse(match[0]);
    }

    const docRef = await db
      .collection("medical_chats")
      .add({
        userId,

        chiefComplaint:
          parsed.chiefComplaint || "",

        symptoms:
          parsed.symptoms || [],

        possibleConditions:
          parsed.possibleConditions || [],

        recommendations:
          parsed.recommendations || [],

        severityLevel:
          parsed.severityLevel || "",

        summary:
          parsed.summary || "",

        transcript,

        createdAt:
          new Date().toISOString(),
      });

    return {
      success: true,
      chatId: docRef.id,
    };
  } catch (error) {
    console.error(
      "saveMedicalSummary error:",
      error
    );

    return {
      success: false,
    };
  }
}

export async function getMedicalChatsByUserId(userId) {
  if (!userId) return [];

  try {
    const snapshot = await db
      .collection("medical_chats")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// export async function getFeedbackByInterviewId(params = {}) {
//   const { interviewId, userId } = params || {};

//   if (!interviewId || !userId) return null;

//   try {
//     const feedbackSnap = await db
//       .collection("feedback")
//       .where("interviewId", "==", interviewId)
//       .where("userId", "==", userId)
//       .orderBy("createdAt", "desc")
//       .limit(1)
//       .get();

//     if (feedbackSnap.empty) return null;

//     const feedbackDoc = feedbackSnap.docs[0];
//     return { id: feedbackDoc.id, ...feedbackDoc.data() };
//   }
//   catch (error) {
//     console.error("Error in getFeedbackByInterviewId:", error);
//     return null;
//   }
// }