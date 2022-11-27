import { Observable, Subject } from "rxjs";
import { OptionsPopup, PopupNodes } from "./interfaces";

export class Popup {

	// Тут декларируются переменные, которые будут использоваться в классе
	private nodes: PopupNodes;
	private options: OptionsPopup;
	private activeClassPopup: string = 'popup_open';
	private activeClassBody: string = 'body_overflow-hidden';
	public closeSubj: Subject<boolean> = new Subject();

	constructor(options: OptionsPopup) {
		this.options = options;
		this.onInit();
	}

	/**
	 * Вызывается при создании экземпляра класса Popup
	 */
	private onInit(): void {
		this.initVars();
		this.initAddEventListeners();
		this.appendPopupNodeInBody();
	}

	/**
	 * Создание переменных в классе, в объекте this
	 */
	private initVars(): void {
		const popupNode = this.createPopupNode();
		const popupCloseNode = popupNode.querySelector('.popup__close');
		const popupBodyNode = popupNode.querySelector('.popup__body');
		const popupContentNode = popupNode.querySelector('.popup__content');
		const popupTitleNode = popupNode.querySelector('.popup__title');
		const popupDescriptionNode = popupNode.querySelector('.popup__description');
		const popupImgNode = popupNode.querySelector('.popup__img');


		this.nodes = {
			popupNode: popupNode,
			popupCloseNode: popupCloseNode as HTMLButtonElement,
			popupBodyNode: popupBodyNode as HTMLDivElement,
			popupContentNode: popupContentNode as HTMLDivElement,
			popupTitleNode: popupTitleNode as HTMLHeadingElement,
			popupDescriptionNode: popupDescriptionNode as HTMLParagraphElement,
			popupImgNode: popupImgNode as HTMLImageElement
		};
	}

	private initAddEventListeners(): void {

		this.nodes.popupNode.addEventListener('click', this.popupClickHandler);

	}

	private popupClickHandler = (event: Event) => {
		const targetNode = event.target;

		if (targetNode === this.nodes.popupBodyNode || targetNode === this.nodes.popupCloseNode) {
			this.close();
		};
	};

	/**
	 * Добавить popupNode в body
	 */
	private appendPopupNodeInBody(): void {
		// document.body - это узел из дерева, тег body, в самом JavaScript уже есть доступ к тегу body, его не надо искать с помощью document.querySelector('body')
		document.body.append(this.nodes.popupNode);
	}

	private createPopupNode(): HTMLDivElement {
		const popupNode = document.createElement('div');

		popupNode.classList.add('popup');
		popupNode.innerHTML = `
			<div class="popup__body">
				<div class="popup__content">
					<span class="popup__close">x</span>
					<h1 class="popup__title">${this.options.title || ''}</h1>
					<p class="popup__description">${this.options.description || ''}</p>
					<div class="popup__img-wrapper">
						<img class="popup__img" src="${this.options.imgSrc}">
					</div>
				</div>
			</div>
		`;

		return popupNode;
	}

	public open(): void {
		setTimeout(() => {
			this.nodes.popupNode.classList.add(this.activeClassPopup);
			document.body.classList.add(this.activeClassBody);
		}, 0);
	}

	public close(): void {
		setTimeout(() => {
			this.nodes.popupNode.classList.remove(this.activeClassPopup);
			document.body.classList.remove(this.activeClassBody);
			this.closeSubj.next(true);
		}, 0);
	}

	public edit(options: OptionsPopup): void {
		this.options = options;

		const popupTitleNode = this.nodes.popupTitleNode;
		const popupDescriptionNode = this.nodes.popupDescriptionNode;
		const popupImgNode = this.nodes.popupImgNode;
		if (popupTitleNode !== null && this.options.title !== undefined) {
			popupTitleNode.innerHTML = this.options.title;
		}

		if (popupDescriptionNode !== null && this.options.description !== undefined) {
			popupDescriptionNode.innerHTML = this.options.description;
		}

		if (popupImgNode !== null && this.options.imgSrc !== undefined) {
			popupImgNode.src = this.options.imgSrc;
		}
	}

	public destroy(): void {
		this.nodes.popupNode.remove();
	}
}
