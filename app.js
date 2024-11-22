const divider = document.querySelector('.divider');
const leftColumn = document.querySelector('.column-left');
const rightColumn = document.querySelector('.column-right');
let isDragging = false;


divider.addEventListener('mousedown', function (e) {
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        // Получаем новую ширину левой колонки
        const containerRect = divider.parentNode.getBoundingClientRect();
        const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Ограничиваем ширину от 10% до 90%
        if (newLeftWidth > 20 && newLeftWidth < 80) {
            leftColumn.style.width = `${newLeftWidth}%`;
            rightColumn.style.width = `${100 - newLeftWidth}%`;
        }
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.cursor = 'default';
});

let dropButtons = document.getElementsByClassName('drop-menu');
let modal = null;
let currentButtonId;

document.addEventListener('click', (event) => {

    if (isDropButton(event.target.id)) {
        if (modal == null) {
            currentButtonId = event.target.id;
            modal = document.getElementById(event.target.id + '-modal');
            const buttonRect = document.getElementById(event.target.id).getBoundingClientRect();
            modal.style.top = `${buttonRect.bottom + window.scrollY}px`;
            modal.style.left = `${buttonRect.left + window.scrollX}px`;
            modal.classList.add('visible');
        } else {
            if (currentButtonId == event.target.id) {
                modal.classList.remove('visible');
                modal = null;
            } else {
                modal.classList.remove('visible');
                currentButtonId = event.target.id;
                modal = document.getElementById(event.target.id + '-modal');
                const buttonRect = document.getElementById(event.target.id).getBoundingClientRect();
                modal.style.top = `${buttonRect.bottom + window.scrollY}px`;
                modal.style.left = `${buttonRect.left + window.scrollX}px`;
                modal.classList.add('visible');
            }
        }

    } else {
        modal.classList.remove('visible');
        modal = null;
    }


})

function isDropButton(clickTargetId) {
    for (let button of dropButtons) {
        if (button.id == clickTargetId) {
            return true;
        }
    }
    return false;
}