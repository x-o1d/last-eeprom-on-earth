import { textOverlayFlash, textOverlayFlash2 } from './text.js';
import { splashScene2 } from './splash.js';

export const exposeBroadcast = (element, event) => {
    element.addEventListener("click", () => {
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
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            scrollMargin: "0px",
            threshold: 1.0,
        };
        let observed = false;
        const cpuBox = document.querySelectorAll('.cpu')[0];
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    if(observed) return;
                    else observed = true;
                    (async () => {
                        document.getElementsByTagName("body")[0].style.overflowY = 'hidden';
                        await textOverlayFlash(overlayFlashText1, 6);
                        document.getElementsByTagName("body")[0].style.overflowY = 'scroll';
                        observer.unobserve(cpuBox);
                        observed = false;
                    })()
                }
            })
        }, observerOptions);
        observer.observe(cpuBox);
        cpu.scrollIntoView({
            top: 200,
            left: 0,
            behavior: "smooth",
        });
        setTimeout(async () => {
            while(!observed) {
                await textOverlayFlash2(overlayFlashText1, 7);
            }
        }, 1500);
    });
}

export const agreeButton = (element) => {
    element.addEventListener("click", () => {
        splashScene2();
    })
}

let connected = true;
export const disconnectButton = () => {
    const disconnectButton = document.querySelectorAll('#disconnect-button')[0];
    disconnectButton.addEventListener("click", () => {
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'switch-matrix', data: {}});
        }
    });
    
}

disconnectButton();

export const skipIntroButton = (element) => {
    return new Promise(resolve => {
        element.addEventListener("click", () => {
            resolve();
        })
    })
}