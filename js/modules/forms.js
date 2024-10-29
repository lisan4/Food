import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро вы с вами свяжемся",
        failure: "ЧТо то пошло не так..."
    };

    forms.forEach(item => { //на каждую форму подвязываем функцию
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img"); // добавляем див на страницу куда потом вставим текст
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; //выводим сообщение загрузка
            form.insertAdjacentElement("afterend", statusMessage); //ставим спинер после формы


            // request.setRequestHeader("Content-type", "multipart/form-data"); //когда есть XMLhttp + formdata - то заголовок не нужен
            // request.setRequestHeader("Content-type", "application/json"); //превращаем в json

            const formData = new FormData(form); 

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //сначала превращаем в массив массивов, после этого превращаем в классический объект
                                                                                // затем превращаем объект в json



            postData("https://jsonplaceholder.typicode.com/posts", json)
            .then(data => {
                closeModal('.modal');
                console.log(data); //данные которые возвращает сервер
                showThanksModal(message.success); //выводим сообщение ok
                statusMessage.remove(); //удаляем спиннер
            }).catch(() => { //ошибка
                showThanksModal(message.failure); //выводим сообщение fail
            }).finally(() => {
                form.reset();
            })

        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.remove("show"); //убираем показ формы

        prevModalDialog.classList.add("hide"); //добавляем показ окна спасибо всё ок
        openModal('.modal');

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal('.modal');
        }, 4000);

    }
}

export default forms;