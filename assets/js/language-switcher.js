function setLanguage(language) {
    const urlParts = window.location.pathname.split('/');
    const lastPartIndex = urlParts.length - 2;
    urlParts[lastPartIndex] = ['cs', 'ru'].indexOf(language) > -1 ? language : 'en';
    console.log(urlParts);
    window.location.pathname = urlParts.join('/');
}
