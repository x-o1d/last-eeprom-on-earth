import { textOverlayFlash } from './text.js';

export const exposeBroadcast = (element, event) => {
    element.addEventListener("click", () => {
        console.log('clicked')
        if(element.parentNode.nextElementSibling.style.maxHeight !== '500px') {
            element.parentNode.nextElementSibling.style.maxHeight = '500px';
        } else {
            element.parentNode.nextElementSibling.style.maxHeight = '0px';
        }
        if(event) event();
    })
}

export const goTo14 = (element, cpu) => {
    const overlayFlashText1 = document.querySelectorAll('#text-overlay-flash1')[0];
    element.addEventListener("click", () => {
        cpu.scrollIntoView({
            top: 200,
            left: 0,
            behavior: "smooth",
        });
        textOverlayFlash(overlayFlashText1, 6);
    });
}