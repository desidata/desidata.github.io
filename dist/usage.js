async function refreshUsage() {
  const note = document.querySelector('#usage-note');
  try {
    const response = await fetch('api/usage', {cache: 'no-store'});
    if (!response.ok) throw new Error();
    const {total, files, leaders} = await response.json();
    document.querySelector('#downloads').textContent = total.toLocaleString();
    document.querySelector('#available').textContent = files.length.toLocaleString();
    document.querySelector('#popular').textContent = leaders.join(' · ') || 'No downloads yet';
    note.textContent = files.length ? 'Counts each dataset file served, including repeat downloads.' : 'Downloads will open when the first dataset is released.';
    const list = document.querySelector('#files');
    list.replaceChildren(...files.map(file => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = file.url;
      link.textContent = 'Download ' + file.title;
      item.append(link);
      return item;
    }));
    list.hidden = !files.length;
  } catch {
    note.textContent = 'Download statistics are temporarily unavailable.';
  }
}
window.addEventListener('pageshow', refreshUsage);
window.addEventListener('focus', refreshUsage);
