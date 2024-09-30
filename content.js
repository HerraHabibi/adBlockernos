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
  
  // Reajustar el header
  const header = document.querySelector('.header');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';

  // Avisar de que se han eliminado anuncios
  console.log('%cadBlockernos%c »%c Anuncios eliminados', 'color: #2d8fe0; font-size: 20px; background-color: #282828; padding: 4px', 'color: #1fd78d; font-size: 20px; background-color: #282828; padding: 4px', 'color: #f0f0f0; font-size: 20px; background-color: #282828; padding: 4px');
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

  // Configuración observador: Se observan los nodos observados y sus hijos
  const config = { childList: true, subtree: true };

  // Establecer el body como el nodo observado y lo inicia
  const targetNode = document.body;
  observador.observe(targetNode, config);
}

// Ejecutar eliminarAnuncios al cargar la página
setTimeout(() => {
  eliminarAnuncios();
  observarAnuncios();
}, 1000);