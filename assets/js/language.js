const acceptLanguage = ['cs', 'ru', 'en'];

function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    let detectedLanguage = localStorage.getItem("language") || userLang;
    return acceptLanguage.find(lang => detectedLanguage.startsWith(lang)) || 'en';
}

function setLanguage(language) {
    language = language || detectLanguage();
    var urlParts = window.location.pathname.split('/');
    const lastPartIndex = urlParts.length - 2;
    targetLanguage = acceptLanguage.find(lang => language.startsWith(lang)) || 'en';
    targetLink = "";
    if (acceptLanguage.indexOf(urlParts[lastPartIndex]) > -1) {
        urlParts[lastPartIndex] = targetLanguage;
        targetLink = urlParts.join('/');
    } else {
        targetLink = urlParts.join('/')+targetLanguage+'/';
    }
    localStorage.setItem("language", language);
    window.location.pathname = targetLink;
}
