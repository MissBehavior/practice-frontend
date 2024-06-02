// Core i18next library.
import i18n from 'i18next'
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'ltn',
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                home: 'Home',
                about_us: 'About us',
                solutions: 'Solutions',
                people: 'People',
                gallery: 'Gallery',
                career: 'Career',
                clients: 'Clients',
                post_external: 'Post External',
                login: 'Login',
                register: 'Register',
                logout: 'Logout',
            },
        },
        // Lithuanian Language
        lt: {
            translation: {
                home: 'Pradžia',
                about_us: 'Apie mus',
                solutions: 'Sprendimai',
                people: 'Žmonės',
                gallery: 'Galerija',
                career: 'Karjera',
                clients: 'Klientai',
                post_external: 'Labas DENAS',
                login: 'Prisijungti',
                register: 'Registruotis',
                logout: 'Atsijungti',
            },
        },
    },
})

export default i18n
