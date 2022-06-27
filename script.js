const draggables = document.getElementsByClassName('class');

Array.from(draggables).forEach(
    element => {
        centralize(element);
        makeDraggable(element);
    }
);

function centralize(element) {
    parentRect = element.parentElement.getBoundingClientRect();
    rect = element.getBoundingClientRect();
    element.style.left = (parentRect.width - rect.width) / 2 + parentRect.x + 'px';
    element.style.top = (parentRect.height - rect.height) / 2 + parentRect.y + 'px';
}

function makeDraggable(element) {
    makeTouchDraggable(element);
    makeClickDraggable(element);
}

function makeTouchDraggable(element) {
    let originTouchX;
    let originTouchY;
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
}

function handleTouchStart(event) {
    event.stopPropagation();
    event.preventDefault();
    originTouchX = event.touches[0].clientX;
    originTouchY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.stopPropagation();
    event.preventDefault();
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

function makeClickDraggable(element) {
    element.isMoving = false;
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', event=> handleMouseUp(event, element));
    document.addEventListener('mousemove',event=> handleMouseMove(event, element));
}

function handleMouseDown(event) {
    event.currentTarget.isMoving = true;
}

function handleMouseUp(event, element) {
    element.isMoving = false;
}

function handleMouseMove(event, element) {
    event.stopPropagation();
    event.preventDefault();
    if (element.isMoving) {
        if (element.style.left && element.style.top) {
            const offsetX = event.movementX;
            const offsetY = event.movementY;
            element.style.left = parseFloat(element.style.left.slice(0, -2)) + offsetX + 'px';
            element.style.top = parseFloat(element.style.top.slice(0, -2)) + offsetY + 'px';
        } else {
            const rect = element.getBoundingClientRect();
            element.style.left = rect.x + 'px';
            element.style.top = rect.y + 'px';
        }
    }
}