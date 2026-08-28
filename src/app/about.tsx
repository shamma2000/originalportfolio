"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
	const containerVariants = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.15 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const Highlight = ({ children }: { children: React.ReactNode }) => (
		<span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
			{children}
		</span>
	);

	return (
		<section className="about-section" id="about-me" aria-labelledby="about-heading">
			<div className="about-layout">
				<div className="about-photo">
					<Image src="/IMG_1996.JPG.png" alt="Neshan Rajaguru outdoors" fill sizes="(max-width: 760px) 100vw, 38vw" className="about-image" />
				</div>
				<motion.div 
					className="about-copy"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.2 }}
				>
					<motion.h2 
						className="about-heading" 
						id="about-heading"
						variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
					>
						Who Am I
					</motion.h2>
					<p className="about-description">
						<motion.span variants={itemVariants} className="inline">
							Hi, I&apos;m Neshan Rajaguru.{" "}
						</motion.span>
						<motion.span variants={itemVariants} className="inline">
							I am an IT undergraduate at the <Highlight>Faculty of Information Technology, University of Moratuwa</Highlight>, with a strong passion for <Highlight>cybersecurity</Highlight>.{" "}
						</motion.span>
						<motion.span variants={itemVariants} className="inline">
							I actively immerse myself in studying the latest <Highlight>AI algorithms</Highlight> and data methodologies to gather valuable career insights and build secure, intelligent systems.{" "}
						</motion.span>
						<motion.span variants={itemVariants} className="inline">
							Beyond my academic and technical pursuits, I am a <Highlight>passionate photographer</Highlight> active in the <Highlight>Sri Lankan wedding industry</Highlight>, where I enjoy blending my creative eye with technical precision to capture unforgettable moments.
						</motion.span>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
