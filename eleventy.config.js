

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import path from "path";

export default function (eleventyConfig) {
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("ELEVENTY_ENV:", process.env.ELEVENTY_ENV);
    eleventyConfig.addPlugin(litPlugin, {
        mode: 'worker',
        componentModules: [
            'dist/ssr.js'
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
    eleventyConfig.addFilter("capitalizeWords", (str) =>
        str.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );

    if (process.env.NODE_ENV === "production") {
        eleventyConfig.addGlobalData("date", "git Last Modified");
    }
};