/* ==================== Translations ==================== */
const t = {
  th: {
    title: "ตัวช่วยคาดการณ์วันมีประจำเดือน",
    instruction: `กรอก <b>วันแรกของประจำเดือน</b> <span class="mono">(ล่าสุด → ย้อนหลัง)</span>
      <span class="pill">อย่างน้อย 3 ครั้ง</span>`,
    date1: "วันแรกของประจำเดือนครั้งล่าสุด (LMP):",
    date2: "วันแรกของประจำเดือนครั้งก่อนหน้า (PMP):",
    date3: "วันแรกของประจำเดือนก่อนหน้านั้น:",
    date4: "(ถ้ามี) วันแรกของประจำเดือนก่อนหน้านั้น:",
    date5: "(ถ้ามี) วันแรกของประจำเดือนก่อนหน้านั้น:",
    calc: "คำนวณวันมีประจำเดือนถัดไป",
    clear: "ล้างค่า",
    copyResult: "คัดลอกผลลัพธ์",
    copied: "คัดลอกผลลัพธ์แล้ว",
    resultTitle: "ผลการคำนวณ",
    predicted: "คาดการณ์วันมีประจำเดือนถัดไป:",
    cycles: "ความยาวรอบเดือน (วัน):",
    median: "ค่ากลางของความยาวรอบเดือน:",
    mad: "ค่ากลางความแตกต่างของรอบเดือน:",
    credibility: "ความน่าเชื่อถือ:",
    regular: "ปกติ",
    irregular: "ไม่สม่ำเสมอ",
    credHigh: "สูง",
    credMedium: "ปานกลาง",
    credLow: "ต่ำ",
    refsTitle: "เอกสารอ้างอิง",
    need3: "กรุณากรอกอย่างน้อย 3 วัน",
    modalTitle: "ผลคาดการณ์วันมีประจำเดือนถัดไป",
    modalSub: "โปรดบันทึกวันที่ไว้เพื่อการติดตาม",
    modalCopy: "คัดลอกวันที่",
    modalClose: "ปิด",
    advice1: "หากรอบเดือนสั้นกว่า 21 วัน หรือยาวเกิน 35 วัน หรือไม่สม่ำเสมออย่างชัดเจน อาจเป็นสัญญาณของปัญหาสุขภาพ",
    advice2: "หากขาดประจำเดือนเป็นเวลานานกว่า 90 วัน ติดต่อกัน ควรปรึกษาแพทย์",
    disclaimer: "เอกสารนี้เป็นเพียงเครื่องมือให้ความรู้ ไม่ได้ใช้แทนการวินิจฉัยหรือคำแนะนำทางการแพทย์"
  },
  en: {
    title: "Menstrual Cycle Predictor",
    instruction: `Enter the <b>first day of each period</b> <span class="mono">(most recent → earlier)</span>
      <span class="pill">at least 3 times</span> <span class="sep">•</span>
      <span class="pill">up to 5 times</span>`,
    date1: "First day of the most recent period (LMP):",
    date2: "First day of the previous period (PMP):",
    date3: "First day of the earlier period:",
    date4: "(If available) first day of the earlier period:",
    date5: "(If available) first day of the earlier period:",
    calc: "Predict Next Period Date",
    clear: "Clear",
    copyResult: "Copy Result",
    copied: "Result copied",
    resultTitle: "Result",
    predicted: "Predicted next period date:",
    cycles: "Cycle lengths (days):",
    median: "Median cycle length (days):",
    mad: "Median difference (variability):",
    credibility: "Credibility:",
    regular: "Regular",
    irregular: "Irregular",
    credHigh: "High",
    credMedium: "Medium",
    credLow: "Low",
    refsTitle: "References",
    need3: "Please enter at least 3 dates",
    modalTitle: "Predicted Next Period Date",
    modalSub: "Save this date for tracking",
    modalCopy: "Copy Date",
    modalClose: "Close",
    advice1: "If cycles are shorter than 21 days, longer than 35 days, or clearly irregular, it may indicate a health issue.",
    advice2: "If you miss periods for more than 90 consecutive days, consult a physician.",
    disclaimer: "This tool is for educational purposes only and does not replace medical diagnosis or professional advice."
  }
};

/* ==================== DOM helpers ==================== */
const $ = (id) => document.getElementById(id);
const inputs = ['date1','date2','date3','date4','date5'].map($);

function getLang(){ return localStorage.getItem('lang') || document.documentElement.lang || 'th'; }
function setLang(lang){
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.title = t[lang].title;
}

function fmtDateTh(d){
  return d.toLocaleDateString('th-TH-u-ca-buddhist',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function fmtDateEn(d){
  return d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

function applyLang(lang){
  $('app-name').textContent = t[lang].title;
  $('guide').querySelector('.guide-text').innerHTML = t[lang].instruction;

  $('date1-label').textContent = t[lang].date1;
  $('date2-label').textContent = t[lang].date2;
  $('date3-label').textContent = t[lang].date3;
  $('date4-label').textContent = t[lang].date4;
  $('date5-label').textContent = t[lang].date5;
  $('calculate-btn').textContent = t[lang].calc;
  $('btn-clear').textContent = t[lang].clear;

  $('result-title').textContent = t[lang].resultTitle;
  $('predicted-line').querySelector('b').textContent = t[lang].predicted.replace(':','');
  $('cycles-line').querySelector('b').textContent = t[lang].cycles.replace(':','');
  $('median-line').querySelector('b').textContent = t[lang].median.replace(':','');
  $('mad-line').querySelector('b').textContent = t[lang].mad.replace(':','');
  $('credibility-line').querySelector('b').textContent = t[lang].credibility.replace(':','');
  $('refs-title').textContent = t[lang].refsTitle;

  // advice/disclaimer (card)
  $('adv-1').textContent = t[lang].advice1;
  $('adv-2').textContent = t[lang].advice2;
  $('disc').textContent  = t[lang].disclaimer;

  // copy button label
  $('copy-btn-label').textContent = t[lang].copyResult;

  // modal strings
  $('modal-title').textContent = t[lang].modalTitle;
  $('modal-sub') && ($('modal-sub').textContent = t[lang].modalSub);
  $('modal-copy').textContent = t[lang].modalCopy;
  $('modal-dismiss').textContent = t[lang].modalClose;
  $('modal-close').setAttribute('aria-label', t[lang].modalClose);

  // segmented control state
  document.querySelectorAll('.lang-toggle .seg').forEach(btn=>{
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

/* ==================== Progressive dates (top→down) ==================== */
function wireProgressiveDates(){
  const today = new Date().toISOString().split('T')[0];
  inputs.forEach((el,i)=>{
    el.max = i === 0 ? today : '';
    if (i>0) el.disabled = true;
    el.addEventListener('change', ()=>{
      if (el.value && i+1 < inputs.length){
        inputs[i+1].disabled = false;
        inputs[i+1].max = el.value; // must be <= previous date
      } else {
        for (let j=i+1; j<inputs.length; j++){
          inputs[j].disabled=true; inputs[j].value=''; inputs[j].removeAttribute('max');
        }
      }
    });
  });
}

/* Click anywhere on the date block to open the picker */
function wireDateBlockClicks(){
  document.querySelectorAll('.date-block').forEach(block => {
    const input = block.querySelector('input[type="date"]');
    block.addEventListener('click', () => {
      if (!input || input.disabled) return;
      input.showPicker?.();
      input.focus();
    });
    block.addEventListener('keydown', (e) => {
      if (!input || input.disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.showPicker?.();
        input.focus();
      }
    });
  });
}

function collectDatesAscending(){
  const vals = inputs.map(x=>x.value).filter(Boolean);
  const ds = vals.map(d=>new Date(d));
  ds.sort((a,b)=>a-b);
  return ds;
}

function calcStats(datesAsc){
  const cycles=[];
  for (let i=0;i<datesAsc.length-1;i++){
    cycles.push(Math.round((datesAsc[i+1]-datesAsc[i])/86400000));
  }
  const sorted=[...cycles].sort((a,b)=>a-b);
  const mid=Math.floor(sorted.length/2);
  const median = sorted.length%2? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
  const diffs = cycles.map(c=>Math.abs(c-median)).sort((a,b)=>a-b);
  const midD=Math.floor(diffs.length/2);
  const mad = diffs.length%2? diffs[midD] : (diffs[midD-1]+diffs[midD])/2;

  const min=Math.min(...cycles), max=Math.max(...cycles);
  const irregular = (mad >= 9) || min < 21 || max > 35;

  return { cycles, median, mad, irregular };
}

/* Credibility */
function computeCredibility(n, median, mad, lang){
  if (n >= 4 && mad <= 3 && median >= 21 && median <= 35)
    return { lvl: lang==='th'? t.th.credHigh : t.en.credHigh, key:'high' };
  if (n >= 3 && mad <= 7 && median >= 21 && median <= 40)
    return { lvl: lang==='th'? t.th.credMedium : t.en.credMedium, key:'medium' };
  return { lvl: lang==='th'? t.th.credLow : t.en.credLow, key:'low' };
}

function predictNextDate(datesAsc, median){
  const last = datesAsc[datesAsc.length-1];
  const predicted=new Date(last);
  predicted.setDate(predicted.getDate()+median);
  return predicted;
}

/* Modal control */
function openModal(){
  const modal = $('result-modal');
  modal.setAttribute('aria-hidden','false');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const modal = $('result-modal');
  modal.setAttribute('aria-hidden','true');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function renderResult(predicted, stats, cred, lang){
  const predictedStr = lang==='th' ? fmtDateTh(predicted) : fmtDateEn(predicted);

  // Card content
  $('predicted-line').innerHTML   = `<b>${t[lang].predicted}</b> ${predictedStr}`;
  $('cycles-line').innerHTML      = `<b>${t[lang].cycles}</b> ${stats.cycles.join(", ")}`;
  $('median-line').innerHTML      = `<b>${t[lang].median}</b> ${Number(stats.median).toFixed(1)}`;
  $('mad-line').innerHTML         = `<b>${t[lang].mad}</b> ${Number(stats.mad).toFixed(1)}`;
  $('credibility-line').innerHTML = `<b>${t[lang].credibility}</b> ${cred.lvl}`;

  const reg = $('badge-regularity');
  reg.textContent = stats.irregular ? t[lang].irregular : t[lang].regular;
  reg.classList.toggle('bad', stats.irregular);
  reg.classList.toggle('good', !stats.irregular);

  const conf = $('badge-confidence');
  conf.textContent = `${t[lang].credibility} ${cred.lvl}`;
  conf.classList.remove('low','medium','high');
  conf.classList.add(cred.key);

  $('result-card').classList.remove('hidden');

  // Popup: show only date + two badges
  $('modal-date').textContent = predictedStr;

  const mreg = $('m-badge-regularity');
  mreg.textContent = stats.irregular ? t[lang].irregular : t[lang].regular;
  mreg.classList.remove('good','bad');
  mreg.classList.add(stats.irregular ? 'bad' : 'good');

  const mconf = $('m-badge-confidence');
  mconf.textContent = `${t[lang].credibility} ${cred.lvl}`;
  mconf.classList.remove('low','medium','high');
  mconf.classList.add(cred.key);

  // Advice box in modal
  $('m-adv-1').textContent = t[lang].advice1;
  $('m-adv-2').textContent = t[lang].advice2;
  $('m-disc').textContent  = t[lang].disclaimer;

  openModal();
}

function copyResult(lang){
  const text = [
    `${t[lang].resultTitle}`,
    $('predicted-line').innerText,
    $('cycles-line').innerText,
    $('median-line').innerText,
    $('mad-line').innerText,
    $('credibility-line').innerText,
    `${t[lang].regular}/${t[lang].irregular}: ${$('badge-regularity').innerText}`,
    `— ${t[lang].advice1}`,
    `— ${t[lang].advice2}`,
    `— ${t[lang].disclaimer}`
  ].join('\n');
  navigator.clipboard.writeText(text).then(()=>{
    $('alert').textContent = t[lang].copied;
    setTimeout(()=>{$('alert').textContent='';},2000);
  });
}

function resetForm(){
  $('cycle-form').reset();
  inputs.forEach((el,i)=>{ if(i>0){ el.disabled=true; el.removeAttribute('max'); }});
  $('result-card').classList.add('hidden');
  $('alert').textContent='';
}

/* ==================== Init ==================== */
document.addEventListener('DOMContentLoaded', ()=>{
  const lang = getLang(); setLang(lang); applyLang(lang);

  document.querySelectorAll('.lang-toggle .seg').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sel = btn.dataset.lang; setLang(sel); applyLang(sel);
    });
  });

  wireProgressiveDates();
  wireDateBlockClicks();

  $('btn-calc').addEventListener('click', ()=>{
    $('alert').textContent='';
    const lang=getLang();
    const ds = collectDatesAscending();
    if (ds.length < 3){
      $('alert').textContent = t[lang].need3;
      return;
    }

    const stats = calcStats(ds);
    const cred  = computeCredibility(ds.length, stats.median, stats.mad, lang);

    // Optional logging (fire-and-forget)
    fetch("https://script.google.com/macros/s/AKfycbzBOQPGL0rIYlF0pDPnNs-4wrkEBLxSMho-ErgJ-pb4mhpD2AYquB2ipxJy6HwmvlJx0w/exec",{
      mode:"no-cors", method:"POST", headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        lang,
        dates: ds.map(d=>d.toISOString().slice(0,10)),
        result: stats.irregular ? 'Irregular' : 'Regular',
        credibility: cred.key
      })
    }).catch(()=>{});

    const predicted = predictNextDate(ds, stats.median);
    renderResult(predicted, stats, cred, lang);
  });

  $('btn-copy').addEventListener('click', ()=>copyResult(getLang()));

  // Modal controls
  $('modal-close').addEventListener('click', closeModal);
  $('modal-dismiss').addEventListener('click', closeModal);
  $('modal-backdrop').addEventListener('click', closeModal);
  $('modal-copy').addEventListener('click', ()=>{
    const lang = getLang();
    navigator.clipboard.writeText($('modal-date').textContent).then(()=>{
      $('alert').textContent = t[lang].copied;
      setTimeout(()=>{$('alert').textContent='';},2000);
    });
  });

  $('btn-clear').addEventListener('click', ()=>{
    closeModal();
    resetForm();
  });

  // ESC to close modal
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeModal();
  });
});