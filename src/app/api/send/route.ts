import { Resend } from "resend";

const MAX_LENGTHS = { name: 100, email: 254, projectType: 50, message: 5000 } as const;
const requestsByIp = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

type ContactPayload = {
	name?: unknown;
	email?: unknown;
	projectType?: unknown;
	message?: unknown;
	website?: unknown;
};

function getClientIp(request: Request) {
	return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function isRateLimited(ip: string) {
	const now = Date.now();
	const recentRequests = (requestsByIp.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
	if (recentRequests.length >= RATE_LIMIT) {
		requestsByIp.set(ip, recentRequests);
		return true;
	}
	recentRequests.push(now);
	requestsByIp.set(ip, recentRequests);
	return false;
}

function normalizeField(value: unknown, maxLength: number, allowNewlines = false) {
	if (typeof value !== "string") return null;
	const normalized = value.trim();
	return normalized && normalized.length <= maxLength && (allowNewlines || !/[\r\n]/.test(normalized)) ? normalized : null;
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[\r\n]/.test(email);
}

function escapeHtml(value: string) {
	return value.replace(/[&<>'"]/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"'": "&#39;",
		'"': "&quot;",
	}[character] || character));
}

export async function POST(request: Request) {
	if (isRateLimited(getClientIp(request))) {
		return Response.json({ error: "Too many requests" }, { status: 429 });
	}

	let payload: ContactPayload;
	try {
		payload = await request.json();
	} catch {
		return Response.json({ error: "Invalid request body" }, { status: 400 });
	}

	if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
		return Response.json({ error: "Invalid request body" }, { status: 400 });
	}
	if (typeof payload.website === "string" && payload.website.trim()) {
		return Response.json({ success: true });
	}

	const name = normalizeField(payload.name, MAX_LENGTHS.name);
	const email = normalizeField(payload.email, MAX_LENGTHS.email);
	const projectType = normalizeField(payload.projectType, MAX_LENGTHS.projectType) || "Not specified";
	const message = normalizeField(payload.message, MAX_LENGTHS.message, true);
	const recipient = "shashikaneshanrajaguru@gmail.com";

	if (!name || !email || !message || !isValidEmail(email)) {
		return Response.json({ error: "All fields are required and email must be valid" }, { status: 400 });
	}
	if (!process.env.RESEND_API_KEY) {
		console.error("Contact email is not configured: RESEND_API_KEY is missing");
		return Response.json({ error: "Email service is unavailable" }, { status: 500 });
	}

	try {
		const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: [recipient],
			replyTo: email,
			subject: `New Portfolio Message from ${name}`,
			html: `<div style="font-family:sans-serif;padding:20px;color:#333"><h2>New Portfolio Contact Form Submission</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p><hr style="border:none;border-top:1px solid #eee;margin:20px 0"><p><strong>Message:</strong></p><p style="white-space:pre-wrap;background:#f9f9f9;padding:15px;border-radius:8px">${escapeHtml(message)}</p></div>`,
		});

		if (error) {
			console.error("Resend rejected contact email", { name: error.name, message: error.message });
			return Response.json({ error: "Failed to send email" }, { status: 500 });
		}
		return Response.json({ success: true });
	} catch (error) {
		console.error("Failed to send contact email", error);
		return Response.json({ error: "Failed to send email" }, { status: 500 });
	}
}