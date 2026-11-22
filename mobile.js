const touchSidebar = window.matchMedia?.('(max-width: 860px) and (hover: none) and (pointer: coarse)');
const touchCards = window.matchMedia?.('(max-width: 680px) and (hover: none) and (pointer: coarse)');
const filtersOpen = new Map();

export function onTouchLayoutChange(render) {
  touchSidebar?.addEventListener('change', render);
  touchCards?.addEventListener('change', render);
}

function enhanceSidebar(workspace, mode) {
  const sidebar = workspace.querySelector('.sidebar-panel:has(.dossier-list)');
  const filters = sidebar?.querySelector('.lineup-filter-box');
  const groups = sidebar?.querySelector('.segmented-toggle');
  if (!filters || !groups) return;

  sidebar.classList.add('mobile-dossier-sidebar');
  filters.id = 'mobile-lineup-filters';
  groups.parentElement.classList.add('sidebar-portrayal-block');
  const controls = document.createElement('div');
  controls.className = 'portrayal-control-row';
  groups.before(controls);
  controls.append(groups);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mobile-filter-toggle';
  button.classList.toggle('has-active', !filters.querySelector('.filter-reset-btn')?.disabled);
  button.setAttribute('aria-controls', filters.id);
  button.innerHTML = '筛选 <span class="filter-caret" aria-hidden="true"></span>';
  controls.append(button);

  function setOpen(open) {
    sidebar.classList.toggle('is-filter-open', open);
    button.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    button.lastElementChild.textContent = open ? '▴' : '▾';
  }
  setOpen(filtersOpen.get(mode) ?? false);
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    filtersOpen.set(mode, open);
    setOpen(open);
  });

  const track = sidebar.querySelector('.dossier-list');
  const selected = track.querySelector('.dossier-item.active');
  if (selected) {
    const listBox = track.getBoundingClientRect();
    const itemBox = selected.getBoundingClientRect();
    track.scrollLeft = Math.max(0, itemBox.right - listBox.right + 2);
  }
}

const tableLayouts = {
  'mane/totals': ['table-mane-totals', ['rank', 'entity', 'detail', 'primary']],
  'mane/players': ['table-mane-players', ['rank', 'entity', 'detail', 'secondary', 'primary']],
  'flashback/carries': ['table-fb-carries', ['rank', 'entity', 'primary', 'secondary']],
  'flashback/players': ['table-fb-players', ['rank', 'entity', 'primary', 'secondary']],
  'flashback/leaderboard': ['table-fb-archives', ['entity', 'detail', 'secondary', 'primary']]
};

function enhanceTable(table, [className, columns]) {
  table.classList.add('mobile-archive-card-table', className);
  table.setAttribute('role', 'table');
  const headers = Array.from(table.tHead.rows[0].cells, (cell) => cell.textContent.trim());
  for (const group of table.tBodies) {
    group.setAttribute('role', 'rowgroup');
    for (const row of group.rows) {
      row.setAttribute('role', 'row');
      columns.forEach((column, index) => {
        const cell = row.cells[index];
        if (!cell) return;
        cell.classList.add(`cell-${column}`);
        cell.setAttribute('role', 'cell');
        cell.dataset.label = headers[index];
      });
    }
  }
}

export function enhanceTouchLayout(workspace, state) {
  if (touchSidebar?.matches) enhanceSidebar(workspace, state.mode);
  if (!touchCards?.matches) return;

  const page = state.mode === 'mane' ? state.manePage : state.fbPage;
  const table = workspace.querySelector('.archive-table');
  const layout = tableLayouts[`${state.mode}/${page}`];
  if (table && layout) enhanceTable(table, layout);

  const picker = workspace.querySelector('#fbVersionSelect');
  if (picker) {
    const label = picker.labels[0];
    picker.removeAttribute('style');
    picker.classList.add('fb-version-select');
    picker.parentElement.classList.add('fb-version-picker');
    label?.classList.add('fb-version-label');
  }
}
