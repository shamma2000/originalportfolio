import nodemailer from "nodemailer";

const MAX_LENGTHS = {
	name: 100,
	email: 254,
	projectType: 50,
	message: 5000,
} as const;

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

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[\r\n]/.test(email);
}

function normalizeField(value: unknown, maxLength: number, allowNewlines = false) {
	if (typeof value !== "string") return null;
	const normalized = value.trim();
	return normalized && normalized.length <= maxLength && (allowNewlines || !/[\r\n]/.test(normalized)) ? normalized : null;
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

export async function POST(request: Request) {
	const clientIp = getClientIp(request);

	if (isRateLimited(clientIp)) {
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
		return Response.json({ message: "Message sent successfully" });
	}

	const name = normalizeField(payload.name, MAX_LENGTHS.name);
	const email = normalizeField(payload.email, MAX_LENGTHS.email);
	const projectType = normalizeField(payload.projectType, MAX_LENGTHS.projectType);
	const message = normalizeField(payload.message, MAX_LENGTHS.message, true);

	if (!name || !email || !projectType || !message || !isValidEmail(email)) {
		return Response.json({ error: "Please provide valid contact details" }, { status: 400 });
	}

	const smtpPort = Number(process.env.SMTP_PORT || 465);
	const contactEmail = process.env.CONTACT_EMAIL;

	if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !contactEmail || !Number.isInteger(smtpPort)) {
		console.error("Contact email is not configured: missing SMTP environment variables");
		return Response.json({ error: "Email service is unavailable" }, { status: 500 });
	}

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: smtpPort,
		secure: smtpPort === 465,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: contactEmail,
			replyTo: email,
			subject: `New Portfolio Contact - ${projectType}`,
			text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}\n\nVisitor email:\n${email}`,
		});

		return Response.json({ message: "Message sent successfully" });
	} catch (error) {
		console.error("Failed to send contact email", error);
		return Response.json({ error: "Email service is unavailable" }, { status: 500 });
	}
}