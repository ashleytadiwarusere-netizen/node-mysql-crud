const API = 'http://localhost:3000/api/portfolio';
const fields = ['owner_name', 'job_title', 'email', 'phone', 'location', 'skills', 'bio'];

const form = document.getElementById('portfolioForm');
const tableBody = document.getElementById('tableBody');
const message = document.getElementById('message');
const saveBtn = document.getElementById('saveBtn');
const recordId = document.getElementById('recordId');

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ''), 3000);
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : value;
  return div.innerHTML;
}

async function loadRecords() {
  const res = await fetch(API);
  const data = await res.json();
  tableBody.innerHTML = data.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${escapeHtml(r.owner_name)}</td>
      <td>${escapeHtml(r.job_title)}</td>
      <td>${escapeHtml(r.email)}</td>
      <td>${escapeHtml(r.phone)}</td>
      <td>${escapeHtml(r.location)}</td>
      <td>${escapeHtml(r.skills)}</td>
      <td>${escapeHtml(r.bio)}</td>
      <td>
        <button onclick="editRecord(${r.id})">Edit</button>
        <button onclick="deleteRecord(${r.id})">Delete</button>
      </td>
    </tr>`).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {};
  fields.forEach(f => (body[f] = document.getElementById(f).value));

  const id = recordId.value;
  const res = await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    showMessage(id ? 'Record updated' : 'Record added');
    resetForm();
    loadRecords();
  } else {
    const err = await res.json();
    showMessage('Error: ' + err.error);
  }
});

async function editRecord(id) {
  const res = await fetch(`${API}/${id}`);
  const r = await res.json();
  recordId.value = r.id;
  fields.forEach(f => (document.getElementById(f).value = r[f] || ''));
  saveBtn.textContent = 'Update Record';
  window.scrollTo(0, 0);
}

async function deleteRecord(id) {
  if (!confirm('Delete this record?')) return;
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    showMessage('Record deleted');
    loadRecords();
  }
}

function resetForm() {
  form.reset();
  recordId.value = '';
  saveBtn.textContent = 'Add Record';
}

document.getElementById('cancelBtn').addEventListener('click', resetForm);

loadRecords();