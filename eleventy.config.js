

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import path from "path";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(litPlugin, {
        mode: 'worker',
        componentModules: [
        ],
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addWatchTarget('scripts/');

    eleventyConfig.setInputDirectory("site");
    eleventyConfig.setOutputDirectory("dist");

    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPlugin(EleventyVitePlugin);

    eleventyConfig.addFilter("postDate", (dateObj) => {
        // Can use toLocaleString the same way we were before
        return dateObj.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });

    if (process.env.NODE_ENV === "production") {
        eleventyConfig.addGlobalData("date", "git Last Modified");
    }
};