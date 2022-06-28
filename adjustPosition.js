function centralize(element) {
    parentRect = element.parentElement.getBoundingClientRect();
    rect = element.getBoundingClientRect();
    element.style.left = (parentRect.width - rect.width) / 2 + parentRect.x + window.scrollX + 'px';
    element.style.top = (parentRect.height - rect.height) / 2 + parentRect.y + window.scrollY + 'px';
}
