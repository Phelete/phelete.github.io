function setLanguage(language) {
    const urlParts = window.location.pathname.split('/');
    if (urlParts[1] === 'cs' || urlParts[1] === 'en' || urlParts[1] === 'ru') {
        urlParts[1] = language;
    } else {
        urlParts.unshift(language);
    }
    window.location.pathname = urlParts.join('/');
}
