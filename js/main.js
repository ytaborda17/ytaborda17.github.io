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

importFile('./js/cookieManager.js');



//
// Print button
//
const pb = document.getElementById('print-button');

if (navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1) {
    pb.setAttribute('disabled', 'disabled');
    pb.setAttribute('title', 'Use Google Chrome or Opera to print');
    
    /**
     * There's a bug on firefox with display: grid and html5, I'm still debugging
     * You can read about it here: https://tosbourn.com/firefox-printing-issue-for-grid-css/
     * 
     * Jul 7, 2022: I won't give any support to the 2% population using Firefox =P 
     */
} 



//
// Theme switch
//
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('change', (event) => {
    document.body.classList.toggle('dark');
    pb.classList.toggle('btn-dark');
  
    let theme = '';
  
    if (event.currentTarget.checked) {
        theme = 'dark';
    }
  
    setCookie('theme', theme, 30);
});

window.onload = function() {
    const themeSelected = getCookie('theme');

    if (themeSelected && themeSelected === 'dark') {
        document.body.classList.add('dark');
        pb.classList.add('btn-dark');
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove('dark');
        pb.classList.remove('btn-dark');
        themeSwitch.checked = false;
    }
};
