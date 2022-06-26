const draggables = document.getElementsByClassName('class');

Array.from(draggables).forEach(
    element => {
        centralize(element);

        let originTouchX;
        let originTouchY;
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
    }
);

function centralize(element) {
    parentRect = element.parentElement.getBoundingClientRect();
    rect = element.getBoundingClientRect();
    element.style.left = (parentRect.width - rect.width) / 2 + parentRect.x + 'px';
    element.style.top = (parentRect.height - rect.height) / 2 + parentRect.y + 'px';
}

function handleTouchStart(event) {
    originTouchX = event.touches[0].clientX;
    originTouchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (this.style.left && this.style.top) {
        const offsetX = (event.touches[0].clientX - originTouchX);
        const offsetY = (event.touches[0].clientY - originTouchY);
        originTouchX = event.touches[0].clientX;
        originTouchY = event.touches[0].clientY;
        this.style.left = parseFloat(this.style.left.slice(0, -2)) + offsetX + 'px';
        this.style.top = parseFloat(this.style.top.slice(0, -2)) + offsetY + 'px';
    } else {
        const rect = this.getBoundingClientRect();
        this.style.left = rect.x + 'px';
        this.style.top = rect.y + 'px';
    }
}
