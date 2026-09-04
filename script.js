document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&d.closest('.accordion'))document.querySelectorAll('.accordion details').forEach(o=>{if(o!==d)o.open=false})}));

const toTop=document.querySelector('.to-top');
const updateTopButton=()=>toTop?.classList.toggle('visible',window.scrollY>window.innerHeight*.85);
window.addEventListener('scroll',updateTopButton,{passive:true});
updateTopButton();
toTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));

const quizData=[
  {
    question:'В каком предложении допущена пунктуационная ошибка?',
    options:[
      ['А','Когда начался дождь, мы вернулись домой.'],
      ['Б','Я знал, что поезд уже ушёл.'],
      ['В','Солнце скрылось за лесом и, стало прохладно.'],
      ['Г','Если поторопиться, можно успеть к началу.']
    ],
    correct:'В',
    feedback:{
      'А':'<strong>В этом варианте ошибки нет.</strong><p><b>Дождь начался</b> и <b>мы вернулись</b> — две грамматические основы. Придаточная часть с союзом <b>когда</b> стоит перед главной и отделена от неё запятой правильно.</p>',
      'Б':'<strong>В этом варианте ошибки нет.</strong><p><b>Я знал</b> и <b>поезд ушёл</b> — две грамматические основы. Придаточная часть присоединяется союзом <b>что</b>; запятая перед ним стоит правильно.</p>',
      'В':'<strong>Верно.</strong><p>Здесь две грамматические основы: <b>солнце скрылось</b> и <b>стало прохладно</b>. Это сложносочинённое предложение. Запятая разделяет его части и ставится <b>перед союзом И</b>, а не после него:</p><p class="corrected-sentence">Солнце скрылось за лесом, и стало прохладно.</p><p class="formula">Основа → граница частей → знак препинания</p>',
      'Г':'<strong>В этом варианте ошибки нет.</strong><p><b>Поторопиться</b> и <b>можно успеть</b> — грамматические основы двух частей сложноподчинённого предложения. Придаточная часть с союзом <b>если</b> стоит перед главной и правильно отделена запятой.</p>'
    }
  },
  {
    question:'В каком слове допущена орфографическая ошибка?',
    options:[['А','прикоснуться'],['Б','вырастить'],['В','предпологать'],['Г','собирать']],
    correct:'В',
    feedback:{
      'А':'<strong>В этом варианте ошибки нет.</strong><p>В корнях с чередованием <b>-кас- / -кос-</b> буква <b>а</b> пишется, если после корня есть суффикс <b>-а-</b>: <i>касаться</i>. Если суффикса <b>-а-</b> нет, пишется <b>о</b>: <i>коснуться, прикоснуться</i>.</p>',
      'Б':'<strong>В этом варианте ошибки нет.</strong><p>В корнях с чередованием <b>-раст- / -ращ- / -рос-</b> перед <b>ст</b> и <b>щ</b> пишется <b>а</b>: <i>вырастить, выращенный</i>.</p>',
      'В':'<strong>Верно.</strong><p>Правильно: <b>предполагать</b>. В корнях с чередованием <b>-лаг- / -лож-</b> перед <b>г</b> пишется <b>а</b>, перед <b>ж</b> — <b>о</b>: <i>предполагать, предложить</i>.</p><p class="formula">Условие выбора гласной → правило → написание</p>',
      'Г':'<strong>В этом варианте ошибки нет.</strong><p>В корнях с чередованием <b>-бер- / -бир-</b> буква <b>и</b> пишется, если после корня есть суффикс <b>-а-</b>: <i>собирать</i>, но <i>соберу</i>.</p>'
    }
  },
  {
    question:'Тема сочинения: «Почему важно уметь признавать свои ошибки?» Какой вариант можно использовать как тезис?',
    options:[
      ['А','Ошибки совершают все люди, и в литературных произведениях герои тоже часто ошибаются.'],
      ['Б','Умение признавать свои ошибки важно, потому что помогает человеку понять последствия своих поступков, сделать выводы и изменить своё поведение.'],
      ['В','Я считаю, что эта тема очень важна и актуальна во все времена.'],
      ['Г','В сочинении на эту тему можно привести примеры из литературы и жизненного опыта.']
    ],
    correct:'Б',
    feedback:{
      'А':'<strong>Этот вариант связан с темой, но не отвечает на её вопрос.</strong><p>Здесь говорится о том, что люди совершают ошибки, а нужно объяснить, <b>почему важно уметь их признавать</b>.</p>',
      'Б':'<strong>Верно.</strong><p>Этот вариант прямо отвечает на вопрос темы. Сформулирована позиция: признание ошибки помогает осмыслить последствия поступка, сделать выводы и скорректировать дальнейшее поведение. Эту мысль можно развивать и доказывать в основной части.</p><p class="formula">Вопрос темы → прямой ответ → мысль для доказательства</p>',
      'В':'<strong>Здесь дана оценка темы, а не тезис сочинения.</strong><p>Слова <i>«важна и актуальна»</i> не объясняют, <b>почему человеку важно уметь признавать свои ошибки</b>.</p>',
      'Г':'<strong>Здесь говорится о построении сочинения, а не формулируется ответ на вопрос темы.</strong><p>Это замечание о возможных аргументах, а не тезис.</p>'
    }
  }
];

document.querySelectorAll('[data-quiz]').forEach(quiz=>{
  const holder=quiz.querySelector('[data-question]');
  const feedback=quiz.querySelector('.test-feedback');
  const reset=quiz.querySelector('.test-reset');
  const next=quiz.querySelector('.test-next');
  const progress=quiz.querySelector('[data-progress]');
  let index=0;

  const render=()=>{
    const item=quizData[index];
    progress.textContent=`${index+1} / ${quizData.length}`;
    holder.innerHTML=`<p class="test-question">${item.question}</p><div class="test-options" role="group" aria-label="Варианты ответа">${item.options.map(([key,label])=>`<button type="button" data-choice="${key}"><span>${key}</span>${label}</button>`).join('')}</div>`;
    feedback.className='test-feedback'; feedback.innerHTML=''; reset.hidden=true; next.hidden=true;
    holder.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>choose(button)));
  };

  const choose=button=>{
    const item=quizData[index], choice=button.dataset.choice, correct=choice===item.correct;
    holder.querySelectorAll('[data-choice]').forEach(b=>{b.classList.remove('is-correct','is-wrong','is-dimmed');b.removeAttribute('aria-pressed')});
    button.classList.add(correct?'is-correct':'is-wrong'); button.setAttribute('aria-pressed','true');
    feedback.innerHTML=item.feedback[choice]; feedback.className='test-feedback show'+(correct?' success':'');
    if(correct){holder.querySelectorAll('[data-choice]').forEach(b=>{if(b!==button)b.classList.add('is-dimmed')}); reset.hidden=true; next.hidden=false; next.textContent=index===quizData.length-1?'Пройти ещё раз':'Следующее задание';}
    else {reset.hidden=false; next.hidden=true;}
  };

  reset.addEventListener('click',()=>{feedback.className='test-feedback';feedback.innerHTML='';reset.hidden=true;holder.querySelectorAll('[data-choice]').forEach(b=>{b.classList.remove('is-correct','is-wrong','is-dimmed');b.removeAttribute('aria-pressed')});holder.querySelector('[data-choice]')?.focus()});
  next.addEventListener('click',()=>{index=index===quizData.length-1?0:index+1;render();holder.querySelector('[data-choice]')?.focus()});
  render();
});

/* ===== MOTION PASS ===== */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  body.classList.add('motion-ready');

  // Split the central transformation into semantic beats for sequential reveal.
  const manifest = document.querySelector('.manifest');
  const manifestText = manifest?.querySelector('p');
  if (manifestText && !manifestText.querySelector('.manifest-part')) {
    manifestText.innerHTML = '<span class="manifest-part">Стало понятно</span><span aria-hidden="true">→</span><span class="manifest-part">стало получаться</span><span aria-hidden="true">→</span><span class="manifest-part">появилась уверенность</span>';
  }

  // A few quiet text reveals only where they improve rhythm.
  document.querySelectorAll('.subjects article,.exam-inner>div,.cases .section-title,.about-copy,.faq .section-title,.contact-inner').forEach(el => el.classList.add('reveal-soft'));

  const observed = document.querySelectorAll('.recognition,.manifest,.method,.about,.format,.reveal-soft');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    observed.forEach(el => el.classList.add('in-view'));
    body.classList.add('is-loaded');
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      });
    }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
    observed.forEach(el => io.observe(el));
    requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add('is-loaded')));
  }

  // Dock-inspired compact navigation after the hero begins leaving the viewport.
  const header = document.querySelector('.site-header');
  const updateDock = () => header?.classList.toggle('is-docked', window.scrollY > 170);
  updateDock();
  window.addEventListener('scroll', updateDock, { passive: true });
})();
