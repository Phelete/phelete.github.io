function detectLanguage() {
  return navigator.language || navigator.userLanguage;
}
let detectedLanguage = detectLanguage();
let acceptedLanguages = ['cs', 'ru'];
window.location.replace(acceptedLanguages.indexOf(detectedLanguage) > -1 ? detectedLanguage : 'en');