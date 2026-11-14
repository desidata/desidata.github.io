function serve([type, encoded], head, headers = {}) {
  const bytes = head ? null : Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
  return new Response(bytes, {headers: {'Content-Type': type, ...headers}});
}
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    const head = request.method === 'HEAD';
    if (!head && request.method !== 'GET') return new Response(null, {status:405, headers:{Allow:'GET, HEAD'}});
    if (path === '/api/usage') {
      const {results} = await env.DB.prepare('SELECT dataset_id,total FROM dataset_downloads').all();
      const counts = new Map(results.map(row => [row.dataset_id,row.total]));
      const catalog = Object.values(files);
      const max = Math.max(0, ...catalog.map(f => counts.get(f.id) || 0));
      return Response.json({
        total: results.reduce((sum,row) => sum + row.total, 0),
        files: catalog.map(f => ({title:f.title,url:'/download/'+f.id})),
        leaders: max ? catalog.filter(f => counts.get(f.id) === max).map(f => f.title) : []
      }, {headers:{'Cache-Control':'no-store'}});
    }
    if (path.startsWith('/download/')) {
      const id = path.slice(10);
      if (!Object.hasOwn(files,id)) return new Response('Dataset not found', {status:404});
      const file = files[id];
      const response = serve(file.content, head, {'Cache-Control':'no-store',
        'Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(file.filename)});
      if (!head) await env.DB.prepare('INSERT INTO dataset_downloads(dataset_id,total) VALUES (?,1) ON CONFLICT(dataset_id) DO UPDATE SET total=total+1').bind(id).run();
      return response;
    }
    const key = path === '/' ? '/index.html' : path;
    return Object.hasOwn(assets,key) ? serve(assets[key], head) : new Response('Not found',{status:404});
  }
};
