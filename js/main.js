// Interaction: contact form handling and random background generator
(function(){
  const colorBtn = document.getElementById('colorBtn');

  function randColor(){
    const h = Math.floor(Math.random()*360);
    return `hsl(${h} 70% 85%)`;
  }

  colorBtn?.addEventListener('click', ()=>{
    document.body.style.background = randColor();
  });

  const mainColorBtn = document.getElementById('mainColorBtn');
  const siteMain = document.getElementById('siteMain');
  mainColorBtn?.addEventListener('click', ()=>{
    if(siteMain){
      siteMain.style.background = randColor();
    }
  });

  // Form handling: supports Formspree endpoint if provided, otherwise opens mailto as fallback.
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMessage');

  async function submitForm(formData){
    const endpoint = (form?.dataset.formspreeEndpoint || '').trim();
    if(endpoint){
      // Post to Formspree
      try{
        const res = await fetch(endpoint, {method:'POST', body: formData, headers:{'Accept':'application/json'}});
        if(res.ok){
          return {ok:true, text:'Message sent — thank you!'};
        }
        const json = await res.json().catch(()=>null);
        return {ok:false, text: json?.error || 'Failed to send message'};
      }catch(e){
        return {ok:false, text: e.message};
      }
    }

    // Fallback: open user's email client with mailto
    const name = form?.elements['name']?.value || '';
    const email = form?.elements['email']?.value || '';
    const subject = form?.elements['subject']?.value || 'Message from portfolio';
    const message = form?.elements['message']?.value || '';
    const to = form?.dataset.email || '';
    if(!to) return {ok:false, text:'No email configured. Set data-email or data-formspree-endpoint on the form.'};
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
    return {ok:true,text:'Opening email client...'};
  }

  form?.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    if(!msgEl) return;
    msgEl.textContent = '';
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    msgEl.textContent = 'Sending...';
    const res = await submitForm(data);
    msgEl.textContent = res.text || (res.ok? 'Sent' : 'Failed');
    if(res.ok){
      form.reset();
    }
  });

})();

