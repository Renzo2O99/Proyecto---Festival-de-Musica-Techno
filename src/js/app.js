document.addEventListener('DOMContentLoaded', () => {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})

const galeriaImagenes = document.querySelector('.galeria-imagenes');
const fragment = document.createDocumentFragment();

function navegacionFija() {
    const header = document.querySelector('.header');
    const videoFondo = document.querySelector('.video');

    window.addEventListener('scroll', () => {
        if (videoFondo.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    const CANTIDAD_IMAGENES = 16;

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        // Crear el elemento <PICTURE>
        const imagen = document.createElement('picture');

        // Crear el elemento <SOURCE> para AVIF
        const sourceAvif = document.createElement('source');
        sourceAvif.setAttribute('srcset', `build/img/gallery/thumb/${i}.avif`);
        sourceAvif.setAttribute('type', 'image/avif');

        // Crear el elemento <SOURCE> para WebP
        const sourceWebp = document.createElement('source');
        sourceWebp.setAttribute('srcset', `build/img/gallery/thumb/${i}.webp`);
        sourceWebp.setAttribute('type', 'image/webp');

        // Crear el elemento <IMG>
        const imagenReferencia = document.createElement('img');
        imagenReferencia.setAttribute('src', `build/img/gallery/thumb/${i}.jpg`);
        imagenReferencia.setAttribute('width', '200');
        imagenReferencia.setAttribute('height', '300');
        imagenReferencia.setAttribute('alt', 'imagen galeria');
        imagenReferencia.setAttribute('loading', 'lazy');

        // Agregar los elementos al <PICTURE>
        imagen.appendChild(sourceAvif);
        imagen.appendChild(sourceWebp);
        imagen.appendChild(imagenReferencia);

        // Event Handler
        imagen.onclick = () => {
            mostrarImagen(i);
        }

        // Agregar el <PICTURE> al DOM
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    // Crear el elemento <PICTURE>
    const contenedorImagen = document.createElement('div');
    const imagen = document.createElement('picture');

    // Crear el elemento <SOURCE> para AVIF
    const sourceAvif = document.createElement('source');
    sourceAvif.setAttribute('srcset', `build/img/gallery/full/${i}.avif`);
    sourceAvif.setAttribute('type', 'image/avif');

    // Crear el elemento <SOURCE> para WebP
    const sourceWebp = document.createElement('source');
    sourceWebp.setAttribute('srcset', `build/img/gallery/full/${i}.webp`);
    sourceWebp.setAttribute('type', 'image/webp');

    // Crear el elemento <IMG>
    const imagenReferencia = document.createElement('img');
    imagenReferencia.setAttribute('src', `build/img/gallery/full/${i}.jpg`);
    imagenReferencia.setAttribute('width', '200');
    imagenReferencia.setAttribute('height', '300');
    imagenReferencia.setAttribute('alt', 'imagen galeria');
    imagenReferencia.setAttribute('loading', 'lazy');

    
    // Agregar los elementos al <PICTURE>
    imagen.appendChild(sourceAvif);
    imagen.appendChild(sourceWebp);
    imagen.appendChild(imagenReferencia);
    contenedorImagen.appendChild(imagen);

    // Generar Modal
    const modal = document.createElement('DIV');

    modal.classList.add('modal');
    modal.onclick = cerrarModal

    // Añadimos un contenedor para la imagen
    modal.appendChild(contenedorImagen);
    contenedorImagen.classList.add('contenedor-imagen');

    // Botón cerrar Modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = "X";
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModal.onclick = cerrarModal;

    // Añadimos los elementos creados con JavaScript al contenedor
    contenedorImagen.appendChild(imagen);
    contenedorImagen.appendChild(cerrarModalBtn);

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');

    modal.classList.add('fade-out');
    body.classList.remove('overflow-hidden');

    setTimeout(() => {
        modal?.remove();
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-principal a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })


        navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${actual}`) {
                navLinks[0].classList.remove('active');
                link.classList.add('active');
            } else if (link.getAttribute('href') === "#header") {
                link.classList.add('active');
            } else {
                link.classList.remove("active");
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navbar-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}