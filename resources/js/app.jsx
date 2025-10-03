import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { DataStoreProvider } from "./Context/DataStoreContext";

// ⬇️ import next-themes
import { ThemeProvider } from "next-themes";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <DataStoreProvider>
                    <Toaster position="top-right" reverseOrder={false} />
                    <App {...props} />
                </DataStoreProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
