const matrixViewport = document.querySelectorAll('.matrix-viewport')[0];

export const resizeCPU = (cpu) => {        
    setTimeout(async () => {
        let fontSize = 19;
        while((cpu.getBoundingClientRect().height + matrixViewport.clientHeight) > window.innerHeight) {
            cpu.style.fontSize = fontSize + 'px';
            fontSize = fontSize - 0.05;
            await new Promise(r => setTimeout(r,0));
        }
    }, 3000);
}

const cpuElement = document.querySelectorAll('.cpu')[0];

// export const resetZoom = () => {
//     const observerOptions = {
//         root: null,
//         rootMargin: "200px",
//         scrollMargin: "0px",
//         threshold: 0.1,
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if(entry.isIntersecting) {
//                 console.log(entry.intersectionRatio);
//             }
//         })
//     }, observerOptions);    
//     observer.observe(cpuElement);
// }