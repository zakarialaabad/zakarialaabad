import '../css/app.css';
import React from 'react';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import Layout from './layouts/layout'; // 🟡 استيراد الـ Layout الافتراضي

const appName = import.meta.env.VITE_APP_NAME || 'E-jar';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        const page = await resolvePageComponent(`./pages/${name}.tsx`, pages);
        // 🟢 إضافة Layout افتراضي إذا الصفحة ما حددت Layout خاص
        // حل الخطأ: تعريف نوع page بشكل صريح
    const typedPage = page as { default: any };
    typedPage.default.layout = typedPage.default.layout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
    return typedPage;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: '#465baa',
        delay: 250,

    },
});

// 🌓 إعداد المظهر (داكن أو فاتح)
initializeTheme();
