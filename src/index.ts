import { getCalendarValues } from "./functions";
import { Popup } from "./Popup";


// Это создание экземпляра класса Popup
// popup - экземпляр класса Popup
// console.log(popup);
// popup.open();

const calendarValues = getCalendarValues();

for (const calendarValue of calendarValues) {
	const calendarPopupNode = calendarValue.calendarPopupNode;
	const calendarDayNode = calendarValue.calendarDayNode;
	const node = calendarDayNode.querySelector('.calendar__day-preview')?.innerHTML.trim();

	if (calendarPopupNode && node !== undefined) {
		const lol = localStorage.getItem('boxes_opened') || '';
		if (lol && lol?.split(' ').includes(node)) {
			// show previously opened nodes
			calendarDayNode.classList.add('calendar__day_active');
		}
		if (+node) {
			calendarDayNode.addEventListener('click', () => {

				if (calendarDayNode.classList.contains('calendar__day_active')) {
					return false;
				}

				const popup = new Popup({
					title: calendarValue.title,
					description: calendarValue.description,
					imgSrc: calendarValue.imgSrc
				});
				popup.open();
				localStorage.setItem('boxes_opened', lol + ' ' + node);
				popup.closeSubj.subscribe(item => {
					calendarDayNode.classList.add('calendar__day_active');
				});
			});
		} else {
			calendarDayNode.classList.add('disabled');
		}
	}
}




// popup.open();

// console.log(popup);




