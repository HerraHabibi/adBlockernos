const tiempoEspera = 2; // Tiempo en segundos

function eliminarAnuncios() {
  // Identificar elementos con anuncios
  const clasesAnuncios = [
    'responsive-leaderboard',
    'ad-dfp',
    'server-b-tutorials',
    'sidebar',
    'vm-footer',
    'header-center',
    'avp-floating-container',
    'avp-fixed',
    'avp-bottom-right',
    'avp-move-left-enter-done'
  ];
  
  // Eliminar todos los elementos que tengan alguna de las clases con anuncios
  clasesAnuncios.forEach(claseAnuncio => {
    const anuncios = document.getElementsByClassName(claseAnuncio);
    while (anuncios.length > 0) {
      anuncios[0].parentNode.removeChild(anuncios[0]);
    }
  });

  // Eliminar todos los elementos con z-index: >= 2147483640
  const elementos = document.querySelectorAll('*');
  elementos.forEach(elemento => {
    const zIndex = parseInt(window.getComputedStyle(elemento).getPropertyValue('z-index'));
    if (zIndex >= 2147483640) {
      elemento.parentNode.removeChild(elemento);
    }
  });
  
  // Reajustar el header
  const header = document.querySelector('.header');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
}

function observarAnuncios() {
  // Observar todos los cambios que ocurren en el DOM
  const observador = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      // Si los cambios son del tipo agregar o eliminar se ejecuta eliminarAnuncios()
      if (mutation.type === 'childList') {
        eliminarAnuncios();
      }
    }
  });

  // Establecer el body y sus hijos como los nodos observados e inicia el observador
  observador.observe(document.body, { childList: true, subtree: true });
}

// Ejecutar extensión al cargar la página
setTimeout(() => {
  eliminarAnuncios();
  observarAnuncios();
}, tiempoEspera * 1000);