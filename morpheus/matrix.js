export const scrollMan = async (viewport,cpu) => {
    while(true) {
        const viewportHeight = window.innerHeight;
        const matrixViewportHeight = viewport.clientHeight;
        const cpuPosition = cpu.getBoundingClientRect().top;
        if(cpuPosition > viewportHeight) {
            viewport.style.bottom = 0 + 'px';
        }
        else if((cpuPosition < matrixViewportHeight)) {
            viewport.style.bottom = viewportHeight - matrixViewportHeight + 'px';
        }
        else if(cpuPosition < viewportHeight) {
            viewport.style.bottom = viewportHeight - cpuPosition + 'px';
        } 
        await new Promise(r => setTimeout(r,0));
    }
}
