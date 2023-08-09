/**
 * Before ES6 and all those fancy imports this is how they used to 
 * import files with vanilla javascript, simple but functional xD
 * @param {string} file 
 */
function importFile(file) {
    let script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;
    
    document.getElementsByTagName('head').item(0).appendChild(script);
}

/**
 * @param {string} paramName 
 * @returns the value for the URL param requested
 */
 function findUrlParam(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
}

/**
 * Allow visibility for an HTML collection
 * @param {string} collectionName 
 */
function showCollection(collectionName) {
    const collection = document.getElementsByClassName(collectionName);
    for (const i in collection) {
        if (Object.hasOwnProperty.call(collection, i)) {
            const item = collection[i];
            item.classList.toggle('invisible');
            item.classList.toggle('noprint');
        }
    }
}

importFile('./js/cookieManager.js');
const printButton = document.getElementById('print-button');


//
// Language switch
//
const langLink = document.getElementsByClassName('lang');
for (const i in langLink) {
    if (Object.hasOwnProperty.call(langLink, i)) {
        const actualLink = langLink[i];
        actualLink.addEventListener('click', (event) => {
            setCookie('lang', actualLink.getAttribute('data-lang').toLowerCase(), 30);
        });
    }
}


//
// Theme switch
//
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', (event) => {
    document.body.classList.toggle('dark');
    printButton.classList.toggle('btn-dark');
  
    let theme = '';
  
    if (event.currentTarget.checked) {
        theme = 'dark';
    }
  
    setCookie('theme', theme, 30);
});

//
// References data switch
//
const refSwitch = document.getElementById('ref-switch');
if (refSwitch) {
    refSwitch.addEventListener('change', () => {
        showCollection('ref-data');
    });
}

//
// Old data switch
//
const oldSwitch = document.getElementById('old-switch');
if (oldSwitch) {
    oldSwitch.addEventListener('change', () => {
        showCollection('old-data');
    });
}


//
// Show references and old data
//
['ref', 'old'].forEach(i => {
    const param = findUrlParam(i);
    if (param) {
        showCollection(`${i}-data`);
    }
});


window.onload = function() {
    //
    // Get theme
    //
    const themeSelected = getCookie('theme');

    if (themeSelected && themeSelected === 'dark') {
        document.body.classList.add('dark');
        printButton.classList.add('btn-dark');
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove('dark');
        printButton.classList.remove('btn-dark');
        themeSwitch.checked = false;
    }

    //
    // Get language
    //
    const fileName = location.href.split("/").slice(-1)[0].split('.')[0];
    
    const langSelected = getCookie('lang');
    if (langSelected && langSelected !== 'es' && fileName !== langSelected) {
        location.href = `/${langSelected}.html`;
    }

    //
    // Print button title
    //
    if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1) {    
        let msg = 'Abrir con Opera o Google Chrome para imprimir';
    
        if (langSelected) {
            switch (langSelected) {
                case 'en':
                    msg = 'Open with Google Chrome or Opera to print';
                    break;
                case 'fr':
                    msg = 'Ouvrir avec Opera ou Google Chrome pour imprimer';
                    break;
            }
        }
        printButton.setAttribute('disabled', 'disabled');
        printButton.setAttribute('title', msg);
    
        // There's a bug on firefox with display: grid and html5, I'm still debugging
        // You can read about it here: https://tosbourn.com/firefox-printing-issue-for-grid-css/
        // 
        // Jul 7, 2022: I won't give any support to the 2% population using Firefox =P 
    } 
};
