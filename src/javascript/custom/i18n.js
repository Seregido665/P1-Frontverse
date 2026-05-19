// --- CONSTANTES Y CONFIGURACIÓN ---
const I18N_SUPPORTED = ['es', 'en', 'ca', 'gl', 'eu'];
const I18N_DEFAULT = 'es';
const I18N_STORAGE_KEY = 'selectedLanguage';

const I18N_LANG_NAMES = {
  es: 'Español',
  en: 'English',
  ca: 'Catalán',
  gl: 'Gallego',
  eu: 'Euskera'
};

// --- CARGA LOS RECURSOS DE TRADUCCIÓN ---
async function i18nLoadResources(lang) {
  const response = await fetch(`locales/${lang}.json`);
  if (!response.ok) {
    throw new Error(`[i18n] No se pudo cargar: locales/${lang}.json (${response.status})`);
  }
  return response.json();
}

// --- APLICA LAS TRADUCCIONES ---
function i18nApplyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(function (element) {
    const raw = element.getAttribute('data-i18n');

    const attrMatch = raw.match(/^\[(\w+)\](.+)$/);
    if (attrMatch) {
      const attrName = attrMatch[1];
      const key = attrMatch[2];
      const translated = i18next.t(key);
      if (translated !== key) {
        element.setAttribute(attrName, translated);
      }
      return;
    }

    const translation = i18next.t(raw);
    if (translation !== raw) {
      element.textContent = translation;
    }
  });
}

// --- BOTON GLOBO ---
function i18nUpdateGlobeButton(lang) {
  const langName = I18N_LANG_NAMES[lang] || lang;
  const mainGlobe = document.querySelector('.globe-button__title');
  const burgerGlobe = document.querySelector('.burguer-menu-window__title');
  if (mainGlobe) mainGlobe.textContent = langName;
  if (burgerGlobe) burgerGlobe.textContent = langName;
}

// --- OPCION ACTIVA EN EL MENÚ ---
function i18nSetActiveOption(lang) {
  document.querySelectorAll('.globe-menu-window__option').forEach(function (option) {
    const isActive = option.getAttribute('data-lang') === lang;
    option.classList.toggle('globe-menu-window__option--active', isActive);
  });
}
function i18nBindGlobeOptions() {
  document.querySelectorAll('.globe-menu-window__option[data-lang]').forEach(function (option) {
    option.addEventListener('click', function () {
      const lang = option.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
}

// --- INICIALIZACION ---
async function i18nInit() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY) || I18N_DEFAULT;
  const lang = I18N_SUPPORTED.includes(saved) ? saved : I18N_DEFAULT;

  const resources = await i18nLoadResources(lang);

  await i18next.init({
    lng: lang,
    resources: {[lang]: { translation: resources }},
    interpolation: { escapeValue: false }
  });

  i18nApplyTranslations();
  i18nUpdateGlobeButton(lang);
  i18nSetActiveOption(lang);
  i18nBindGlobeOptions();
}

async function changeLanguage(lang) {
  if (!I18N_SUPPORTED.includes(lang)) return;

  if (!i18next.hasResourceBundle(lang, 'translation')) {
    const resources = await i18nLoadResources(lang);
    i18next.addResourceBundle(lang, 'translation', resources);
  }

  await i18next.changeLanguage(lang);
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  i18nApplyTranslations();
  i18nUpdateGlobeButton(lang);
  i18nSetActiveOption(lang);
}

document.addEventListener('DOMContentLoaded', i18nInit);
