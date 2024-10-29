//TABS
function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide"); //ставим все в дисплей none
            item.classList.remove("show", "fade"); //убираем то что не дисплей none
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); //удаляем подсветку табов курсивом
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass); //по дефолту выставляем первый таб
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) { //при клике на родителя табов, то есть на обертку
        const target = event.target; //чтобы легче было
        // console.log(target); //target - выдяет див в котором лежит каждый пункт меню

        if (target && target.classList.contains(tabsSelector.slice(1))) { //проверяет есть ли вообще target и есть ли у этого таргета класс tabgeader__item
            tabs.forEach((item, i) => { //перебирает все табы, i порядковый номер
                if (target == item) { //если таргет = нашему item на который мы кликаем, то выполняем функции
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;