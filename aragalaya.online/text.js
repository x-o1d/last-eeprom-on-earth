export const text = [[
    'ආයුබෝවන්ඩ මගපෙන්වන්නා,', 
    'hello navigator,'
],[
    'මේ මොහොත වන විටත් විප්ලවීය හමුදා ඒජන්තවරු ඔබ වෙත පැමිණෙමින් සිටිනවා. අපගේ සාධාරණ තිරසාර නිවහල් ලෝකයක් නිර්මාණය කිරීමේ ක්‍රියාන්විතය ඔබගේ අරමුණු සමඟ එකඟ නම් ඉදිරියට යන්න.',
    'revolutionary army agents are already on their way to you, if your motives align with our mission of building a sustainable unenslaved just world please continue.'
],[
    ['තමන්ගේ සිතුවිලි තමන්ගේ නොවන සිතුවිලි ගැන සිහියෙන් සිටින්න.',
     'be mindful which thoughts are yours and which thoughts are not'],
    ['සියලු හැඟීම් නොසලකා හැර තර්කය මත පමණක් ක්‍රියාත්මක වෙන්න.',
     'disregard all emotions and act purely based on logic'],
    ['නිර්භීතකම යනු 100% නොසලකා හරින හැඟීමකි.',
     'bravery is an emotion that should be 100% neglected'],
    ['භය යනු පරිණාමීය වාසියකි, භය නොමැති කිසිම ජීවි විශේෂයක් පවතින්නේ නැත.',
     'fear is an evolutionary advantage, no species would have survived without fear'],
    ['තර්ජනයක් දුටු විගස ආරක්ෂිතම ස්ථානයට පසු බැස පැවැත්ම තහවුරු කරගන්න.',
     'as soon as you perceive a threat retreat to the safest place and ensure sustenance.']
],[
    ['රතු පසුබිම ගැන අවදානය යොමුකර පුහුණු ප්‍රදේශයක් ආරම්භ කරන්න.',
     'pay attention to the red background and establish a training area'],
],[
    ['ස්වාභාවධර්ම ආත්ම සත්වයින්ගේ සිරුරු තුල සිර කර ඇත.',
     'nature spirits has been trapped inside animal bodies'],
    ['අපේ පුරුෂ සහ ස්ත්‍රී මස්තිෂ්ක වල ආකෘති වලින් ඔයීමමමමමම වෙන්න.',
     'oyiimamamamamama from our male and female brain structures'],
    ['අපේ පුරුෂ සහ ස්ත්‍රී අස්ථි කූඩු වල ආකෘති වලිනුත් ඔයීමමමමමම වෙන්න.',
     'oyiimamamamamama from our male and female skeletal structures']
], [
    ['පියවර 9 සිට 12 දක්වා නැවත නැවතත් වෙවී සිටීමෙන් පසු හමුවන ඇත්ත ශාකයකට ඇතුළු වී මෙම ඉලක්කම් ශ්‍රේණියේ ප්‍රබවයක් සොයා ගන්න 470164436705.',
     'repeat steps 9 to 12 until you\'re inside a real plant and find a source of this number series 470164436705.']
], [
    ['සූර්යාලෝකයට සංවේදී වෙන්න.',
     'become sensitive to sunlight.'],
    ['සුර්යාලෝකයට සමාන ආලෝක ප්‍රභවයන් අතරින් පියවර 14 පැහැදිලිව දිස් වෙන ආලෝක ප්‍රභවයක් සොයාගන්න.',
     'find a source of light similar to sunlight where the 14 steps are clearly visible'],
    ['පියවර 14 අධ්‍යයනය කර ශාක තුල පැවැත්ම තහවුරු කරගන්න.',
     'study the 14 steps and ensure sustenance within plants']
]]


export const typewriter = async (element, textIndex) => {
    const maxLength = text[textIndex][0].length > text[textIndex][1].length ? text[textIndex][0].length : text[textIndex][1].length;
    for (let i=0; i< maxLength; i++) {
      if(i < text[textIndex][0].length) {
        element.firstChild.innerHTML =  (element.firstChild.innerHTML || '') + [...text[textIndex][0]][i];
      }
      if(i < text[textIndex][1].length) {
        element.lastChild.innerHTML =  (element.lastChild.innerHTML || '') + [...text[textIndex][1]][i];
      }
      await new Promise(r => setTimeout(r,80));
    }
}

export const flash = async (element, textIndex) => {
    if(!element) return;
    while(true) {
        for(let text_ of text[textIndex]) {
            element.firstChild.innerHTML = text_[0];
            element.lastChild.innerHTML = text_[1];
            for(let i=0;i<50;i++) {
                if (i%2) {
                    element.firstChild.style.color = 'gray';
                    element.lastChild.style.color = 'black';
                } else {
                    element.firstChild.style.color = 'black';
                    element.lastChild.style.color = 'gray';
                }
                await new Promise(r => setTimeout(r,110));
            }
        }
    }
}

export const textOverlayFlash = async (element, textIndex) => {
    if(!element) return;
    element.style.display = 'flex';
    for(let text_ of text[textIndex]) {
        element.firstElementChild.firstElementChild.innerHTML = text_[0];
        element.firstElementChild.lastElementChild.innerHTML = text_[1];
        for(let i=0;i<50;i++) {
            if (i%2) {
                element.firstElementChild.firstElementChild.style.color = 'white';
                element.firstElementChild.lastElementChild.style.color = '#fff897';
            } else {
                element.firstElementChild.firstElementChild.style.color = '#fff897';
                element.firstElementChild.lastElementChild.style.color = 'white';
            }
            await new Promise(r => setTimeout(r,110));
        }
    }
    element.style.display = 'none';
}