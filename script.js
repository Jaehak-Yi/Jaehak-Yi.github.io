document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = this.dataset.section;

        document.querySelectorAll('main > .section').forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(target).classList.add('active');
    });
});

document.getElementById('about').classList.add('active');
