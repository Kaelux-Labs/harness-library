'use strict';
const $ = selector => document.querySelector(selector);
const rows = [...document.querySelectorAll('.listing')];
const base = document.body.dataset.siteBase;
let category = 'All';

function activeBoost(row) {
  const now = Date.now();
  const start = Date.parse(row.dataset.boostStart);
  const end = Date.parse(row.dataset.boostEnd);
  const checked = Date.parse(row.dataset.boostChecked);
  return start <= now && now < end && checked <= now && now - checked <= 48 * 3600 * 1000;
}

function refreshResults() {
  const query = $('#search').value.toLocaleLowerCase();
  const ordered = [...rows].sort((a, b) => Number(activeBoost(b)) - Number(activeBoost(a)) || a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent));
  let count = 0;
  for (const row of ordered) {
    row.hidden = !((category === 'All' || row.dataset.category === category) && row.dataset.search.toLocaleLowerCase().includes(query));
    if (!row.hidden) count++;
    $('#listings').append(row);
    const label = row.querySelector('[data-boost-for]');
    if (label) label.hidden = !activeBoost(row);
  }
  $('#empty').hidden = count > 0;
  $('#count').textContent = count + ' harness' + (count === 1 ? '' : 'es') + ' shown';
}

// Ordinary links navigate to complete static pages. Older listing badges still work.
function legacyLink() {
  if (document.body.dataset.page !== 'home') return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (rows.some(row => row.dataset.harnessId === id)) location.replace(base + 'harnesses/' + id + '/');
}

if ($('#search')) {
  $('#search').disabled = false;
  $('#search').addEventListener('input', refreshResults);
  for (const button of $('#categories').children) {
    button.disabled = false;
    button.addEventListener('click', () => {
      category = button.textContent;
      for (const sibling of $('#categories').children) sibling.setAttribute('aria-pressed', String(sibling === button));
      refreshResults();
    });
  }
  refreshResults();
  legacyLink();
  window.addEventListener('hashchange', legacyLink);
}

function refreshBoosts() {
  for (const harness of document.querySelectorAll('[data-harness-id]')) {
    for (const label of harness.querySelectorAll('[data-boost-for]')) label.hidden = !activeBoost(harness);
  }
  if ($('#search')) refreshResults();
}
refreshBoosts();
// Refresh promotional placement when an open tab outlives a grant or check.
setInterval(refreshBoosts, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshBoosts(); });

for (const button of document.querySelectorAll('.copy[data-copy-target]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const source = document.getElementById(button.dataset.copyTarget);
    try {
      await navigator.clipboard.writeText(source.textContent);
      button.textContent = 'Copied';
      $('#announcement').textContent = 'Copied to clipboard';
      setTimeout(() => button.textContent = 'Copy', 1800);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(source);
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Select and copy';
      $('#announcement').textContent = 'Text selected for manual copying.';
    }
  });
}
