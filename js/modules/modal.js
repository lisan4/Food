function closeModal(modalSelector) { //функция закрытия окна
  const modal = document.querySelector(modalSelector); //само модальное окно
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";//возвращаем скролл страницы при закрытии модального окна
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector); //само модальное окно
  modal.classList.add("show"); //дисплей блок
  modal.classList.remove("hide"); //дисплей нан убираем
  document.body.style.overflow = "hidden"; //убираем скролл страницы при открытии модального окна
  // clearInterval(modalTimerId); //если человек сам открыл окно, то убирает таймер на появление окна по времени
}

function modal(triggerSelector, modalSelector) {

    const modalTrigger = document.querySelectorAll(triggerSelector), //дата атрибут на каждой кнопке и ищем по нему
          modal = document.querySelector(modalSelector); //само модальное окно



modalTrigger.forEach(btn => {
  btn.addEventListener("click", () => {
      openModal(modalSelector);
  });
});

modal.addEventListener("click", (e) =>{
  if (e.target === modal || e.target.getAttribute("data-close") == "") { //если кликаем вне модального окна - оно закрывается
      closeModal(modalSelector);
  }
});

document.addEventListener("keydown", (e) => { //при escape закрывает модальное окно
  if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
  }
});

// const modalTimerId = setTimeout(openModal, 5000); //через 5с открывает модалку

function showModalByScroll() { //показ модалки когда дойдет пользователь до конца страницы
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //складывает высоту прокрутки + высоту окна клиента С 
                                                                                                             //общей высотой скролла и если равно число => мы в конце
      openModal(modalSelector);
      window.removeEventListener("scroll", showModalByScroll); //удаляет обработчик события на скролл, чтобы при повторном скролле не вылезало окно
  }
}

window.addEventListener("scroll", showModalByScroll)  // каждый скролл навешивает функцию по открытию модалки
}

export default modal;
export {closeModal};
export {openModal};