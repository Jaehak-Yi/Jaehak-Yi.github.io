const sections = Array.from(document.querySelectorAll('main > .section'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sectionLinks = [...navLinks, document.querySelector('.site-title')];
const sectionIds = new Set(sections.map(section => section.id));

function sectionFromHash() {
    let id;

    try {
        id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
        return 'about';
    }

    return sectionIds.has(id) ? id : 'about';
}

function showSection(id) {
    const selectedId = sectionIds.has(id) ? id : 'about';

    // Keep every section readable when JavaScript is unavailable.
    sections.forEach(section => {
        section.hidden = section.id !== selectedId;
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${selectedId}`) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    window.scrollTo(0, 0);
}

sectionLinks.forEach(link => {
    link.addEventListener('click', event => {
        const id = link.getAttribute('href').slice(1);
        if (!sectionIds.has(id)) return;

        event.preventDefault();

        if (window.location.hash !== `#${id}`) {
            window.history.pushState(null, '', `#${id}`);
        }

        showSection(id);
    });
});

// Browser history and manually changed URL hashes select the matching section.
window.addEventListener('popstate', () => showSection(sectionFromHash()));
window.addEventListener('hashchange', () => showSection(sectionFromHash()));

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

showSection(sectionFromHash());
window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
