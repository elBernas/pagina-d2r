// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', ()=> {

  // --- Utilidades modal ---
  const modal = document.getElementById('login-modal');
  const registerModal = document.getElementById('register-modal');
  const contactModal = document.getElementById('contact-modal');
  const modalOverlay = modal && modal.querySelector('.modal-overlay');
  const loginOpenButtons = Array.from(document.querySelectorAll('#login-open, a[href="#overview"]'));
  const openRegisterBtn = document.getElementById('open-register');
  const openContactBtn = document.getElementById('open-contact');
  const modalCloseElems = modal ? Array.from(modal.querySelectorAll('[data-modal-close]')) : [];
  const loginForm = document.getElementById('login-form');
  const firstInput = document.getElementById('username');
  const registerForm = document.getElementById('register-form');
  const regEmail = document.getElementById('reg-email');
  const regPassword = document.getElementById('reg-password');
  const regConfirm = document.getElementById('reg-confirm');
  const regError = document.getElementById('reg-error');
  const contactForm = document.getElementById('contact-form');
  const contactName = document.getElementById('contact-name');
  const contactPhone = document.getElementById('contact-phone');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');
  const contactError = document.getElementById('contact-error');
  let previouslyFocused = null;

  function openModal(){
    if(!modal) return;
    previouslyFocused = document.activeElement;
    modal.setAttribute('aria-hidden','false');
    setTimeout(()=> firstInput && firstInput.focus(), 60);
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    if(previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
  }

  function openRegister(){
    if(!registerModal) return;
    if(modal) modal.setAttribute('aria-hidden','true');
    registerModal.setAttribute('aria-hidden','false');
    setTimeout(()=> regEmail && regEmail.focus(), 60);
  }

  function closeRegister(){
    if(!registerModal) return;
    registerModal.setAttribute('aria-hidden','true');
  }

  // Vincular botones/links para abrir modal
  loginOpenButtons.forEach(el=>{
    if(!el) return;
    el.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  // Cerrar al hacer click en elementos marcados (login)
  modalCloseElems.forEach(el=> el.addEventListener('click', e => { e.preventDefault(); closeModal(); }));

  // cerrar elementos del modal de registro (si existe)
  if(registerModal){
    Array.from(registerModal.querySelectorAll('[data-modal-close]')).forEach(el=> el.addEventListener('click', e => { e.preventDefault(); closeRegister(); }));
    const regOverlay = registerModal.querySelector('.modal-overlay');
    if(regOverlay) regOverlay.addEventListener('click', closeRegister);
  }

  // manejar modal de contacto
  if(contactModal){
    Array.from(contactModal.querySelectorAll('[data-modal-close]')).forEach(el=> el.addEventListener('click', e => { e.preventDefault(); contactModal.setAttribute('aria-hidden','true'); }));
    const contactOverlay = contactModal.querySelector('.modal-overlay');
    if(contactOverlay) contactOverlay.addEventListener('click', ()=> contactModal.setAttribute('aria-hidden','true'));
  }

  // Cerrar al hacer click sobre overlay (login)
  if(modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Cerrar con Escape: cierra cualquier modal abierto
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      closeModal();
      closeRegister();
      if(contactModal) contactModal.setAttribute('aria-hidden','true');
    }
  });

  // Manejo del envío del formulario de login (aquí sólo demostrativo)
  if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = (document.getElementById('username')||{}).value || '';
      const password = (document.getElementById('password')||{}).value || '';
      if(!username.trim() || !password){
        alert('Por favor completa usuario y contraseña.');
        return;
      }
      console.log('Login:', {username, password: '•••'});
      alert('Inicio de sesión enviado. (Demostración)');
      closeModal();
    });
  }

  // Abrir modal de registro desde el botón dentro del modal de login
  if(openRegisterBtn) openRegisterBtn.addEventListener('click', e => { e.preventDefault(); openRegister(); });

  // Abrir modal de contacto desde el footer
  if(openContactBtn) openContactBtn.addEventListener('click', e => { e.preventDefault(); if(modal) modal.setAttribute('aria-hidden','true'); if(registerModal) registerModal.setAttribute('aria-hidden','true'); contactModal && contactModal.setAttribute('aria-hidden','false'); setTimeout(()=> contactName && contactName.focus(), 60); });

  // Manejo del formulario de registro: validación simple
  if(registerForm){
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      if(regError) { regError.style.display='none'; regError.textContent=''; }
      [regEmail, regPassword, regConfirm].forEach(inp=> inp && inp.classList.remove('input-invalid'));
      const email = (regEmail||{}).value || '';
      const pwd = (regPassword||{}).value || '';
      const conf = (regConfirm||{}).value || '';
      if(!email.includes('@')){
        if(regError){ regError.textContent='Introduce un correo válido.'; regError.style.display='block'; }
        regEmail && regEmail.classList.add('input-invalid');
        return;
      }
      if(pwd.length < 6){
        if(regError){ regError.textContent='La contraseña debe tener al menos 6 caracteres.'; regError.style.display='block'; }
        regPassword && regPassword.classList.add('input-invalid');
        return;
      }
      if(pwd !== conf){
        if(regError){ regError.textContent='Las contraseñas no coinciden.'; regError.style.display='block'; }
        regPassword && regPassword.classList.add('input-invalid');
        regConfirm && regConfirm.classList.add('input-invalid');
        return;
      }
      console.log('Registro:', {email, password: '•••'});
      alert('Registro enviado. (Demostración)');
      closeRegister();
    });
  }

  // Manejo del formulario de contacto: validación simple
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if(contactError){ contactError.style.display='none'; contactError.textContent=''; }
      [contactName, contactPhone, contactEmail, contactMessage].forEach(i=> i && i.classList.remove('input-invalid'));
      const name = (contactName||{}).value || '';
      const phone = (contactPhone||{}).value || '';
      const email = (contactEmail||{}).value || '';
      const message = (contactMessage||{}).value || '';
      if(!name.trim()){
        if(contactError){ contactError.textContent='Introduce tu nombre.'; contactError.style.display='block'; }
        contactName && contactName.classList.add('input-invalid');
        return;
      }
      if(!email.includes('@')){
        if(contactError){ contactError.textContent='Introduce un correo válido.'; contactError.style.display='block'; }
        contactEmail && contactEmail.classList.add('input-invalid');
        return;
      }
      if(message.trim().length < 5){
        if(contactError){ contactError.textContent='Escribe un comentario más detallado.'; contactError.style.display='block'; }
        contactMessage && contactMessage.classList.add('input-invalid');
        return;
      }
      console.log('Contacto:', {name, phone, email, message});
      alert('Mensaje enviado. Gracias por contactarnos. (Demostración)');
      contactModal && contactModal.setAttribute('aria-hidden','true');
    });
  }

  // --- Enlaces internos: desplazamiento suave (excepto #overview, que abre modal) ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if(!href || href.length<=1) return;
      if(href === '#overview'){
        e.preventDefault();
        openModal();
        return;
      }
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',href);
      }
    });
  });

  // Interacción simple: manejo del clic para solicitar una build
  const ask = document.getElementById('ask-build');
  if(ask){
    ask.addEventListener('click', e => {
      e.preventDefault();
      alert('Indica tu clase preferida (ej: Sorceress, Paladin) y te propongo una build inicial.');
    });
  }

});
