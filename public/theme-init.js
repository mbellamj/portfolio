/* Apply the saved/system theme before the first paint. No persistence on auto-detection. */
(()=>{
  let saved=null;
  try{const value=localStorage.getItem('portfolio-theme');if(value==='light'||value==='dark')saved=value;}catch{}
  const theme=saved||(typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.colorScheme=theme;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#111813':'#f5f3ec';
})();
