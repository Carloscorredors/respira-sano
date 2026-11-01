(function (global) {
  'use strict';
  let sequence = 0;
  const ROUTES = Object.freeze([
    { id: 'respiratoria', label: 'Respiración', short: 'Aire → vías respiratorias', idea: 'Contaminantes en el aire pueden ingresar por inhalación.', focus: '285 62 382 460', prompt: 'Sigue la línea desde el aire hasta las vías respiratorias.' },
    { id: 'piel-ojos', label: 'Piel y ojos', short: 'Contacto con una superficie del cuerpo', idea: 'Puede haber contacto con el producto; algunos agentes también se absorben a través de la piel. Revisar información específica.', focus: '368 57 227 210', prompt: 'Observa los dos puntos de contacto: ojos y piel.' },
    { id: 'ingestion', label: 'Ingestión accidental', short: 'Manos u objetos → boca', idea: 'Manos u objetos contaminados pueden llevar sustancias a la boca.', focus: '330 100 330 445', prompt: 'Sigue la relación entre un objeto, la mano y la boca.' }
  ]);
  function mount(container, options) {
    if (!container || !container.appendChild) throw new TypeError('Se requiere un contenedor.');
    const opts = options || {}, id = 'rs12-vias-' + (++sequence), root = document.createElement('div');
    root.className = 'rs12-m16'; root.dataset.route = 'respiratoria'; root.dataset.visible = 'true';
    root.innerHTML = `<div class="rs12-m16-heading"><h2 id="${id}-heading">Explora las vías</h2><span class="rs12-m16-scale">Modelo conceptual</span></div>
      <div class="rs12-m16-tabs" role="group" aria-label="Elige una vía de ingreso">${ROUTES.map((r, i) => `<button type="button" data-route="${r.id}" aria-pressed="${i === 0}">${r.label}</button>`).join('')}</div>
      <div class="rs12-m16-workspace"><div class="rs12-m16-figure"><div class="rs12-m16-controls"><button type="button" data-action="play">Mostrar trayectoria</button><button type="button" data-action="zoom">Acercar zona</button></div><svg class="rs12-m16-svg" viewBox="0 0 900 680" role="group" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Respiración: vía de ingreso por inhalación</title><desc id="${id}-desc">Vista conceptual del cuerpo adulto. Una línea señala el recorrido desde el aire hacia las vías respiratorias. Puedes activar sus tres puntos numerados.</desc>
      <defs>
        <linearGradient id="${id}-skin" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#9c7468"/><stop offset=".2" stop-color="#cfae9d"/><stop offset=".46" stop-color="#eed7c5"/><stop offset=".7" stop-color="#d4ac95"/><stop offset="1" stop-color="#886b66"/></linearGradient>
        <linearGradient id="${id}-face" x1="0" y1="0" x2="1" y2=".28"><stop stop-color="#bb9583"/><stop offset=".38" stop-color="#f3deca"/><stop offset=".72" stop-color="#d9b39a"/><stop offset="1" stop-color="#98756a"/></linearGradient>
        <radialGradient id="${id}-light" cx=".47" cy=".2" r=".8"><stop stop-color="#f6fbfc"/><stop offset="1" stop-color="#e0edf1"/></radialGradient>
        <linearGradient id="${id}-lung" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#c7e7e9"/><stop offset=".35" stop-color="#a5cbd4"/><stop offset=".7" stop-color="#5c91a7"/><stop offset="1" stop-color="#386980"/></linearGradient>
        <radialGradient id="${id}-shadow"><stop stop-color="#39677b" stop-opacity=".18"/><stop offset="1" stop-color="#39677b" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-air" x1="0" y1="0" x2="1" y2=".4"><stop stop-color="#4ec3d6"/><stop offset="1" stop-color="#006b92"/></linearGradient>
        <marker id="${id}-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" stroke-width="2"/></marker>
      </defs>
      <rect width="900" height="680" rx="24" fill="url(#${id}-light)"/>
      <g class="rs12-m16-camera">
      <ellipse cx="466" cy="622" rx="280" ry="64" fill="url(#${id}-shadow)"/>
      <g class="rs12-m16-body">
        <path d="M415 211C412 235 414 245 398 254L341 270C307 281 292 309 283 348L253 510C250 531 253 551 264 562L284 557L316 461L341 377L346 468C345 519 337 568 342 631Q463 664 582 631C586 572 576 521 576 469L580 375L600 458L632 555L651 560C666 544 667 531 662 509L634 350C626 311 609 283 576 271L518 255C502 246 505 233 504 211Z" fill="url(#${id}-skin)" stroke="#98796e" stroke-width="1.5"/>
        <path d="M413 225Q456 247 506 225L516 254Q477 283 461 292Q440 273 398 254Z" fill="#9b7d72" opacity=".25"/>
        <path d="M396 259Q430 278 454 284M523 259Q489 278 467 284" fill="none" stroke="#f7e6d7" stroke-width="5" opacity=".65"/>
        <path d="M338 293Q313 362 297 438M586 293Q615 368 624 436M361 484Q352 562 358 617M564 485Q576 563 566 617" fill="none" stroke="#f9eadf" stroke-width="9" opacity=".18"/>
        <path d="M454 294Q449 416 459 470M470 294Q480 413 469 470" fill="none" stroke="#8c7069" stroke-width="2" opacity=".23"/>
        <path d="M259 510Q247 521 243 544L242 579Q245 588 250 581L255 559L257 593Q260 601 265 594L268 566L270 596Q274 602 278 594L280 565L283 588Q288 594 291 586L290 543Q292 526 283 516Z" fill="url(#${id}-skin)" stroke="#98796e" stroke-width="1.3"/>
        <path d="M632 513Q624 529 628 544L629 583Q633 593 637 585L639 565L642 594Q646 601 650 593L650 565L656 596Q660 600 663 593L659 562L667 583Q672 589 675 580L671 548Q666 526 653 515Z" fill="url(#${id}-skin)" stroke="#98796e" stroke-width="1.3"/>
        <path d="M412 116Q400 107 400 125L405 156Q408 165 416 158M508 116Q521 107 520 125L515 156Q511 165 505 158" fill="url(#${id}-face)" stroke="#98796e"/>
        <path d="M414 93Q422 63 460 61Q498 61 508 93L507 157Q504 190 480 209Q460 220 439 209Q415 192 413 158Z" fill="url(#${id}-face)" stroke="#98796e" stroke-width="1.4"/>
        <path d="M415 108Q409 72 432 59Q459 44 489 59Q516 73 507 110L501 94Q489 89 480 80Q450 98 421 91Z" fill="#4e555a"/>
        <path d="M423 119Q434 112 446 118M474 118Q486 112 499 119" fill="none" stroke="#7d675f" stroke-width="3" stroke-linecap="round"/>
        <path d="M424 129Q434 123 445 130Q434 135 424 129M475 130Q486 123 497 129Q486 135 475 130" fill="#eee9e2" stroke="#916f65" stroke-width="1.2"/>
        <ellipse cx="436" cy="129" rx="3.1" ry="3.8" fill="#525e60"/><ellipse cx="484" cy="129" rx="3.1" ry="3.8" fill="#525e60"/>
        <path d="M458 124L449 155Q459 161 470 155L464 145" fill="none" stroke="#a68170" stroke-width="1.5"/><path d="M450 157Q460 152 469 157" fill="none" stroke="#846960" stroke-width="1.7"/>
        <path d="M442 178Q453 172 460 175Q467 172 479 178Q459 184 442 178" fill="#a67570" opacity=".8"/><path d="M443 179Q460 178 478 179" fill="none" stroke="#8a6762"/>
        <path d="M433 192Q459 207 487 191" fill="none" stroke="#f8e6d5" stroke-width="3" opacity=".5"/>
      </g>
      <g class="rs12-m16-anatomy" data-scene="respiratoria">
        <path d="M444 290C433 273 410 288 397 308C376 341 366 390 374 424C379 445 419 437 441 423Z" fill="url(#${id}-lung)" stroke="#57899c" stroke-width="1.5"/>
        <path d="M477 290C492 273 515 289 529 313C547 346 557 397 547 425C542 443 505 435 479 423L476 382Q492 375 481 353Z" fill="url(#${id}-lung)" stroke="#57899c" stroke-width="1.5"/>
        <path d="M455 162Q465 173 461 194V298M461 298Q441 312 418 345M461 298Q485 312 510 345" fill="none" stroke="#e0ecec" stroke-width="17" stroke-linecap="round"/>
        <path d="M455 162Q465 173 461 194V298M461 298Q441 312 418 345M461 298Q485 312 510 345" fill="none" stroke="#6f9ca8" stroke-width="7" stroke-linecap="round"/>
        <path d="M417 343 398 373M420 339 427 376M506 341 492 374M510 344 532 378" fill="none" stroke="#d2e5e7" stroke-width="4" stroke-linecap="round"/>
        <path d="M450 218h22M450 232h22M450 246h22M450 260h22M450 274h22" stroke="#e6eeee" stroke-width="3" opacity=".8"/>
      </g>
      <g class="rs12-m16-route" data-scene="respiratoria">
        <g fill="#198aaa" opacity=".65"><circle cx="255" cy="170" r="4"/><circle cx="283" cy="184" r="3"/><circle cx="292" cy="153" r="4"/><circle cx="324" cy="177" r="3"/><circle cx="347" cy="158" r="3"/></g>
        <path class="rs12-m16-trail-under" d="M265 170C340 142 398 140 453 161Q465 177 461 202V298Q442 313 420 342"/>
        <path class="rs12-m16-trail" d="M265 170C340 142 398 140 453 161Q465 177 461 202V298Q442 313 420 342"/>
        <path class="rs12-m16-trail-under" d="M461 298Q485 313 508 342"/><path class="rs12-m16-trail" d="M461 298Q485 313 508 342"/>
        <g class="rs12-m16-caption"><path d="M262 226H339L379 187"/><rect x="160" y="211" width="132" height="35" rx="9"/><text x="176" y="234">Aire · inhalación</text></g>
      </g>
      <g class="rs12-m16-route" data-scene="piel-ojos" hidden>
        <path class="rs12-m16-trail-under" d="M283 103Q355 107 431 129M180 410Q218 435 283 454"/><path class="rs12-m16-trail" d="M283 103Q355 107 431 129M180 410Q218 435 283 454"/>
        <ellipse cx="435" cy="129" rx="15" ry="11" class="rs12-m16-contact"/><ellipse cx="285" cy="454" rx="15" ry="22" transform="rotate(13 285 454)" class="rs12-m16-contact"/>
        <g class="rs12-m16-caption"><rect x="155" y="67" width="141" height="35" rx="9"/><text x="171" y="90">Contacto: ojos</text><rect x="123" y="464" width="142" height="35" rx="9"/><text x="139" y="487">Contacto: piel</text></g>
      </g>
      <g class="rs12-m16-route" data-scene="ingestion" hidden>
        <g transform="translate(326 456) rotate(-12)"><rect x="0" y="0" width="46" height="68" rx="7" fill="#e7edf0" stroke="#6b8693" stroke-width="2"/><rect x="8" y="10" width="30" height="33" rx="3" fill="#a8c7ce"/><path d="M12 55h23" stroke="#7d9da9" stroke-width="3"/></g>
        <path d="M367 510Q382 490 390 470Q394 458 401 464L400 486Q422 465 427 474L416 499Q438 477 440 488L422 516Q415 535 395 540L369 550Z" fill="url(#${id}-skin)" stroke="#98796e" stroke-width="1.3"/>
        <path class="rs12-m16-trail-under" d="M372 477C313 379 324 266 449 181"/><path class="rs12-m16-trail" d="M372 477C313 379 324 266 449 181"/>
        <circle cx="459" cy="179" r="16" class="rs12-m16-contact"/>
        <g class="rs12-m16-caption"><rect x="121" y="337" width="188" height="53" rx="9"/><text x="137" y="359">Objeto / mano</text><text x="137" y="379">→ boca</text></g>
      </g>
      <g class="rs12-m16-svg-markers"><g data-marker="respiratoria" transform="translate(531 188)" role="button" tabindex="0" aria-label="1. Seleccionar respiración" aria-pressed="true"><circle class="rs12-m16-hit" r="27"/><path d="M-21 0 -62 -25"/><circle r="18"/><text y="6">1</text></g><g data-marker="piel-ojos" transform="translate(564 110)" role="button" tabindex="0" aria-label="2. Seleccionar piel y ojos" aria-pressed="false"><circle class="rs12-m16-hit" r="27"/><path d="M-20 0 -69 18"/><circle r="18"/><text y="6">2</text></g><g data-marker="ingestion" transform="translate(533 241)" role="button" tabindex="0" aria-label="3. Seleccionar ingestión accidental" aria-pressed="false"><circle class="rs12-m16-hit" r="27"/><path d="M-18 -7 -62 -52"/><circle r="18"/><text y="6">3</text></g></g>
      </g></svg>
      </div><aside class="rs12-m16-panel" aria-labelledby="${id}-route"><span class="rs12-m16-step">Vía <b>1</b> de 3</span><h3 id="${id}-route">Respiración</h3><p class="rs12-m16-connection">Aire → vías respiratorias</p><p class="rs12-m16-idea"></p><div class="rs12-m16-skin-controls" hidden><span>Acercar el contacto:</span><button type="button" data-focus="eyes">Ojos</button><button type="button" data-focus="skin">Piel</button></div><p class="rs12-m16-status" role="status" aria-live="polite">Selecciona una vía o muestra su trayectoria.</p><div class="rs12-m16-limit"><b>Cómo leer el gráfico</b><p>Las líneas relacionan una fuente con una vía de ingreso. No representan concentración, dosis, velocidad real ni un daño inevitable.</p></div></aside></div>`;
    container.appendChild(root);
    const svg = root.querySelector('svg'), title = root.querySelector('title'), desc = root.querySelector('desc'), status = root.querySelector('.rs12-m16-status');
    const media = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
    let selected = ROUTES[0], visible = true, playing = false, zoomed = false, timer = null, destroyed = false;
    const initialView = '0 0 900 680';
    const emit = () => { if (typeof opts.onSelect === 'function') opts.onSelect(selected.id, { label: selected.label, source: 'routes12' }); };
    function stop(message) { clearTimeout(timer); timer = null; playing = false; root.classList.remove('rs12-m16-playing'); root.querySelector('[data-action="play"]').textContent = 'Mostrar trayectoria'; if (message) status.textContent = message; }
    function setZoom(value, custom) { zoomed = !!value; svg.setAttribute('viewBox', zoomed ? (custom || selected.focus) : initialView); root.dataset.zoom = String(zoomed); root.querySelector('[data-action="zoom"]').textContent = zoomed ? 'Vista completa' : 'Acercar zona'; }
    function select(routeId, notify) {
      const next = ROUTES.find(r => r.id === routeId); if (!next || destroyed) return false;
      stop(); selected = next; root.dataset.route = next.id;
      root.querySelectorAll('[data-route], [data-pin]').forEach(el => el.setAttribute('aria-pressed', String((el.dataset.route || el.dataset.pin) === next.id)));
      root.querySelectorAll('[data-scene]').forEach(el => { const hide = el.dataset.scene !== next.id; el.toggleAttribute('hidden', hide); el.style.display = hide ? 'none' : ''; });
      root.querySelectorAll('[data-marker]').forEach(el => { el.classList.toggle('rs12-m16-selected', el.dataset.marker === next.id); el.setAttribute('aria-pressed', String(el.dataset.marker === next.id)); });
      root.querySelector('.rs12-m16-step b').textContent = ROUTES.indexOf(next) + 1;
      root.querySelector('h3').textContent = next.label; root.querySelector('.rs12-m16-connection').textContent = next.short; root.querySelector('.rs12-m16-idea').textContent = next.idea;
      root.querySelector('.rs12-m16-skin-controls').hidden = next.id !== 'piel-ojos';
      title.textContent = next.label + ': vía de ingreso'; desc.textContent = next.idea + ' ' + next.prompt + ' Representación conceptual, sin escala de concentración ni daño.';
      setZoom(false); status.textContent = next.prompt; if (notify) emit(); return true;
    }
    function action(event) {
      const marker = event.target.closest('[data-marker]'); if (marker && root.contains(marker)) return select(marker.dataset.marker, true);
      const button = event.target.closest('button'); if (!button || !root.contains(button) || destroyed) return;
      if (button.dataset.route || button.dataset.pin) return select(button.dataset.route || button.dataset.pin, true);
      if (button.dataset.focus) { setZoom(true, button.dataset.focus === 'skin' ? '175 335 250 235' : ROUTES[1].focus); status.textContent = button.dataset.focus === 'skin' ? 'Acercamiento al contacto con la piel.' : 'Acercamiento al contacto con los ojos.'; return; }
      if (button.dataset.action === 'zoom') { setZoom(!zoomed); status.textContent = zoomed ? 'Acercamiento a la zona seleccionada.' : 'Vista completa del cuerpo.'; return; }
      if (button.dataset.action === 'play') {
        if (playing) return stop('Trayectoria en pausa.');
        if (!visible || document.hidden) return;
        if (media && media.matches) { stop('Movimiento reducido: la línea fija muestra la trayectoria seleccionada.'); return; }
        playing = true; root.classList.add('rs12-m16-playing'); button.textContent = 'Pausar trayectoria'; status.textContent = 'Sigue la línea en movimiento. ' + selected.prompt;
        timer = setTimeout(() => stop('Trayectoria completada. Puedes repetirla o elegir otra vía.'), 6000);
      }
    }
    function key(event) {
      const marker = event.target.closest('[data-marker]');
      if (marker && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); select(marker.dataset.marker, true); return; }
      const button = event.target.closest('[data-route]'); if (!button) return;
      const index = ROUTES.findIndex(r => r.id === button.dataset.route); let target;
      if (event.key === 'ArrowRight') target = Math.min(2, index + 1);
      if (event.key === 'ArrowLeft') target = Math.max(0, index - 1);
      if (event.key === 'Home') target = 0; if (event.key === 'End') target = 2;
      if (target !== undefined) { event.preventDefault(); select(ROUTES[target].id, true); root.querySelector('[data-route="' + ROUTES[target].id + '"]').focus(); }
    }
    function visibility() { if (document.hidden) stop('Trayectoria en pausa.'); }
    function reduceChanged() { if (media && media.matches) stop('Movimiento reducido: se conserva la trayectoria fija.'); }
    root.addEventListener('click', action); root.addEventListener('keydown', key); document.addEventListener('visibilitychange', visibility); if (media && media.addEventListener) media.addEventListener('change', reduceChanged);
    select('respiratoria', false);
    return {
      root,
      select(id) { return select(id, false); },
      getState() { return { selected: selected.id, playing, zoomed, visible, reducedMotion: !!(media && media.matches) }; },
      setVisible(value) { visible = !!value; root.dataset.visible = String(visible); if (!visible) stop('Trayectoria en pausa.'); },
      pause() { stop('Trayectoria en pausa.'); },
      cleanup() { if (destroyed) return; stop(); destroyed = true; root.removeEventListener('click', action); root.removeEventListener('keydown', key); document.removeEventListener('visibilitychange', visibility); if (media && media.removeEventListener) media.removeEventListener('change', reduceChanged); root.remove(); }
    };
  }
  global.RespiraRoutes12 = Object.freeze({ mount, routes: ROUTES });
})(window);
