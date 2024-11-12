const divider = document.querySelector('.divider');
const leftColumn = document.querySelector('.column-left');
const rightColumn = document.querySelector('.column-right');
let isDragging = false;


divider.addEventListener('mousedown', function(e) {
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', function(e) {
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

document.addEventListener('mouseup', function() {
    isDragging = false;
    document.body.style.cursor = 'default';
});

