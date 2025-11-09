 // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        }
      })
    })

    // Mobile nav toggle (simple)
    const navToggle = document.getElementById('nav-toggle');
    navToggle && navToggle.addEventListener('click', ()=>{
      const links = document.querySelector('.nav-links');
      if(links.style.display === 'flex') links.style.display = '';
      else links.style.display = 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.right = '1rem';
      links.style.top = '72px';
      links.style.background = 'rgba(4,8,16,0.6)';
      links.style.padding = '0.6rem';
      links.style.borderRadius = '10px';
    })

    // Projects modal
    const projects = document.querySelectorAll('.project');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');

    projects.forEach(p => {
      const open = ()=>{
        const title = p.dataset.title || p.querySelector('h3').innerText;
        const desc = p.dataset.desc || p.querySelector('p').innerText;
        const img = p.dataset.image || '';
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImage.src = img;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
      };
      p.addEventListener('click', open);
      p.addEventListener('keydown', e=>{if(e.key === 'Enter' || e.key === ' ') open();});
    })

    modalClose.addEventListener('click', ()=>{
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    })
    modal.addEventListener('click', e=>{ if(e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); } });

    // Contact form basic validation + toast
    const form = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', ()=>{
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        alert('Please fill name, email and message.');
        return;
      }
      // Here you would connect to your backend / email service
      alert('Thanks '+name+" — message received (demo). You'll implement backend to actually send it.");
      form.reset();
    })

    // Small enhancement: keyboard ESC closes modal
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape'){
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden','true');
      }
    })

    // Accessibility: focus trap when modal open (basic)
    modal.addEventListener('keydown', e=>{
      if(e.key === 'Tab'){
        const focusable = modal.querySelectorAll('a,button,input,textarea,[tabindex]:not([tabindex="-1"])');
        if(focusable.length===0) return;
        const first = focusable[0];
        const last = focusable[focusable.length-1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    })
