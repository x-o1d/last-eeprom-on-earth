export const scrollMan = async (matrixViewport, cpu) => {
    while(true) {
        const viewportHeight = window.innerHeight;
        const matrixViewportHeight = matrixViewport.clientHeight;
        const cpuPosition = cpu.getBoundingClientRect().top;
        console.log(viewportHeight, matrixViewportHeight, cpuPosition);
        if(cpuPosition > viewportHeight) {
            matrixViewport.style.bottom = 0 + 'px';
        }
        else if((cpuPosition < matrixViewportHeight)) {
            matrixViewport.style.bottom = viewportHeight - matrixViewportHeight + 'px';
        }
        else if(cpuPosition < viewportHeight) {
            matrixViewport.style.bottom = viewportHeight - cpuPosition + 'px';
        } 
        await new Promise(r => setTimeout(r,0));
        console.log('lol',matrixViewport.style.bottom);
    }
}
