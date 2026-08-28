"use client";

import { motion } from "framer-motion";

const educationMilestones = [
	{
		year: "2016",
		title: "GCE O/Level",
		institution: "Pinnawala Central College",
		details: "9As",
	},
	{
		year: "2022",
		title: "GCE Advanced Level",
		institution: "Pinnawala Central College",
		details: "Physics (A), Chemistry (B), Biology (C) | Z-score: 1.67",
	},
	{
		year: "2022 – 2023",
		title: "Diploma in Information Technology",
		institution: "E-soft Metro College",
		details: "",
	},
	{
		year: "2024 – Present",
		title: "B.Sc. (Hons) in Information Technology",
		institution: "University of Moratuwa, Faculty of Information Technology",
		details: "Current CGPA: 3.3/4.00",
	},
] as const;

export default function Education() {
	return (
		<section className="education-section" id="education" aria-labelledby="education-heading">
			<motion.div
				className="education-ambient"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.2 }}
				aria-hidden="true"
			>
				<motion.span className="education-orb education-orb-one" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 0.42, scale: 1, transition: { duration: 1.3, ease: "easeOut" } } }} />
				<motion.span className="education-orb education-orb-two" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 0.32, scale: 1, transition: { duration: 1.5, delay: 0.15, ease: "easeOut" } } }} />
				<motion.span className="education-orb education-orb-three" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 0.28, scale: 1, transition: { duration: 1.6, delay: 0.3, ease: "easeOut" } } }} />
				<motion.span className="education-sweep" variants={{ hidden: { opacity: 0, x: "-110%" }, visible: { opacity: 0.3, x: "110%", transition: { duration: 0.9, ease: "easeInOut" } } }} />
			</motion.div>
			<div className="education-heading-row">
				<h2 id="education-heading">Academic journey</h2>
			</div>
			<motion.div
				className="education-timeline"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, amount: 0.2 }}
				variants={{
					hidden: {},
					visible: {},
				}}
			>
				<motion.div
					className="education-line"
					aria-hidden="true"
					variants={{
						hidden: { scaleX: 0, opacity: 0 },
						visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
					}}
				/>
				{educationMilestones.map((milestone, index) => (
					<motion.article
						className={`education-card education-card-${index + 1}`}
						key={milestone.title}
						custom={index}
						variants={{
							hidden: { opacity: 0, y: 28 },
							visible: (cardIndex) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.95 + cardIndex * 0.2, ease: "easeOut" } }),
						}}
					>
						<div className="education-year">{milestone.year}</div>
						<div className="education-card-body">
							<h3>{milestone.title}</h3>
							<p>{milestone.institution}</p>
							{milestone.details && <span>{milestone.details}</span>}
						</div>
					</motion.article>
				))}
			</motion.div>
		</section>
	);
}
