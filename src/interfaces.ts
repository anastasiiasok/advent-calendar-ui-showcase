export interface CalendarValue {
	calendarDayNode: HTMLDivElement;
	calendarPopupDescriptionNode?: HTMLDivElement;
	calendarPopupImgNode?: HTMLImageElement;
	calendarPopupNode?: HTMLDivElement;
	calendarPopupTitleNode?: HTMLDivElement | HTMLHeadingElement;
	title?: string;
	description?: string;
	imgSrc?: string;
}

export interface OptionsPopup {
	title?: string;
	description?: string;
	imgSrc?: string;
}

export interface PopupNodes {
	popupNode: HTMLDivElement;
	popupCloseNode: HTMLButtonElement;
	popupBodyNode: HTMLDivElement;
	popupContentNode: HTMLDivElement;
	popupTitleNode: HTMLHeadingElement;
	popupDescriptionNode: HTMLParagraphElement;
	popupImgNode: HTMLImageElement;
}

