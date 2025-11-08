const API = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', ()=>{
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('loginBtn').style.display='none';
    document.getElementById('registerBtn').style.display='none';
    document.getElementById('dashboardBtn').style.display='inline-block';
    document.getElementById('logoutBtn').style.display='inline-block';
  }
  document.getElementById('loginBtn').addEventListener('click', ()=> location.href='login.html');
  document.getElementById('registerBtn').addEventListener('click', ()=> location.href='register.html');
  document.getElementById('dashboardBtn').addEventListener('click', ()=> location.href='my-applications.html');
  document.getElementById('logoutBtn').addEventListener('click', ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); location.reload(); });
  loadJobs();
});

async function loadJobs(){
  try {
    const res = await fetch(API + '/jobs');
    const jobs = await res.json();
    const container = document.getElementById('jobs');
    container.innerHTML='';
    jobs.forEach(j=>{
      const col = document.createElement('div');
      col.className='col-md-4';
      col.innerHTML = `<div class="job-card"><h5>${j.title}</h5><p class="mb-1 text-muted">${j.company} • ${j.location || 'Remote'}</p><p>${(j.description||'').slice(0,120)}</p><div class="text-end mt-3"><a href="apply.html?job=${j._id}" class="btn btn-primary">Apply</a></div></div>`;
      container.appendChild(col);
    });
  } catch (err) { console.error(err); }
}
