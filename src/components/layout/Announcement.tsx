import Announcement from "@/types/post_objects/announcement";
import axios from "axios";
import AnnoucementClient from "./AnnoucementClient";


async function fetchAnnoucment(): Promise<Announcement | null> {
	try {
		const response = await axios.get(`${process.env.PAREWA_BASE_URI}/api/get_announcement`);

		if (response.data.success) {
			return response.data.announcement;
		}
		console.log(`API ${process.env.PAREWA_BASE_URI}/api/get_announcement returned success: false`)
		return null
	}
	catch (error: any) {
		console.error('Error fetching announcement:', error.message);
		return null
	}
}

export default async function AnnouncementCard() {
	const announcement = await fetchAnnoucment()

	if (!announcement) {
		return null
	}

	return (
		<>
			<AnnoucementClient announcement={announcement} />

		</>
	);
}