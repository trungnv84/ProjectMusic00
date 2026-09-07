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
let lastRenderedStateKey = '';
const manualTranscript = {};
const previewSelection = {};

$('scanBtn').addEventListener('click', scan);
$('startBtn').addEventListener('click', start);
$('resumeBtn').addEventListener('click', resume);
$('skipQuotaBtn').addEventListener('click', skipQuota);
$('stopBtn').addEventListener('click', async () => { await chrome.runtime.sendMessage({type:'STOP_COUNCIL'}); await refresh(); });
$('recoveryOpenBtn').addEventListener('click', () => { $('recoveryPanel').style.display = $('recoveryPanel').style.display === 'none' ? 'block' : 'none'; buildRoundBuilder(); });
$('recoveryCloseBtn').addEventListener('click', () => { $('recoveryPanel').style.display = 'none'; });
$('snapshotBtn').addEventListener('click', scanSnapshots);
$('manualResumeBtn').addEventListener('click', doManualResume);
$('copyLogBtn').addEventListener('click', () => copySectionText('copyLogBtn', $('log').innerText || ''));
$('copyResultBtn').addEventListener('click', () => copySectionText('copyResultBtn', $('result').textContent || ''));
$('copyTranscriptBtn').addEventListener('click', (event) => {
  event.stopPropagation();
  copySectionText('copyTranscriptBtn', $('transcript').textContent || '');
});

async function copySectionText(buttonId, text){
  const button = $(buttonId);
  const originalLabel = button.getAttribute('aria-label');
  try {
    await navigator.clipboard.writeText(text);
  } catch (_) {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }
  button.classList.add('copied');
  button.textContent = '✓';
  button.setAttribute('aria-label', 'Đã copy');
  button.title = 'Đã copy';
  setTimeout(() => {
    button.classList.remove('copied');
    button.textContent = '⧉';
    button.setAttribute('aria-label', originalLabel);
    button.title = originalLabel;
  }, 1200);
}

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
  $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('skipQuotaBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('manualResumeBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang bắt đầu...');
  const r = await chrome.runtime.sendMessage({type:'START_COUNCIL', question, mode:$('mode').value});
  if(!r.ok){ setPhase('Lỗi'); alert(r.error); }
  await refresh();
  $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false;
}

async function skipQuota(){
  const st = await chrome.runtime.sendMessage({type:'GET_STATE'});
  const s = (st && st.state) || {};
  const failed = Object.keys((s.checkpoint && s.checkpoint.failed) || {});
  const who = (failed.length ? failed : ['các tab còn thiếu']).map(p => names[p] || p).join(', ');
  if (!confirm(`Bỏ qua ${who} (hết quota/lỗi) và chạy tiếp với các AI còn lại?\nTab đang chạy dở (chưa fail) sẽ KHÔNG bị bỏ qua.`)) return;
  $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('skipQuotaBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('manualResumeBtn').disabled = true; $('stopBtn').disabled = false;
  setPhase('Đang bỏ qua tab lỗi và chạy tiếp...');
  const r = await chrome.runtime.sendMessage({type:'SKIP_AND_CONTINUE'});
  if(!r.ok){ setPhase('Lỗi bỏ qua tab'); alert(r.error); await refresh(); $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false; return; }
  await refresh();
  $('stopBtn').disabled = true; $('recoveryOpenBtn').disabled = false;
}

async function resume(){
  $('startBtn').disabled = true; $('resumeBtn').disabled = true; $('skipQuotaBtn').disabled = true; $('recoveryOpenBtn').disabled = true; $('manualResumeBtn').disabled = true; $('stopBtn').disabled = false;
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
  const assignments = s.assignments || {};
  let info = `Đã hoàn thành ${done.length}/7 round.`;
  if (done.length > 0) info += ` (${done.map(k => (roundMeta.find(m=>m.key===k)||{}).label || k).join(', ')})`;
  if (ck && ck.roundKey) {
    const meta = roundMeta.find(m=>m.key===ck.roundKey) || {};
    let needProviders = [];
    if (meta.providers && meta.providers.length > 0) {
      needProviders = meta.providers;
    } else if (ck.roundKey === 'round5' || ck.roundKey === 'final') {
      needProviders = assignments.judge ? [assignments.judge] : [];
    } else if (ck.roundKey === 'redTeam') {
      needProviders = assignments.redTeam ? [assignments.redTeam] : [];
    }
    const doneSet = new Set(ck.done || []);
    const missing = needProviders.length ? needProviders.filter(p => !doneSet.has(p)) : [];
    const doneList = (ck.done || []).map(p => names[p] || p).join(', ') || 'chưa AI nào xong';
    const missingList = missing.length
      ? missing.map(p => names[p] || p).join(', ')
      : (needProviders.length === 0 && ck.done && ck.done.length === 0 ? 'AI đặc trách (xem assignments)' : '—');
    info += `\nĐang dừng ở: ${meta.label || ck.roundKey}`;
    info += `\n   • Đã xong trong round này: ${doneList}`;
    if (missing.length > 0 || (ck.done && ck.done.length === 0)) {
      info += `\n   • Cần chạy lại trong round này: ${missingList}`;
    }
  }
  if (s.skippedProviders && s.skippedProviders.length) {
    info += `\nĐã bỏ qua (hết quota/lỗi): ${(s.skippedProviders).map(p => names[p] || p).join(', ')}`;
  }
  if (s.error) info += `\nLỗi trước đó: ${s.error}`;
  if (ck && s.status !== 'running' && s.status !== 'completed') {
    info += `\n👉 LÀM SAO ĐỂ CHẠY TIẾP:`;
    info += `\n   1. Nếu tab hết quota: đợi reset, refresh tab đó, rồi nhấn [⏯ TIẾP TỤC].`;
    info += `\n   2. Nếu không đợi được: nhấn [⏭ Bỏ qua tab lỗi] để chạy nốt với các AI còn lại.`;
    info += `\n   3. Tab đã xong sẽ được bỏ qua; chỉ tab thiếu mới được hỏi lại (trừ khi đã bỏ qua).`;
  }
  return info;
}

async function refresh(){
  const r = await chrome.runtime.sendMessage({type:'GET_STATE'});
  if(!r.ok) return;
  const s = r.state || {};
  const stateKey = JSON.stringify({
    status: s.status,
    phase: s.phase,
    question: s.question,
    final: s.final,
    error: s.error,
    transcript: s.transcript,
    log: s.log,
    tabs: s.tabs,
    assignments: s.assignments,
    checkpoint: s.checkpoint,
    skippedProviders: s.skippedProviders
  });
  if (stateKey === lastRenderedStateKey) return;
  lastRenderedStateKey = stateKey;
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
  if (running || (s.checkpoint && s.checkpoint.failed && Object.keys(s.checkpoint.failed).length > 0)) {
    setTimeout(() => renderProviders(s.tabs || lastScanResult), 50);
  }

  const can = await chrome.runtime.sendMessage({type:'CAN_RESUME'});
  const canResume = !running && can && can.ok && can.canResume;
  $('resumeBtn').disabled = !canResume;
  $('skipQuotaBtn').disabled = !canResume;

  const hint = $('resumeHint');
  if (canResume) {
    const desc = describeProgress(s);
    hint.style.display = 'block';
    hint.innerHTML = `<b>⏯ Có thể tiếp tục:</b><br>${escapeHtml(desc).replace(/\n/g,'<br>')}<br><small style="opacity:.75">Tab đã có kết quả đủ dài sẽ được bỏ qua. Các tab còn thiếu sẽ được gửi prompt mới (không lấy tin nhắn cũ trên tab).</small>`;
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

async function renderProviders(tabs){
  const map = Object.fromEntries((tabs||[]).filter(t=>t.provider).map(t => [t.provider, t]));
  const r = await chrome.runtime.sendMessage({type:'GET_STATE'});
  const s = (r && r.ok && r.state) ? r.state : {};
  const assignments = s.assignments || {};
  const judge = assignments.judge;
  const redTeam = assignments.redTeam;
  const speakingOrder = assignments.speakingOrder;
  $('providers').innerHTML = `
    <div id="scanSummary" class="scan-summary"></div>
    ${order.map(p => {
      const t = map[p];
      const badges = [];
      if (p === judge) badges.push('<span style="background:#3459d5;border:1px solid #4a72f3;border-radius:6px;padding:1px 6px;font-size:10px;font-weight:800;margin-left:4px">👨‍⚖️ JUDGE</span>');
      if (p === redTeam) badges.push('<span style="background:#b34700;border:1px solid #f2a84a;border-radius:6px;padding:1px 6px;font-size:10px;font-weight:800;margin-left:4px">⚔️ RED TEAM</span>');
      if (speakingOrder && speakingOrder.length) {
        const idx = speakingOrder.indexOf(p);
        if (idx >= 0) badges.push(`<span style="opacity:.55;font-size:10px;margin-left:4px">#${idx+1} phát biểu</span>`);
      }
      return `
      <div class="provider">
        <div class="name">${names[p]}${badges.join('')}</div>
        <div class="status ${t ? 'online' : 'offline'}">
          ${t ? '● Đã tìm thấy' : '○ Chưa có tab'}
        </div>
        ${t ? `
          <div class="tab-info">
            <div class="tab-url" title="${escapeHtml(t.url)}">${escapeHtml(t.url.slice(0,55))}</div>
            <div class="tab-title" title="${escapeHtml(t.title||'')}">${escapeHtml((t.title||'').slice(0,50))}</div>
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

function providersForRound(key) {
  const m = roundMeta.find(x => x.key === key);
  if (!m) return [];
  return (m.providers && m.providers.length > 0) ? m.providers : determineSingleAI(key);
}

function assignedOf(key) {
  const have = manualTranscript[key] || {};
  return Object.keys(have).filter(p => String(have[p] || '').trim().length > 0);
}

function isRoundFull(key) {
  const need = providersForRound(key);
  const have = new Set(assignedOf(key));
  return need.length > 0 && need.every(p => have.has(p));
}

function updateManualResumeState(){
  const hint = $('recoveryHint');
  const btn = $('manualResumeBtn');
  const question = $('question').value.trim();
  const firstIncompleteIdx = roundMeta.findIndex(m => !isRoundFull(m.key));
  const anyAssigned = roundMeta.some(m => assignedOf(m.key).length > 0);
  const laterFilled = firstIncompleteIdx >= 0 && roundMeta.slice(firstIncompleteIdx + 1).some(m => assignedOf(m.key).length > 0);

  if (!question) {
    btn.disabled = true;
    hint.innerHTML = '⚠ Nhập câu hỏi gốc vào ô trên cùng (để hệ thống biết context khi tiếp tục các round sau).';
    hint.className = 'recovery-hint rh-warn';
    return;
  }
  if (!anyAssigned) {
    btn.disabled = true;
    hint.innerHTML = '💡 Chưa chọn kết quả nào. Chọn từng message (hoặc nhập tay), hệ thống sẽ chạy tiếp các tab còn thiếu của round dở, rồi các round sau.';
    hint.className = 'recovery-hint rh-info';
    return;
  }
  if (laterFilled) {
    btn.disabled = true;
    const firstGap = roundMeta[firstIncompleteIdx].label;
    hint.innerHTML = `⚠ Round chưa đủ AI: <b>${firstGap}</b>. Hãy điền đủ AI cho round này, hoặc xóa các round sau.`;
    hint.className = 'recovery-hint rh-warn';
    return;
  }
  const incomplete = firstIncompleteIdx === -1 ? null : roundMeta[firstIncompleteIdx];
  if (!incomplete) {
    btn.disabled = false;
    hint.innerHTML = '✅ 7/7 round đã gán đủ. Sẽ hoàn tất ngay khi khôi phục.';
    hint.className = 'recovery-hint rh-ok';
    return;
  }
  const need = providersForRound(incomplete.key);
  const have = assignedOf(incomplete.key);
  const missing = need.filter(p => !have.includes(p));
  btn.disabled = false;
  if (have.length === 0) {
    hint.innerHTML = `✅ Các round trước đã đủ. Sẽ tiếp tục từ <b>${incomplete.label}</b> (${need.map(p => names[p] || p).join(', ')}).`;
  } else {
    hint.innerHTML = `✅ <b>${incomplete.label}</b>: đã gán ${have.map(p => names[p] || p).join(', ')} (${have.length}/${need.length || '?'}). Sẽ chạy tiếp ${missing.map(p => names[p] || p).join(', ')}, rồi các round sau.`;
  }
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
