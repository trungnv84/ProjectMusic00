const $ = id => document.getElementById(id);
const names = { chatgpt:'ChatGPT', claude:'Claude', gemini:'Gemini', grok:'Grok', deepseek:'DeepSeek' };
const order = ['chatgpt','claude','gemini','grok','deepseek'];
const roundMeta = [
  { key:'round1',    label:'ROUND 1 - ĐỘC LẬP',       providers: order, desc: 'Mỗi AI độc lập trả lời câu hỏi gốc.' },
  { key:'round2',    label:'ROUND 2 - PHẢN BIỆN',      providers: order, desc: 'Mỗi AI đọc kết quả Round 1 và phản biện.' },
  { key:'round3',    label:'ROUND 3 - GIẢI PHÁP',      providers: order, desc: 'Mỗi AI đề xuất giải pháp tổng hợp.' },
  { key:'round4',    label:'ROUND 4 - ĐÁNH GIÁ',       providers: order, desc: 'Mỗi AI đánh giá các giải pháp Round 3.' },
  { key:'round5',    label:'ROUND 5 - CHỦ TỌA',        providers: [],    desc: 'Chỉ AI chủ tọa (Judge) tổng hợp kết quả.' },
  { key:'redTeam',   label:'ROUND 6 - RED TEAM',       providers: [],    desc: 'Chỉ AI Red Team phản biện quyết định của Judge.' },
  { key:'final',     label:'ROUND 7 - FINAL JUDGE',    providers: [],    desc: 'Chỉ AI Judge xem xét Red Team & ra quyết định cuối.' }
];
let lastScanResult = [];
let lastSnapshots = [];
const manualTranscript = {};
const previewSelection = {};

$('scanBtn').addEventListener('click', scan);
$('startBtn').addEventListener('click', start);
$('resumeBtn').addEventListener('click', resume);
$('stopBtn').addEventListener('click', async () => { await chrome.runtime.sendMessage({type:'STOP_COUNCIL'}); await refresh(); });
$('recoveryOpenBtn').addEventListener('click', () => { $('recoveryPanel').style.display = $('recoveryPanel').style.display === 'none' ? 'block' : 'none'; buildRoundBuilder(); });
$('recoveryCloseBtn').addEventListener('click', () => { $('recoveryPanel').style.display = 'none'; });
$('snapshotBtn').addEventListener('click', scanSnapshots);
$('manualResumeBtn').addEventListener('click', doManualResume);

async function scan(){
  const r = await chrome.runtime.sendMessage({type:'SCAN_TABS'});
  lastScanResult = r.tabs || [];
  renderProviders(lastScanResult);
  updateScanSummary();
}

async function start(){
  const question = $('question').value.trim();
  if(!question){ alert('Hãy nhập câu hỏi.'); return; }
  if (!confirm('Bắt đầu cuộc họp mới sẽ xóa toàn bộ tiến độ cũ. Tiếp tục?')) return;
  $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('manualResumeBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang bắt đầu...');
  const r = await chrome.runtime.sendMessage({type:'START_COUNCIL', question, mode:$('mode').value});
  if(!r.ok){ setPhase('Lỗi'); alert(r.error); }
  await refresh();
  $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false;
}

async function resume(){
  $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('manualResumeBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang khôi phục tiến độ...');
  const r = await chrome.runtime.sendMessage({type:'RESUME_COUNCIL'});
  if(!r.ok){ setPhase('Lỗi Resume'); alert(r.error); await refresh(); $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false; return; }
  await refresh();
  $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false;
}

function describeProgress(s){
  if (!s) return '';
  const t = s.transcript || {};
  const done = Object.keys(t).filter(k => t[k] && Object.keys(t[k]).length > 0);
  const ck = s.checkpoint;
  let info = `Đã hoàn thành ${done.length}/7 round.`;
  if (done.length > 0) info += ` (${done.map(k => (roundMeta.find(m=>m.key===k)||{}).label || k).join(', ')})`;
  if (ck && ck.roundKey) {
    const doneList = (ck.done || []).map(p => names[p] || p).join(', ') || 'chưa AI nào xong';
    info += `\nĐang dừng ở: ${(roundMeta.find(m=>m.key===ck.roundKey)||{}).label || ck.roundKey} — đã xong: ${doneList}.`;
  }
  if (s.error) info += `\nLỗi trước đó: ${s.error}`;
  return info;
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

  const running = s.status === 'running';
  $('stopBtn').disabled = !running;
  $('startBtn').disabled = running;
  $('recoveryOpenBtn').disabled = running;
  $('question').disabled = running;

  const can = await chrome.runtime.sendMessage({type:'CAN_RESUME'});
  const canResume = !running && can && can.ok && can.canResume;
  $('resumeBtn').disabled = !canResume;

  const hint = $('resumeHint');
  if (canResume) {
    const desc = describeProgress(s);
    hint.style.display = 'block';
    hint.innerHTML = `<b>⏯ Có thể tiếp tục:</b><br>${escapeHtml(desc).replace(/\n/g,'<br>')}<br><small style="opacity:.75">Các tab AI đã có nội dung sẽ được đọc lại tự động thay vì gửi lại prompt.</small>`;
    if (s.question) $('question').value = s.question;
  } else if (s.status === 'completed') {
    hint.style.display = 'block';
    hint.innerHTML = `<b>✅ Cuộc họp trước đã hoàn tất.</b> Nhấn "Bắt đầu họp" để chạy một cuộc mới (sẽ xóa tiến độ cũ).`;
  } else {
    hint.style.display = 'none';
  }
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

/* ============ Recovery Mode (Manual Resume) ============ */

async function scanSnapshots(){
  $('snapshotStatus').innerHTML = '<span class="snapshot-working">🔄 Đang quét 5 tab... (sẽ lần lượt mở từng tab lên phía trước)</span>';
  $('snapshotBtn').disabled = true;
  try {
    const r = await chrome.runtime.sendMessage({type:'RECOVER_SNAPSHOT'});
    if (!r.ok) throw new Error(r.error || 'Quét thất bại.');
    lastSnapshots = r.snapshots || [];
    let summary = '';
    let total = 0;
    for (const s of lastSnapshots) {
      const count = s.candidates ? s.candidates.length : 0;
      total += count;
      const color = s.ok ? (count > 0 ? '#55d58c' : '#f2a84a') : '#e55';
      summary += `<span style="color:${color};margin-right:12px">${names[s.provider]||s.provider}: ${s.ok ? count+' message' : 'lỗi'}${s.error ? ' ('+escapeHtml(s.error)+')' : ''}</span>`;
    }
    $('snapshotStatus').innerHTML = `✅ Quét xong. Tổng ${total} message tìm thấy.<br>${summary}`;
  } catch (err) {
    $('snapshotStatus').innerHTML = `<span style="color:#f56">❌ ${escapeHtml(err.message||String(err))}</span>`;
  } finally {
    $('snapshotBtn').disabled = false;
  }
  buildRoundBuilder();
}

function getSnapshotFor(provider){
  return lastSnapshots.find(s => s.provider === provider) || { provider, candidates: [] };
}

function buildRoundBuilder(){
  const box = $('roundBuilder');
  box.innerHTML = roundMeta.map(m => {
    const needAIs = m.providers.length > 0 ? m.providers : determineSingleAI(m.key);
    return `
    <div class="round-card" data-round="${m.key}">
      <div class="round-title">
        <span>${m.label}</span>
        <div class="round-actions">
          <button type="button" class="mini-btn auto-btn" data-action="autofill" data-round="${m.key}" title="Tự điền: lấy message cuối của mỗi AI">✨ Tự điền</button>
          <button type="button" class="mini-btn danger-btn" data-action="clear" data-round="${m.key}" title="Xóa tất cả các ô của round này">Xóa</button>
        </div>
      </div>
      <div class="round-desc">${m.desc}</div>
      <div class="round-providers">
        ${needAIs.map(p => buildProviderSlot(m.key, p)).join('')}
      </div>
    </div>`;
  }).join('');

  box.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      const key = e.currentTarget.dataset.round;
      if (action === 'autofill') autoFillRound(key);
      if (action === 'clear') clearRound(key);
    });
  });
  box.querySelectorAll('select.provider-select').forEach(sel => {
    sel.addEventListener('change', onCandidateSelect);
  });
  box.querySelectorAll('textarea.provider-text').forEach(ta => {
    ta.addEventListener('input', onTextareaInput);
  });
  updateManualResumeState();
}

function determineSingleAI(roundKey){
  const question = $('question').value.trim();
  const tabs = (lastScanResult.length ? lastScanResult : []).filter(t => t.provider);
  const providers = tabs.map(t => t.provider);
  if (!question || providers.length < 5) return [];
  try {
    const hash = Array.from(question).reduce((a,c)=>a+c.charCodeAt(0),0);
    const judge = providers[hash % 5];
    const rest = providers.filter(p => p !== judge);
    const redTeam = rest[(hash * 7 + 3) % rest.length];
    if (roundKey === 'round5' || roundKey === 'final') return [judge];
    if (roundKey === 'redTeam') return [redTeam];
  } catch (_) {}
  return [];
}

function buildProviderSlot(roundKey, provider){
  const snap = getSnapshotFor(provider);
  const candidates = snap.candidates || [];
  const cur = (manualTranscript[roundKey] && manualTranscript[roundKey][provider]) || '';
  const selectedIdx = findSelectedIndex(candidates, cur);
  const statusLine = candidates.length
    ? `<span class="cand-count">✓ ${candidates.length} message tìm thấy</span>`
    : `<span class="cand-count cand-missing">Không thấy message — nhập tay</span>`;
  return `
    <div class="provider-slot" data-round="${roundKey}" data-provider="${provider}">
      <div class="slot-head">
        <b>${names[provider] || provider}</b>
        ${statusLine}
      </div>
      <select class="provider-select" data-round="${roundKey}" data-provider="${provider}">
        <option value="">-- Chọn message (hoặc nhập tay bên dưới) --</option>
        ${candidates.map((c, i) => `
          <option value="${i}" ${selectedIdx === i ? 'selected' : ''}>
            [${i+1}] ${escapeHtml(truncate(c.text, 110))} (${c.length} chữ)
          </option>
        `).join('')}
      </select>
      <textarea class="provider-text" rows="5" data-round="${roundKey}" data-provider="${provider}" placeholder="Hoặc dán/sửa nội dung trực tiếp tại đây...">${escapeHtml(cur)}</textarea>
    </div>
  `;
}

function findSelectedIndex(candidates, cur){
  if (!cur) return -1;
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].text === cur) return i;
    if (candidates[i].text.startsWith(cur.slice(0, Math.min(80, cur.length)))) return i;
  }
  return -1;
}

function truncate(s, n){
  const t = (s || '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n) + '…' : t;
}

function onCandidateSelect(e){
  const sel = e.currentTarget;
  const roundKey = sel.dataset.round;
  const provider = sel.dataset.provider;
  const snap = getSnapshotFor(provider);
  const index = sel.value === '' ? -1 : parseInt(sel.value, 10);
  const slot = document.querySelector(`.provider-slot[data-round="${roundKey}"][data-provider="${provider}"]`);
  const ta = slot && slot.querySelector('textarea.provider-text');
  if (index >= 0 && snap.candidates && snap.candidates[index]) {
    const txt = snap.candidates[index].text;
    ta.value = txt;
    if (!manualTranscript[roundKey]) manualTranscript[roundKey] = {};
    manualTranscript[roundKey][provider] = txt;
  } else {
    if (manualTranscript[roundKey]) delete manualTranscript[roundKey][provider];
  }
  updateManualResumeState();
}

function onTextareaInput(e){
  const ta = e.currentTarget;
  const roundKey = ta.dataset.round;
  const provider = ta.dataset.provider;
  const val = ta.value.trim();
  if (!manualTranscript[roundKey]) manualTranscript[roundKey] = {};
  if (val) manualTranscript[roundKey][provider] = val;
  else delete manualTranscript[roundKey][provider];
  updateManualResumeState();
}

function autoFillRound(key){
  const m = roundMeta.find(x => x.key === key);
  if (!m) return;
  const providers = m.providers.length > 0 ? m.providers : determineSingleAI(key);
  for (const p of providers) {
    const snap = getSnapshotFor(p);
    const last = (snap.candidates && snap.candidates.length) ? snap.candidates[snap.candidates.length - 1] : null;
    if (last) {
      if (!manualTranscript[key]) manualTranscript[key] = {};
      manualTranscript[key][p] = last.text;
    }
  }
  buildRoundBuilder();
}

function clearRound(key){
  delete manualTranscript[key];
  buildRoundBuilder();
}

function updateManualResumeState(){
  const hint = $('recoveryHint');
  const btn = $('manualResumeBtn');
  const question = $('question').value.trim();
  const filled = roundMeta.filter(m => manualTranscript[m.key] && Object.keys(manualTranscript[m.key]).length > 0);
  const firstMissingIdx = roundMeta.findIndex(m => !manualTranscript[m.key] || Object.keys(manualTranscript[m.key]).length === 0);
  const continuous = filled.length > 0 && filled.every((m, i) => roundMeta[i] && roundMeta[i].key === m.key);

  if (!question) {
    btn.disabled = true;
    hint.innerHTML = '⚠ Nhập câu hỏi gốc vào ô trên cùng (để hệ thống biết context khi tiếp tục các round sau).';
    hint.className = 'recovery-hint rh-warn';
    return;
  }
  if (filled.length === 0) {
    btn.disabled = true;
    hint.innerHTML = '💡 Chưa chọn kết quả nào. Chọn từng message (hoặc nhập tay), hệ thống sẽ chạy tiếp từ round trống đầu tiên.';
    hint.className = 'recovery-hint rh-info';
    return;
  }
  if (!continuous) {
    btn.disabled = true;
    const firstGap = roundMeta[firstMissingIdx].label;
    hint.innerHTML = `⚠ Cần điền liên tiếp từ Round 1. Round bị bỏ trống đầu tiên: <b>${firstGap}</b>. Các round sau chỉ có thể chạy khi có kết quả các round trước đó.`;
    hint.className = 'recovery-hint rh-warn';
    return;
  }
  const nextLabel = firstMissingIdx === -1 ? 'tất cả 7 round đã đầy đủ (sẽ hoàn tất ngay khi khôi phục)' : `sẽ tiếp tục từ <b>${roundMeta[firstMissingIdx].label}</b>`;
  btn.disabled = false;
  hint.innerHTML = `✅ ${filled.length}/7 round đã gán. ${nextLabel}.`;
  hint.className = 'recovery-hint rh-ok';
}

async function doManualResume(){
  const question = $('question').value.trim();
  if (!question) { alert('Nhập câu hỏi gốc.'); return; }
  const payload = { question, mode: $('mode').value, transcript: JSON.parse(JSON.stringify(manualTranscript)) };
  $('manualResumeBtn').disabled = true; $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang khôi phục thủ công...');
  const r = await chrome.runtime.sendMessage({type:'MANUAL_RESUME', payload});
  if(!r.ok){ setPhase('Lỗi khôi phục thủ công'); alert(r.error); await refresh(); $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false; return; }
  await refresh();
  $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false;
  $('recoveryPanel').style.display = 'none';
}

setInterval(refresh, 1200);
scan();
refresh();
