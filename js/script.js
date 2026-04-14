document.addEventListener('DOMContentLoaded',()=>{
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        const el = document.querySelector(href);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth',block:'start'});
          history.replaceState(null,'',href);
        }
      }
    })
  })

  // Simple interaction: build request
  const ask = document.getElementById('ask-build');
  if(ask){
    ask.addEventListener('click',e=>{
      e.preventDefault();
      alert('Indica tu clase preferida (ej: Sorceress, Paladin) y te propongo una build inicial.');
    })
  }
});