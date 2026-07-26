const highlightBox = document.querySelectorAll('.highlight')[0];

export const highlight = async (element, zoom, zoomOffset) => {

    const observerOptions = {
        root: null,
        rootMargin: "200px",
        scrollMargin: "0px",
        threshold: 0.3,
    };

    await (new Promise(resolve => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(async (entry) => {
                if(entry.isIntersecting) {
                    (async () => {
                        const rect = element.getBoundingClientRect();
                        if(zoom) {
                            document.body.style.transformOrigin =  (rect.left + rect.width/2 + (zoomOffset || 0)) + 'px ' + (rect.top + window.scrollY + rect.height/2) + 'px ';
                            document.body.style.transform = 'scale(' + zoom + ')';
                        }
                        for(let i=0;i<50;i++) {
                            if(i%2) {
                                highlightBox.style.backgroundColor = 'rgba(0, 255, 21, 0.1)'
                            } else {
                                highlightBox.style.backgroundColor = 'rgba(255, 247, 0, 0.1)'
                            }
                            if(i > 25 && zoom) document.body.style.transform = 'scale(1)';
                            const rect = element.getBoundingClientRect();
                            highlightBox.style.top = rect.top + window.scrollY - 30 + 'px';
                            highlightBox.style.left = rect.left + 'px';
                            highlightBox.style.height = rect.height + 30 + 'px';
                            highlightBox.style.width = rect.width + 'px';
                            await new Promise(r => setTimeout(r,100));
                        }
                        highlightBox.style.height = 0 + 'px';
                        observer.unobserve(element);
                        resolve();
                    })();
                }
            })
        }, observerOptions);
        document.fonts.ready.then(() => {
            observer.observe(element);
            const rect = element.getBoundingClientRect();
            window.scrollTo({
                top: rect.top + window.scrollY - window.innerHeight/2, 
                left: 0, 
                behavior: 'smooth'
            });
        });
    }))
}

export const showHide = (element, show) => {
    if(show) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}


let text = '-'
let index = 0;

// export const loader = () => {
//     const loader = document.querySelectorAll('#loader')[0];
//     if(index < 10) {
//         index++;
//         text = text + '-';
//     } else {
//         index = 0;
//         text = '';
//     }
//     loader.innerHTML = text;
// }