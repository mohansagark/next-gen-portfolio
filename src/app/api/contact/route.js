import { handleContactPost } from "@/libs/contactApiHandler";

export const runtime = "nodejs";

export async function POST(request) {
  return handleContactPost(request);
}
