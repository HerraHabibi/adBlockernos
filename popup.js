document.getElementById('botonEliminar').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    
    if (tab.url.includes('aternos.org'))
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: eliminarAnuncios
      });
  });
});

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

  // Eliminar todos los elementos con z-index: 2147483646
  const elementos = document.querySelectorAll('*');
  elementos.forEach(elemento => {
    const zIndex = window.getComputedStyle(elemento).getPropertyValue('z-index');
    if (zIndex === '2147483646') {
      elemento.parentNode.removeChild(elemento);
    }
  });
  
  // Reajustar el header
  const header = document.querySelector('.header');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';

  // Avisar de que se han eliminado anuncios
  console.log('%cadBlockernos%c »%c Anuncios eliminados', 'color: #2d8fe0; font-size: 20px; background-color: #282828; padding: 4px', 'color: #1fd78d; font-size: 20px; background-color: #282828; padding: 4px', 'color: #f0f0f0; font-size: 20px; background-color: #282828; padding: 4px');
}