"use client";

import { useState } from "react";
import Image from "next/image";

const contactDetails = [
	{
		label: "EMAIL",
		value: "shashikaneshanrajaguru@gmail.com",
		icon: (
			<svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="2" y="4" width="20" height="16" rx="3" />
				<path d="M2 7l10 6 10-6" />
			</svg>
		),
	},
	{
		label: "PHONE",
		value: "+94 717 23 23 58",
		icon: (
			<svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
			</svg>
		),
	},
	{
		label: "LOCATION",
		value: "Kegalle,Sri Lanka",
		icon: (
			<svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
				<circle cx="12" cy="10" r="3" />
			</svg>
		),
	},
	{
		label: "AVAILABILITY",
		value: "open for work ",
		icon: (
			<svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 6v6l4 2" />
			</svg>
		),
	},
];

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		projectType: "",
		message: "",
		website: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setStatus(null);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Contact request failed");

			setFormData({ name: "", email: "", projectType: "", message: "", website: "" });
			setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
		} catch {
			setStatus({ type: "error", message: "Something went wrong. Please try again or contact me directly." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="contact-section" id="contact" aria-labelledby="contact-heading">
			{/* ambient background orbs */}
			<div className="contact-ambient" aria-hidden="true">
				<span className="contact-orb contact-orb-one" />
				<span className="contact-orb contact-orb-two" />
				<span className="contact-orb contact-orb-three" />
			</div>

			<div className="contact-grid">
				{/* Column 1 — Header + Contact Info */}
				<div className="contact-info">
					<h2 id="contact-heading" className="contact-title">
						LET&apos;S CREATE<br />SOMETHING <span>AMAZING</span>
					</h2>
					<p className="contact-subtitle">
						Have a project in mind or just want to say hi? I&apos;d love to hear from you.
					</p>

					<div className="contact-details">
						{contactDetails.map((detail) => (
							<div className="contact-detail-row" key={detail.label}>
								<div className="contact-detail-icon">{detail.icon}</div>
								<div>
									<span className="contact-detail-label">{detail.label}</span>
									<span className="contact-detail-value">{detail.value}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Column 2 — The Form */}
				<form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
					<input
						type="text"
						name="website"
						value={formData.website}
						onChange={handleChange}
						autoComplete="off"
						tabIndex={-1}
						aria-hidden="true"
						style={{ display: "none" }}
					/>
					<div className="contact-form-row">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							className="contact-input"
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							className="contact-input"
							required
						/>
					</div>
					<select
						name="projectType"
						value={formData.projectType}
						onChange={handleChange}
						className="contact-input contact-select"
						required
					>
						<option value="" disabled>Project Type</option>
						<option value="web">Web Development</option>
						<option value="mobile">Mobile App</option>
						<option value="ui">UI / UX Design</option>
						<option value="other">Other</option>
					</select>
					<textarea
						name="message"
						placeholder="Tell me about your project..."
						value={formData.message}
						onChange={handleChange}
						className="contact-input contact-textarea"
						rows={5}
						required
					/>
					<button type="submit" className="contact-submit" disabled={isSubmitting}>
						{isSubmitting ? "SENDING..." : "SEND MESSAGE"}
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
						</svg>
					</button>
					{status && <p role="status" aria-live="polite">{status.message}</p>}
				</form>

				{/* Column 3 — Futuristic Image */}
				<div className="contact-graphic">
					<Image
						src="/contact-graphic.png"
						alt="Futuristic cybernetic head graphic"
						fill
						sizes="(max-width: 1024px) 0px, 33vw"
						className="contact-graphic-img"
						priority={false}
					/>
				</div>
			</div>
		</section>
	);
}
