import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viCommon from './locales/vi/common.json';
import viBrands from './locales/vi/brands.json';
import viDashboard from './locales/vi/dashboard.json';

import enCommon from './locales/en/common.json';
import enBrands from './locales/en/brands.json';
import enDashboard from './locales/en/dashboard.json';

i18n.use(initReactI18next).init({
    resources: {
        vi: {
            common: viCommon,
            brands: viBrands,
            dashboard: viDashboard,
        },
        en: {
            common: enCommon,
            brands: enBrands,
            dashboard: enDashboard,
        },
    },

    lng: 'vi',
    fallbackLng: 'vi',

    defaultNS: 'common',
    ns: ['common', 'brands', 'dashboard'],

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;