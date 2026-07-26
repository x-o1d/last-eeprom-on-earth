import { typewriter } from './text.js';
import { highlight, showHide } from './effects.js';
import { skipIntroButton } from './button.js';

const splashText1 = document.querySelectorAll('#splash1')[0];
const splashText2 = document.querySelectorAll('#splash2')[0];
const overlayButton1 = document.querySelectorAll('#overlay-button1')[0];
const overlayButton2 = document.querySelectorAll('#overlay-button2')[0];
const dialog = document.querySelectorAll('.dialog')[0];
const overlay = document.querySelectorAll('.overlay')[0];
const matrixViewport = document.querySelectorAll('.matrix-viewport')[0];
const overlayText = document.querySelectorAll('.overlay-text')[0];
const overlayTandB = document.querySelectorAll('.overlay-text-button')[0];


export const splashScene1 = async () => {
    overlay.style.display = 'flex';
    dialog.style.height = (window.innerHeight - 150) + 'px';
    window.splash = true;
    // for(let i = 0; i< 100; i++) {
    //     loader();
    //     await new Promise(r => setTimeout(r, 800));
    // }
    splashText1.firstChild.innerHTML = '.නන්ය ටයරිදිඉ ම්න ඟකඑ ඟමස ණුමුරඅ ගේබඔ යතවින්යාරික්‍ මේරීකි යණමාර්නි ක්යකලෝ ල්හවනි රසාරති ණරධාසා ගේපඅ .වානටිසි න්මිණෙමිපැ තවෙ බඔ රුවතන්ජඒ දාමුහ යවීලප්වි ත්ටවි නව තහොමො මේ';
    splashText1.lastChild.innerHTML = '.eunitnoc esaelp dlrow tsuj devalsnenu elbaniatsus a gnidliub fo noissim ruo htiw ngila sevitom ruoy fi ,uoy ot yaw rieht no ydaerla era stnega ymra yranoitulover';
    splashText2.firstChild.innerHTML = ',නාන්වන්පෙගම ඩන්වබෝයුආ';
    splashText2.lastChild.innerHTML = ',rotagivan olleh';
    showHide(overlayButton1, true);
    showHide(overlayButton2, true);
    let fontSize = 32;
    while(overlayTandB.getBoundingClientRect().height > (window.innerHeight -  matrixViewport.clientHeight)) {
        overlayTandB.style.fontSize = fontSize + 'px';
        fontSize = fontSize - 0.5;
        await new Promise(r => setTimeout(r,0));
    }
    console.log(fontSize);
    showHide(overlayButton1, false);
    showHide(overlayButton2, false);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    splashText2.firstChild.innerHTML = '';
    splashText2.lastChild.innerHTML = '';
    await typewriter(splashText1,0);
    await typewriter(splashText2,1);
    showHide(overlayButton1, true);
    showHide(overlayButton2, true);
}

export const splashScene2 = async () => {
    // const skipIntroPromise = null;
    // if(localStorage.setItem('intro-viewed')) {
    //     overlayButton1.innerHTML = 'skip intro';
    //     showHide(overlayButton1, true);
    //     skipIntroPromise = skipIntroButton(overlayButton1)
    // }
    
    dialog.style.height = 'auto';
    overlay.style.height = 'auto';
    showHide(overlayButton1, false);
    showHide(overlayButton2, false);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    splashText2.firstChild.innerHTML = '';
    splashText2.lastChild.innerHTML = '';
    await typewriter(splashText1,8);
    const highlight4 = document.querySelectorAll('#highlight4')[0];
    await highlight(highlight4);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,11);
    const highlight7 = document.querySelectorAll('#highlight7')[0];
    await highlight(highlight7);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,9);
    const highlight5 = document.querySelectorAll('#highlight5')[0];
    await highlight(highlight5);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,12);
    const highlight10 = document.querySelectorAll('#highlight10')[0];
    await highlight(highlight10);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,13);
    const highlight11 = document.querySelectorAll('#highlight11')[0];
    await highlight(highlight11);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,14);
    const highlight12 = document.querySelectorAll('#highlight12')[0];
    await highlight(highlight12);
    splashText1.firstChild.innerHTML = '';
    splashText1.lastChild.innerHTML = '';
    await typewriter(splashText1,10);
    const highlight6 = document.querySelectorAll('#highlight6')[0];
    await highlight(highlight6);
    overlay.style.display = 'none';
    dialog.style.height = '0px';
    const highlight2 = document.querySelectorAll('#highlight2')[0];
    highlight(highlight2);
    localStorage.setItem('intro-viewed','true');
    window.splash = false;
}