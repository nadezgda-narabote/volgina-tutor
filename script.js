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

const reviewData=[
  {
    id:'natalya-alekseevna',name:'Наталья Алексеевна',role:'мама ученицы',sourceType:'real-message',ownerDecision:'publish',
    text:[
      'Хочу выразить огромную благодарность этому замечательному педагогу за подготовку моей дочери к ОГЭ по русскому языку! Это настоящий профессионал своего дела и высококвалифицированный специалист. Она обладает редким даром — умеет находить подход к современным подросткам и выстраивать с ними доверительный контакт.',
      'В процессе обучения она в меру строга, что очень помогает держать дисциплину, но при этом на занятиях всегда комфортная атмосфера. Дочь занималась с удовольствием, ведь учитель умеет вовремя и к месту пошутить, разрядить обстановку и объяснить даже самую сложную тему простым языком. Спасибо за ваш труд, терпение и отличный результат! Рекомендую всем!'
    ],
    preview:['Хочу выразить огромную благодарность этому замечательному педагогу за подготовку моей дочери к ОГЭ по русскому языку! Это настоящий профессионал своего дела и высококвалифицированный специалист. Она обладает редким даром — умеет находить подход к современным подросткам и выстраивать с ними доверительный контакт.']
  },
  {
    id:'alyona',name:'Алёна',role:'ученица',context:'подготовка к ОГЭ и ЕГЭ',sourceType:'real-message',ownerDecision:'publish',
    text:[
      'Очень компетентный преподаватель, помимо хорошей подачи знаний, на уроках приятная атмосфера. Надежда Александровна может как быстро, так и в спокойном темпе подготовить к экзаменам.',
      'Сама занимаюсь с 8 класса. Сначала просто прорабатывали проблемы, затем в 9 классе готовилась к ОГЭ (сдала на желаемый результат), а в данный момент к ЕГЭ 💞'
    ]
  },
  {
    id:'dasha',name:'Даша',role:'выпускница',context:'подготовка к ОГЭ и ЕГЭ',sourceType:'real-message',ownerDecision:'publish',
    text:[
      'Хочу от всей души поблагодарить Надежду Александровну за невероятную работу! Готовилась с ней к ОГЭ и ЕГЭ — и результат превзошёл все ожидания.',
      'У меня был средний уровень знаний, и поначалу казалось, что до высоких баллов очень далеко. Но Надежда Александровна сумела выстроить подготовку так, что шаг за шагом пробелы закрывались, а уверенность росла. Отдельно хочу отметить работу над тестовой частью — разбирали не просто правильные ответы, а типичные ловушки и логику заданий, поэтому решать их становилось намного проще.',
      'Огромная заслуга Надежды Александровны в подготовке к сочинению и изложению. Мы прорабатывали самые разные темы, учились выстраивать аргументацию и не терять главную мысль. Благодаря этим занятиям я перестала бояться творческих заданий: теперь вижу структуру и понимаю, как грамотно раскрыть тему.',
      'Особенно ценно, что Надежда Александровна никогда не оставляла без ответа ни один вопрос — даже если он казался мне глупым. Она с пониманием, и даже с юмором помогала разобраться в самых запутанных моментах, и от этого сложные темы вдруг становились простыми и понятными.',
      'Год подготовки к ЕГЭ прошёл незаметно: мы не просто «проходили материал», а действительно разбирали всё до мелочей, возвращались к тому, что вызывало трудности, и закрепляли на практике. В начале пути мои пробники были ниже 60 баллов, а итоговый результат — 83 балла. Для меня это настоящий прорыв, и я точно знаю, что это заслуга моего преподавателя.',
      'И что трогает особенно — Надежда Александровна не исчезла из моей жизни после экзаменов. Она по-прежнему интересуется, как у меня дела, и это очень много значит.',
      'От всей души рекомендую Надежду Александровну как сильного преподавателя и чуткого человека. Спасибо за терпение, профессионализм и поддержку — без них такого результата точно не было бы! ❤️'
    ],
    preview:[
      'Хочу от всей души поблагодарить Надежду Александровну за невероятную работу! Готовилась с ней к ОГЭ и ЕГЭ — и результат превзошёл все ожидания.',
      'У меня был средний уровень знаний, и поначалу казалось, что до высоких баллов очень далеко. Но Надежда Александровна сумела выстроить подготовку так, что шаг за шагом пробелы закрывались, а уверенность росла. Отдельно хочу отметить работу над тестовой частью — разбирали не просто правильные ответы, а типичные ловушки и логику заданий, поэтому решать их становилось намного проще.'
    ]
  },
  {
    id:'sasha',name:'Саша',role:'выпускница',sourceType:'real-message',ownerDecision:'publish',
    text:['Супер педагог! Очень внимательно относится к подбору материалы, постоянно интересуется, все ли понятно, если нет, материал повторяется! Материал преподносится очень легко и интересно, не успеваешь замечать, как занятие подходит к концу. Виден интерес к кому, чтобы все было отработано и понятно учеником! Огромна благодарность, всем советую данного специалиста 💕💕💕']
  },
  {
    id:'maria',name:'Мария',role:'выпускница',context:'ОГЭ по литературе',sourceType:'real-message',ownerDecision:'publish',
    text:[
      'Я занималась с Надеждой Александровной в 9 классе, мы готовились к ОГЭ по литературе! Я всегда считала, что это нереально подготовиться к такому серьезному и непростому экзамену меньше, чем за год, но Надежда Александровна доказала обратное😁',
      'мне посчастливилось, и мой репетитор по литературе был по совместительству преподавателем русского языка и литературы в моей школе, поэтому я и выбрала, собственно, Надежду Александровну в качестве репетитора, потому что я знала, как она может увлечь и заинтересовать в своих предметах!',
      'Занимались мы очень активно, не теряли времени, но и не гнали сломя голову, за что я очень благодарна!',
      'Очень рада, что Надежда Александровна была моим преподавателем несколько лет, ведь именно благодаря ей я полюбила литературу!',
      'P.S. огэ я сдала на 5!😅'
    ],
    preview:['Я занималась с Надеждой Александровной в 9 классе, мы готовились к ОГЭ по литературе! Я всегда считала, что это нереально подготовиться к такому серьезному и непростому экзамену меньше, чем за год, но Надежда Александровна доказала обратное😁']
  },
  {
    id:'mama-dani',name:'Мама Дани',role:'',sourceType:'real-message',ownerDecision:'publish',
    text:['Надежда Александровна, здравствуйте!','Получили сегодня результаты по литературе и это 5! Ну это что-то невозможное), мама в шоке)','Он когда выходил с экзамена, сказал, что рассчитывает не больше, чем на 3, было одно задание вообще очень сложное для него. А тут такое!','Спасибо Вам огромное за ваше терпение, ваш профессионализм, без вас бы Даня не справился!','И по русскому тоже 5!'],
    preview:['Надежда Александровна, здравствуйте!','Получили сегодня результаты по литературе и это 5! Ну это что-то невозможное), мама в шоке)']
  },
  {
    id:'ekaterina',name:'Екатерина',role:'мама Юли',sourceType:'real-message',ownerDecision:'publish',
    text:['Доброе утро, Надежда Александровна, большое спасибо вам за ваш труд, у Юли твердая четверка вышла) я очень рада и она тоже 🌷❤️','У них уже на следующей неделе уже заканчивается учеба.. хотела предложить уже встретиться в следующем учебном году 😔 если вы конечно не будет против взять Юлю опять на занятия ❤️']
  },
  {
    id:'anastasia',name:'Анастасия',role:'мама ученика',class:'9 класс',sourceType:'real-message',ownerDecision:'publish',
    text:['Урааа🥳 спасибо вам ❤️','29 баллов','Позанимались то всего ничего - а результат очевиден','Это ваша заслуга 🌹','Мы останемся в 10, останетесь с нами для подготовки к ЕГЭ?']
  },
  {
    id:'igor',name:'Игорь',role:'отец ученика',class:'9 класс',sourceType:'author-draft',ownerDecision:'publish-with-approved-signature',
    text:['С русским у сына всегда было по принципу «авось пронесёт». Ошибся — ну и ладно, к ОГЭ отношение было примерно такое же. После занятий хотя бы начал понимать, где именно у него проблемы, и перестал просто угадывать ответы.','А для меня главный показатель — дома стало гораздо меньше «сядь позанимайся» и «ты всё сделал?». Большую часть подготовки он уже контролировал сам. Надежда при этом без сюсюканья, но и без постоянных нотаций. С моим сыном такой вариант сработал.']
  }
];

const caseData=[
  {id:'school-program-7',meta:'7 класс · школьная программа',came:'правила знает, но самостоятельно применять их в письменных работах не получается.',worked:'ищем причины ошибок и выстраиваем самопроверку.',result:'Ученик начинает чаще замечать и исправлять ошибки самостоятельно.'},
  {id:'essay-9',meta:'9 класс · сочинение',came:'«не знаю, что писать», ступор перед пустым листом.',worked:'раскладываем сочинение на понятные шаги.',result:'Появляется понятный порядок действий — начать писать становится проще.'},
  {id:'literature-11',meta:'11 класс · литература',came:'произведения прочитаны, но трудно использовать их в рассуждении.',worked:'учимся формулировать позицию и доказывать её текстом.',result:'Ученик увереннее ориентируется в произведениях и использует их осознанно.'},
  {id:'russian-oge',meta:'9 класс · ОГЭ по русскому языку',came:'подготовка к ОГЭ по русскому языку.',result:'29 баллов, оценка 4.'}
];

document.querySelectorAll('[data-stories]').forEach(stories=>{
  const tabs=[...stories.querySelectorAll('[data-story-tab]')];
  const panel=stories.querySelector('.stories-panel');
  const card=stories.querySelector('[data-story-card]');
  const position=stories.querySelector('[data-story-position]');
  const previous=stories.querySelector('[data-story-prev]');
  const next=stories.querySelector('[data-story-next]');
  const publicReviewIds=new Set(['natalya-alekseevna','alyona','dasha','sasha','maria','mama-dani','ekaterina','anastasia','igor']);
  const collections={reviews:reviewData.filter(item=>publicReviewIds.has(item.id)),cases:caseData};
  let active='reviews';
  const indices={reviews:0,cases:0};
  let expanded=false;

  const paragraphs=items=>items.map(text=>`<p>${text}</p>`).join('');
  const render=()=>{
    const items=collections[active];
    const index=Math.min(indices[active],items.length-1);
    indices[active]=Math.max(0,index);
    const item=items[indices[active]];
    expanded=false;
    if(active==='reviews'){
      const hasPreview=Array.isArray(item.preview);
      const visibleText=hasPreview?item.preview:item.text;
      const meta=[item.role,item.context,item.class].filter(Boolean).join(' · ');
      card.innerHTML=`<article><h3>${item.name}</h3>${meta?`<p class="story-meta">${meta}</p>`:''}<div class="story-text">${paragraphs(visibleText)}</div>${hasPreview?'<button type="button" class="story-toggle" aria-expanded="false">Читать полностью</button>':''}</article>`;
      const toggle=card.querySelector('.story-toggle');
      toggle?.addEventListener('click',()=>{
        expanded=!expanded;
        card.querySelector('.story-text').innerHTML=paragraphs(expanded?item.text:item.preview);
        card.querySelector('.story-text').classList.toggle('is-expanded',expanded);
        toggle.textContent=expanded?'Свернуть':'Читать полностью';
        toggle.setAttribute('aria-expanded',String(expanded));
      });
    }else{
      const fields=[['С чем пришли',item.came,''],['Над чем работали',item.worked,''],['Результат',item.result,'is-result']].filter(([,value])=>value);
      card.innerHTML=`<article><h3>${item.meta}</h3><div class="case-fields">${fields.map(([label,value,className])=>`<p class="case-field ${className}"><strong>${label}</strong>${value}</p>`).join('')}</div></article>`;
    }
    position.textContent=`${indices[active]+1} / ${items.length}`;
    previous.disabled=indices[active]===0;
    next.disabled=indices[active]===items.length-1;
  };

  const selectTab=tab=>{
    active=tab.dataset.storyTab;
    tabs.forEach(button=>{
      const selected=button===tab;
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex=selected?0:-1;
    });
    panel.setAttribute('aria-labelledby',tab.id);
    indices[active]=Math.min(indices[active],collections[active].length-1);
    render();
  };
  tabs.forEach((tab,tabIndex)=>{
    tab.addEventListener('click',()=>selectTab(tab));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();
      const target=event.key==='Home'?0:event.key==='End'?tabs.length-1:(tabIndex+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
      tabs[target].focus();
      selectTab(tabs[target]);
    });
  });
  previous.addEventListener('click',()=>{if(indices[active]>0){indices[active]-=1;render()}});
  next.addEventListener('click',()=>{if(indices[active]<collections[active].length-1){indices[active]+=1;render()}});
  render();
});

/* ===== MOTION — one observer system for all scroll scenes ===== */
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sourceHeader = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  let dock = document.querySelector('.floating-dock');

  if (sourceHeader && !dock) {
    dock = document.createElement('div');
    dock.className = 'floating-dock';
    dock.setAttribute('aria-label', 'Быстрая навигация');
    dock.setAttribute('aria-hidden', 'true');
    dock.innerHTML = `
      <a class="dock-brand" href="#top" aria-label="Наверх">НВ</a>
      <nav>${sourceHeader.querySelector('nav')?.innerHTML || ''}</nav>
      <a class="dock-cta" href="#contact">Написать</a>`;
    document.body.appendChild(dock);
  }

  let dockFrame = 0;
  const updateDock = () => {
    dockFrame = 0;
    if (!dock || !hero) return;
    const show = hero.getBoundingClientRect().bottom <= 0;
    dock.classList.toggle('is-visible', show);
    dock.setAttribute('aria-hidden', String(!show));
  };
  const requestDockUpdate = () => {
    if (!dockFrame) dockFrame = requestAnimationFrame(updateDock);
  };
  updateDock();
  addEventListener('scroll', requestDockUpdate, {passive:true});
  addEventListener('resize', requestDockUpdate, {passive:true});

  const manifestText = document.querySelector('.manifest p');
  if (manifestText && !manifestText.querySelector('.manifest-part')) {
    manifestText.innerHTML = '<span class="manifest-part">Стало понятно</span><span class="manifest-arrow" aria-hidden="true">→</span><span class="manifest-part">стало получаться</span><span class="manifest-arrow" aria-hidden="true">→</span><span class="manifest-part">появилась уверенность</span>';
  }

  const scenes = [
    document.querySelector('.recognition-layer'),
    document.querySelector('.manifest'),
    document.querySelector('.steps'),
    document.querySelector('.principle'),
    document.querySelector('.exam-inner'),
    document.querySelector('.about-grid'),
    document.querySelector('.price-grid')
  ].filter(Boolean);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    scenes.forEach(scene => scene.classList.add('scene-active'));
    return;
  }

  document.body.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('scene-active');
      observer.unobserve(entry.target);
    });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  scenes.forEach(scene => observer.observe(scene));
})();
