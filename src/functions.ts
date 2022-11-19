import { CalendarValue } from "./interfaces";

export function getCalendarValues() {
	const calendarDayNodeList: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.calendar__day');
	const calendarDayNodes: HTMLDivElement[] = Array.from(calendarDayNodeList);

	return calendarDayNodes.map(calendarDayNode => {
		const totalObj: any = {};
		const calendarPopupNode: HTMLDivElement | null = calendarDayNode.querySelector('.calendar__popup');
		const calendarPopupTitleNode: HTMLDivElement | HTMLHeadingElement | null = calendarDayNode.querySelector('.calendar__popup-title');
		const calendarPopupDescriptionNode: HTMLDivElement | null = calendarDayNode.querySelector('.calendar__popup-description');
		const calendarPopupImgNode: HTMLImageElement | null = calendarDayNode.querySelector('.calendar__popup-img');

		totalObj.calendarDayNode = calendarDayNode;

		if (calendarPopupNode !== null) {
			totalObj.calendarPopupNode = calendarPopupNode;
		}

		if (calendarPopupTitleNode !== null) {
			totalObj.calendarPopupTitleNode = calendarPopupTitleNode;
			totalObj.title = calendarPopupTitleNode.innerHTML;
		}

		if (calendarPopupDescriptionNode !== null) {
			totalObj.calendarPopupDescriptionNode = calendarPopupDescriptionNode;
			totalObj.description = calendarPopupDescriptionNode.innerHTML;
		}

		if (calendarPopupImgNode !== null) {
			totalObj.calendarPopupImgNode = calendarPopupImgNode;
			totalObj.imgSrc = calendarPopupImgNode.src;
		}

		return totalObj as CalendarValue;
	});
}
