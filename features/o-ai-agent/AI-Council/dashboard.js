const $ = id => document.getElementById(id);
const names = { chatgpt:'ChatGPT', claude:'Claude', gemini:'Gemini', grok:'Grok', deepseek:'DeepSeek' };
const order = ['chatgpt','claude','gemini','grok','deepseek'];
let lastScanResult = [];

$('scanBtn').addEventListener('click', scan);
$('startBtn').addEventListener('click', start);
$('stopBtn').addEventListener('click', async () => { await chrome.runtime.sendMessage({type:'STOP_COUNCIL'}); await refresh(); });

async function scan(){
  const r = await chrome.runtime.sendMessage({type:'SCAN_TABS'});
  lastScanResult = r.tabs || [];
  renderProviders(lastScanResult);
  updateScanSummary();
}

async function start(){
  const question = $('question').value.trim();
  if(!question){ alert('Hãy nhập câu hỏi.'); return; }
  $('startBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang bắt đầu...');
  const r = await chrome.runtime.sendMessage({type:'START_COUNCIL', question, mode:$('mode').value});
  if(!r.ok){ setPhase('Lỗi'); alert(r.error); }
  await refresh();
  $('startBtn').disabled = false; $('stopBtn').disabled = true;
}

async function refresh(){
  const r = await chrome.runtime.sendMessage({type:'GET_STATE'});
  if(!r.ok) return;
  const s = r.state || {};
  renderProviders(s.tabs || lastScanResult);
  setPhase(s.phase || s.status || 'Chưa chạy');
  $('result').textContent = s.final || (s.error ? `ERROR: ${s.error}` : 'Chưa có kết quả.');
  $('transcript').textContent = JSON.stringify(s.transcript || {}, null, 2);
  $('log').innerHTML = (s.log || []).map(x => `<div>[${new Date(x.at).toLocaleTimeString()}] ${escapeHtml(x.message)}</div>`).join('');
  $('log').scrollTop = $('log').scrollHeight;
}

function setPhase(v){ $('phase').textContent = v; }

function updateScanSummary(){
  const totalTabs = lastScanResult.length;
  const aiTabs = lastScanResult.filter(t => t.provider).length;
  const el = document.getElementById('scanSummary');
  if(el){
    el.innerHTML = `<span class="scan-info">Đã quét <b>${totalTabs}</b> tab | Phát hiện <b class="${aiTabs===5?'all-good':'need-more'}">${aiTabs}/5</b> AI</span>`;
  }
}

function renderProviders(tabs){
  const map = Object.fromEntries((tabs||[]).filter(t=>t.provider).map(t => [t.provider, t]));
  $('providers').innerHTML = `
    <div id="scanSummary" class="scan-summary"></div>
    ${order.map(p => {
      const t = map[p];
      return `
      <div class="provider">
        <div class="name">${names[p]}</div>
        <div class="status ${t ? 'online' : 'offline'}">
          ${t ? '● Đã tìm thấy' : '○ Chưa có tab'}
        </div>
        ${t ? `
          <div class="tab-info">
            <div class="tab-url" title="${escapeHtml(t.url)}">${escapeHtml(t.url.slice(0,45))}</div>
            <div class="tab-title">${escapeHtml((t.title||'').slice(0,40))}</div>
          </div>
        ` : `
          <div class="hint">Mở tab <b>${getExpectedUrl(p)}</b></div>
        `}
      </div>`;
    }).join('')}
  `;
  updateScanSummary();
}

function getExpectedUrl(provider){
  const urls = {
    chatgpt: 'https://chatgpt.com',
    claude: 'https://claude.ai',
    gemini: 'https://gemini.google.com',
    grok: 'https://grok.com',
    deepseek: 'https://chat.deepseek.com'
  };
  return urls[provider] || '';
}

function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

setInterval(refresh, 1200);
scan();
refresh();
