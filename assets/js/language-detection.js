function detectLanguage() {
  return navigator.language || navigator.userLanguage;
}
let detectedLanguage = detectLanguage();
let acceptedLanguages = ['cs', 'ru'];
let targetLanguage = acceptedLanguages.find(lang => detectedLanguage.startsWith(lang)) || 'en';
window.location.replace(targetLanguage);
