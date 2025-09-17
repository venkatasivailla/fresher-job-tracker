const form = document.getElementById('jobForm');
const container = document.getElementById('entriesContainer');
const clearBtn = document.getElementById('clearAll');

// Load existing entries
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('jobEntries')) || [];
  saved.forEach(entry => renderEntry(entry));
};

// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const entry = {
    title: document.getElementById('title').value,
    company: document.getElementById('company').value,
    status: document.getElementById('status').value,
    task: document.getElementById('task').value,
    date: new Date().toLocaleDateString()
  };

  renderEntry(entry);
  saveEntry(entry);
  form.reset();
});

// Render entry card
function renderEntry(entry) {
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.innerHTML = `
    <h3>${entry.title} @ ${entry.company}</h3>
    <p>Status: ${entry.status}</p>
    <p>Task: ${entry.task}</p>
    <p>Date: ${entry.date}</p>
  `;
  container.prepend(card);
}

// Save to localStorage
function saveEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('jobEntries')) || [];
  entries.push(entry);
  localStorage.setItem('jobEntries', JSON.stringify(entries));
}

// Clear all entries
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('jobEntries');
  container.innerHTML = '';
});