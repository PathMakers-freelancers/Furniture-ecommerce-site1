const rtlToggles = document.querySelectorAll('.rtl-toggle');
const currentDir = localStorage.getItem('dir') || 'ltr';

document.documentElement.setAttribute('dir', currentDir);

rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const dir = document.documentElement.getAttribute('dir');
        const newDir = dir === 'ltr' ? 'rtl' : 'ltr';

        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    });
});
