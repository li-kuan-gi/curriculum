const draggables = Array.from(document.getElementsByClassName('class'));
const dropZones = Array.from(document.getElementsByClassName('class-cell'));

draggables.forEach(
    element => {
        centralize(element);
        makeDraggable(element);
    }
);

window.addEventListener('resize', _ => draggables.forEach(centralize));

function centralize(element) {
    parentRect = element.parentElement.getBoundingClientRect();
    rect = element.getBoundingClientRect();
    element.style.left = (parentRect.width - rect.width) / 2 + parentRect.x + window.scrollX + 'px';
    element.style.top = (parentRect.height - rect.height) / 2 + parentRect.y + window.scrollY + 'px';
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
    element.addEventListener('touchend', event => { fallIntoZone(event.target, dropZones); });
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

    const offsetX = (event.touches[0].clientX - originTouchX);
    const offsetY = (event.touches[0].clientY - originTouchY);

    this.style.left = parseFloat(this.style.left.slice(0, -2)) + offsetX + 'px';
    this.style.top = parseFloat(this.style.top.slice(0, -2)) + offsetY + 'px';

    originTouchX = event.touches[0].clientX;
    originTouchY = event.touches[0].clientY;
}

function makeClickDraggable(element) {
    element.isMoving = false;

    element.addEventListener('mousedown', _ => { element.isMoving = true; element.style.zIndex = "100"; });
    document.addEventListener('mousemove', event => handleMouseMove(event, element));
    document.addEventListener('mouseup', _ => { element.isMoving = false; });
    element.addEventListener('mouseup', _ => { fallIntoZone(element, dropZones); element.style.zIndex = "0"; });
}

function handleMouseMove(event, element) {
    event.stopPropagation();
    event.preventDefault();

    if (element.isMoving) {
        const offsetX = event.movementX;
        const offsetY = event.movementY;
        element.style.left = parseFloat(element.style.left.slice(0, -2)) + offsetX + 'px';
        element.style.top = parseFloat(element.style.top.slice(0, -2)) + offsetY + 'px';
    }
}

function fallIntoZone(element, zones) {
    originParent = element.parentElement;
    rect = element.getBoundingClientRect();
    position = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    newParent = Array.from(zones).find((v) => {
        cell = v.getBoundingClientRect();
        return cell.left <= position.x
            && position.x < cell.right
            && cell.top <= position.y
            && position.y < cell.bottom;
    });
    if (newParent && newParent.children.length === 0) {
        originParent.removeChild(element);
        newParent.appendChild(element);
    }
    centralize(element);
}