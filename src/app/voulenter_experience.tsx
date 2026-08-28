"use client";

import { motion } from "framer-motion";

type ExperienceItem = {
	timeline: string;
	role: string;
	organization: string;
};

const experiences: ExperienceItem[] = [
	{
		timeline: "2025 – 2026",
		role: "Mobile Application Development Team Member",
		organization: "Faculty of Information Technology, University of Moratuwa (Team 25/26)",
	},
	{
		timeline: "2024 – Present",
		role: "FIT Moments Photography Club Member",
		organization: "University of Moratuwa",
	},
];

const lineVariants = {
	hidden: { scaleY: 0 },
	visible: { scaleY: 1, transition: { duration: 1.1, ease: "easeOut" as const } },
};

const cardVariants = {
	hidden: (side: "left" | "right") => ({ opacity: 0, x: side === "left" ? -48 : 48, y: 16 }),
	visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function VolunteerExperience() {
	return (
		<motion.section
			id="experience"
			className="experience-section"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, amount: 0.2 }}
			transition={{ duration: 0.7, ease: "easeOut" }}
			aria-labelledby="experience-heading"
		>
			<div className="experience-heading-row">
				<h2 id="experience-heading">Volunteer Experience</h2>
			</div>
			<div className="experience-timeline">
				<motion.div className="experience-line" aria-hidden="true" variants={lineVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} />
				{experiences.map((experience, index) => {
					const side = index % 2 === 0 ? "left" : "right";
					return (
						<motion.article
							className={`experience-card experience-card-${side}`}
							key={experience.role}
							custom={side}
							variants={cardVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: false, amount: 0.2 }}
							transition={{ delay: index * 0.2 }}
						>
							<p className="experience-date">{experience.timeline}</p>
							<h3>{experience.role}</h3>
							<p className="experience-organization">{experience.organization}</p>
						</motion.article>
					);
				})}
			</div>
		</motion.section>
	);
}
