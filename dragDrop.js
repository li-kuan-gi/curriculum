function makeDraggable(element) {
    makeTouchDraggable(element);
    makeClickDraggable(element);
}

function makeTouchDraggable(element) {
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', event => { fallIntoZone(event.target); });
}

function handleTouchStart(event) {
    event.stopPropagation();
    event.preventDefault();

    event.target.attachPointX = event.touches[0].clientX;
    event.target.attachPointY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.stopPropagation();
    event.preventDefault();

    const offsetX = (event.touches[0].clientX - event.target.attachPointX);
    const offsetY = (event.touches[0].clientY - event.target.attachPointY);

    this.style.left = parseFloat(this.style.left.slice(0, -2)) + offsetX + 'px';
    this.style.top = parseFloat(this.style.top.slice(0, -2)) + offsetY + 'px';

    event.target.attachPointX = event.touches[0].clientX;
    event.target.attachPointY = event.touches[0].clientY;
}

function makeClickDraggable(element) {
    element.isMoving = false;

    element.addEventListener('mousedown', _ => { element.isMoving = true; element.style.zIndex = "100"; });
    document.addEventListener('mousemove', event => handleMouseMove(event, element));
    document.addEventListener('mouseup', _ => { element.isMoving = false; });
    element.addEventListener('mouseup', _ => { fallIntoZone(element); element.style.zIndex = "0"; });
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

function fallIntoZone(element) {
    const zones = Array.from(document.getElementsByClassName('klasse-cell'));

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
