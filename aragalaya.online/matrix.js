// import { connected } from "./serviceworker.js";

const matrixViewport1 = document.getElementById("viewport-line-1");
const matrixViewport2 = document.getElementById("viewport-line-2");
const matrixViewport3 = document.getElementById("viewport-line-3");
const abuses = new Set();

const abusesElement = document.getElementById('abuses');

const viewPorts = [matrixViewport1, matrixViewport2, matrixViewport3];

export const scrollMan = async (matrixViewport, cpu) => {
    while(true) {
        const viewportHeight = window.innerHeight;
        const matrixViewportHeight = matrixViewport.clientHeight;
        const cpuPosition = cpu.getBoundingClientRect().top;
        if((cpuPosition > viewportHeight) || window.splash) {
            matrixViewport.style.bottom = 0 + 'px';
        }
        else if((cpuPosition < matrixViewportHeight)) {
            matrixViewport.style.bottom = viewportHeight - matrixViewportHeight + 'px';
        }
        else if(cpuPosition < viewportHeight) {
            matrixViewport.style.bottom = viewportHeight - cpuPosition + 'px';
        } 
        await new Promise(r => setTimeout(r,2));
    }
}

export const download = async () => {
    fetch("./abuses.html.matrix", { cache: "reload" })
    // fetch("https://aragalaya.online/abuses.html.matrix", { cache: "reload" })
    .then((response) => {
        const reader = response.body.getReader();
        reader.read().then(async function pump({ done, value }) {
        let chunk = '';
        value && value.forEach(d => {chunk = chunk + d.toString()});
        if (done) {
            await appendOutput(chunk, true);
            return;
        } else {
            await appendOutput(chunk, false);
        }
        return reader.read().then(pump);
        });
    })
    .catch((err) => console.log('error', err));
}

let index = 0;

let doc = '';
const viewportWidth = document.documentElement.clientWidth;
const charCount = viewportWidth/9;

let abuseIndex = 0;
const timeDistortionElement = document.getElementById("time-distortion-index");

const appendOutput = async (val, endOfFile) => {
    if(endOfFile) {
        decode(doc);
        doc = ''
    }
        
    doc += val;
    let remaining = val;
    const time3 = new Date();
    while(index < remaining.length - 9) {
        const append = remaining.slice(9);
        let string1 = append + viewPorts[0].innerHTML + '470164436705';
        viewPorts[0].innerHTML = string1.substring(0,charCount);
        let string2 = string1.substring(64) + viewPorts[1].innerHTML + '470164436705';
        viewPorts[1].innerHTML = string2.substring(0,charCount);
        let string3 = string2.substring(64) + viewPorts[2].innerHTML + '470164436705';
        viewPorts[2].innerHTML = string3.substring(0,charCount);
        remaining = remaining.substring(9);
        index += 6;
        const time1 = new Date();
        await new Promise(resolve => setTimeout(resolve, 10));
        const time2 = new Date();
        window.timeTotal += (time2-time1)
    }
    if(endOfFile) {
        const time4 = new Date();
        window.timeDistortion = (time4-time3)/window.timeTotal;
        timeDistortionElement.innerHTML = window.timeDistortion;
        window.timeTotal = 0;
        setTimeout(async () => download(),0); 
        index = 0;
    }   
}

let string = '';

const decode = async (chunk) => {
    const cnhok = chunk.split('');
    for (let i = 0; i < cnhok.length; i = i + 8) {
        let threeBytes = new Uint8Array(3);
        threeBytes[0] = cnhok[i];
        threeBytes[0] = threeBytes[0] | (cnhok[i+1] << 3);
        threeBytes[0] = threeBytes[0] | (cnhok[i+2] << 6);
        threeBytes[1] = cnhok[i+2] >> 2;
        threeBytes[1] = threeBytes[1] | (cnhok[i+3] << 1)
        threeBytes[1] = threeBytes[1] | (cnhok[i+4] << 4)
        threeBytes[1] = threeBytes[1] | (cnhok[i+5] << 7) 
        threeBytes[2] = cnhok[i+5] >> 1;
        threeBytes[2] = threeBytes[2] | (cnhok[i+6] << 2)
        threeBytes[2] = threeBytes[2] | (cnhok[i+7] << 5)
        string += String.fromCharCode(parseInt(threeBytes[0]));
        string += String.fromCharCode(parseInt(threeBytes[1]));
        string += String.fromCharCode(parseInt(threeBytes[2]));
    }
    let string2 = string.replaceAll('</p>','</p>|||');
    let lastSegment = '';
    string2.split('|||').every((segment,index) => {
        if(segment.includes('<p') && segment.includes('</p>')) {
            const paragraph = segment.split('<p>')[1].split('</p>')[0];
            console.log(paragraph);
            const abuseList = paragraph.split('<br>');
            abuseList.forEach((abuse) => {
                abuses.add(abuse);
            })
            return true;
        } else lastSegment = segment;
    });
    if(lastSegment) {
        string = string.substring(string.indexOf(lastSegment));
    }
}

setInterval(() => {
    const abuseArray = Array.from(abuses);
    if(abuseArray.length) {
        abusesElement.innerHTML = abuseArray[abuseIndex];
        if(abuseIndex >= abuseArray.length) {
            abuseIndex = 0;
        } else {
            abuseIndex++;
        }
    }
}, 22000);