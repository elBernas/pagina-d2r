// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded',()=>{

  // Implementa desplazamiento suave para enlaces internos (que empiezan con #)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      // Obtiene el atributo href del enlace
      const href = a.getAttribute('href');
      // Verifica que el href tenga más de un carácter (no solo #)
      if(href.length>1){
        // Selecciona el elemento objetivo
        const el = document.querySelector(href);
        if(el){
          // Previene el comportamiento por defecto del enlace
          e.preventDefault();
          // Desplaza suavemente la vista al elemento
          el.scrollIntoView({behavior:'smooth',block:'start'});
          // Actualiza la URL sin recargar la página
          history.replaceState(null,'',href);
        }
      }
    })
  })

  // Interacción simple: manejo del clic para solicitar una build
  const ask = document.getElementById('ask-build');
  if(ask){
    ask.addEventListener('click',e=>{
      // Previene el comportamiento por defecto
      e.preventDefault();
      // Muestra una alerta con instrucciones
      alert('Indica tu clase preferida (ej: Sorceress, Paladin) y te propongo una build inicial.');
    })
  }
});