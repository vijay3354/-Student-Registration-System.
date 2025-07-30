const form = document.getElementById('studentForm');
const recordsContainer = document.getElementById('studentRecords');

let students = JSON.parse(localStorage.getItem('students')) || [];

function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

function insertTable() {
  if (students.length === 0) {
    recordsContainer.innerHTML = '<p>No records found.</p>';
    return;
  }

  const table = document.createElement('table');
  const headerRow = `<tr>
    <th>Name</th><th>ID</th><th>Email</th><th>Contact</th><th>Actions</th>
  </tr>`;
  const rows = students.map((student, index) => `
    <tr>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>
  `).join('');
  table.innerHTML = headerRow + rows;
  recordsContainer.innerHTML = '';
  recordsContainer.appendChild(table);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('studentName').value.trim();
  const id = document.getElementById('studentID').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !id || !email || !contact) {
    alert('All fields are required.');
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert('Name should contain only letters.');
    return;
  }

  if (!/^\d+$/.test(id)) {
    alert('ID and Contact must be valid numbers.');
    return;
  }
  if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(contact)){
    alert(`Contact must be at least 10 digits.`);
    return;
  }
  students.push({ name, id, email, contact });
  saveToStorage();
  insertTable();
  form.reset();
});

window.editStudent = function (index) {
  const student = students[index];
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentID').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;
  students.splice(index, 1);
  saveToStorage();
  insertTable();
};

window.deleteStudent = function (index) {
  if (confirm('Are you sure you want to delete this record?')) {
    students.splice(index, 1);
    saveToStorage();
    insertTable();
  }
};

insertTable();
