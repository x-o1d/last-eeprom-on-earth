const highlightBox = document.querySelectorAll('.highlight')[0];

export const highlight = async (element, zoom, zoomOffset) => {

    const observerOptions = {
        root: null,
        rootMargin: "200px",
        scrollMargin: "0px",
        threshold: 1.0,
    };

    let observed = false;
    const observer = new IntersectionObserver((entries, observer) => {
        if(observed) return;
        else observed = true;
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
            observed = false;
        })();
    }, observerOptions);


    document.fonts.ready.then(() => {
        observer.observe(element);
        const rect = element.getBoundingClientRect();
        window.scrollTo({top: rect.top + window.scrollY - window.innerHeight/2, left: 0, behavior: 'smooth'});
    });

}