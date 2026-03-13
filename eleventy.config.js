

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

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
};