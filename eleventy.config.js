

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(litPlugin, {
        mode: 'worker',
        componentModules: [
        ],
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addWatchTarget('js/');
    eleventyConfig.setInputDirectory("site");
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.addPassthroughCopy({
        "node_modules/@awesome.me/webawesome/dist": "webawesome"
    });
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("styles");
    eleventyConfig.addPlugin(EleventyVitePlugin);
};