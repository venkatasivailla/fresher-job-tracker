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
  // 🎉 Trigger confetti if "Offer Received"
  if (entry.status.toLowerCase() === "offer received") {
    triggerConfetti();
  }

  form.reset();
});

// Render entry card
function renderEntry(entry) {
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.innerHTML = `
    <div class="entry-actions">
      <button class="update-btn">Update</button>
      <button class="delete-btn">Delete</button>
    </div>
    <h3>${entry.title} @ ${entry.company}</h3>
    <p>Status: ${entry.status}</p>
    <p>Task: ${entry.task}</p>
    <p>Date: ${entry.date}</p>`;
  
  card.querySelector('.delete-btn').onclick = () => { deleteEntry(entry); card.remove(); };
  card.querySelector('.update-btn').onclick = () => { fillForm(entry); deleteEntry(entry); card.remove(); };
  
  container.prepend(card);
}
// Save to localStorage
function saveEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('jobEntries')) || [];
  entries.push(entry);
  localStorage.setItem('jobEntries', JSON.stringify(entries));
}

function deleteEntry(entry) {
  let entries = JSON.parse(localStorage.getItem('jobEntries')) || [];
  entries = entries.filter(e => !(e.title===entry.title && e.company===entry.company && e.date===entry.date));
  localStorage.setItem('jobEntries', JSON.stringify(entries));
}

function fillForm(entry) {
  title.value = entry.title; 
  company.value = entry.company;
  status.value = entry.status; 
  task.value = entry.task;
}
// 🎉 Confetti function
function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 }
  });
}
// Dropdown toggle
const toggleBtn = document.getElementById("featuresToggle");
const menu = document.getElementById("featuresMenu");

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});
// Close dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});
