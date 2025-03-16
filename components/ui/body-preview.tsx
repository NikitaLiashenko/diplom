"use client";

import { Gender } from "@prisma/client";
import * as React from "react";

interface BodyPreviewProps {
	gender?: Gender;
}

const imagesUrl = {
	male: ['/man-workout-1.svg', '/man-workout-2.svg', '/man-workout-3.svg', '/man-workout-4.svg'],
	female: ['/woman-workout-1.svg', '/woman-workout-2.svg', '/woman-workout-3.svg', '/woman-workout-4.svg'],
}

const BodyPreview = ({ gender }: BodyPreviewProps) => {
	const [image, setImage] = React.useState<string>();
	const [loaded, setLoaded] = React.useState(false);

	function getImage() {
		if (gender && imagesUrl[gender]) {
			return imagesUrl[gender][Math.floor(Math.random() * imagesUrl[gender].length)];
		}
		const allImages = [...imagesUrl.male, ...imagesUrl.female];
		return allImages[Math.floor(Math.random() * allImages.length)];
	}

	React.useEffect(() => {
		// 1. Smoothly hide the old image before changing
		setLoaded(false);

		// 2. Wait 200ms before changing the image
		const timeout = setTimeout(() => {
			const newImage = getImage();
			const img = new Image();
			img.src = newImage;

			img.onload = () => {
				setImage(newImage);
				setLoaded(true); // 3. Show the new image smoothly
			};
		}, 200); // Delay the image change so that the hide animation can work

		return () => clearTimeout(timeout);
	}, [gender]);

	return (
		<div style={{
			backgroundImage: `url("${image}")`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'contain',
			opacity: loaded ? 1 : 0,
			transition: "opacity 0.3s ease-in-out",
		}} className="w-[39vw] hidden sm:block" />
	);
}

export default BodyPreview;