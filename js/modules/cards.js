//cards Используем классы для карточек
import { getResource } from "../services/services";

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //создаем конструктор карточек и передаем аргументы + рест оператор
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //рест оператор
            this.parent = document.querySelector(parentSelector); //ищем родителя наших карточек, чтобы туда вставить потом карточки
            this.transfer = 27; //конвертор валюты из доллара в гривны
            this.changeToUAH(); // запускаем метод конвектора
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() { //создаем создание карточки
            const element = document.createElement("div"); //создам элемент див, чтобы потом запушить его в родителя

            if (this.classes.length === 0) { //если в рест оператор не прописан класс, то ставится дефолт
                this.element = "menu__item"
                element.classList.add(this.element); //дефолт класс
            } else {
                this.classes.forEach(className => { //добавляем класс из рест оператора
                    element.classList.add(className);
                });
            }

            element.innerHTML = ` 

            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
 
            `;
            this.parent.append(element); //аппендим в родителя карточку
        }
    }

    // getResource("http://localhost:3000/menu") //получаем массив с объектами который содержит меню
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => { //перебираем массив и каждый объект деструктуризируем по отдельным частям
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //рендерит карточки товара 
    //         });
    //     });

    axios.get("http://localhost:3000/menu") //библиотека axios. Автоматический перевод в json и проверка
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { //перебираем массив и каждый объект деструктуризируем по отдельным частям
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //рендерит карточки товара 
            });
        });

    // getResource("http://localhost:3000/menu")
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement("div");

    //         element.classList.add("menu__item");
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });

    //}
}

export default cards;