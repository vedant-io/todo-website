import { createUser } from "@/actions/user";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type;

    if (eventType === "user.created") {
      console.log("userId:", evt.data.email_addresses[0].email_address);
      const user = {
        id: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
      };

      await createUser(user);
      console.log("User created:", user);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
