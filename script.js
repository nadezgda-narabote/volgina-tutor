document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&d.closest('.accordion'))document.querySelectorAll('.accordion details').forEach(o=>{if(o!==d)o.open=false})}));

const toTop=document.querySelector('.to-top');
const updateTopButton=()=>toTop?.classList.toggle('visible',window.scrollY>window.innerHeight*.85);
window.addEventListener('scroll',updateTopButton,{passive:true});
updateTopButton();
toTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));

document.querySelectorAll('[data-test]').forEach(test=>{
  const feedback=test.querySelector('.test-feedback');
  const reset=test.querySelector('.test-reset');
  const buttons=[...test.querySelectorAll('[data-answer]')];

  const clearState=()=>{
    buttons.forEach(b=>{
      b.classList.remove('is-correct','is-wrong','is-dimmed');
      b.removeAttribute('aria-pressed');
    });
    feedback.classList.remove('show','success');
    feedback.innerHTML='';
    reset.hidden=true;
  };

  buttons.forEach(button=>button.addEventListener('click',()=>{
    clearState();
    const correct=button.dataset.answer==='yes';
    button.classList.add(correct?'is-correct':'is-wrong');
    button.setAttribute('aria-pressed','true');

    if(correct){
      buttons.forEach(b=>{if(b!==button)b.classList.add('is-dimmed')});
      feedback.innerHTML='<strong>Верно.</strong><p>Здесь две грамматические основы: <b>солнце скрылось</b> и <b>стало прохладно</b>. Это сложносочинённое предложение. Запятая разделяет его части и ставится <b>перед союзом И</b>, а не после него:</p><p class="corrected-sentence">Солнце скрылось за лесом, и стало прохладно.</p><p class="formula">Основа → граница частей → знак препинания</p>';
      feedback.classList.add('success');
    }else{
      feedback.innerHTML='<strong>Пока нет.</strong><p>В этом предложении пунктуационной ошибки нет. Найди грамматические основы в каждом варианте и проверь, где проходит граница частей сложного предложения.</p>';
      reset.hidden=false;
    }
    feedback.classList.add('show');
  }));

  reset?.addEventListener('click',()=>{
    clearState();
    buttons[0]?.focus();
  });
});
