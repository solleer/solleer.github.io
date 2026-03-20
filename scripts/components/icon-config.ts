import '@awesome.me/webawesome/dist/components/icon/icon.js';
import { registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';

registerIconLibrary('remixicon', {
    resolver: name => {
        const match = name.match(/^(.*?)\/(.*?)?$/);
        if (!match) {
            console.warn(`Icon name "${name}" does not match the expected format "family/icon-name".`);
            return '';
        }
        match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        return `https://cdn.jsdelivr.net/npm/remixicon@4.9.1/icons/${match[1]}/${match[2]}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
});
registerIconLibrary('default', {
    resolver: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`;
    },
});
registerIconLibrary('bootstrap', {
    resolver: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`;
    },
});