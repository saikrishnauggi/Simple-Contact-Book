let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');

function displayContacts(filteredContacts = contacts) {
  contactList.innerHTML = '';
  filteredContacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    contactDiv.innerHTML = `
      <strong>Name:</strong> ${contact.name}<br>
      <strong>Phone:</strong> ${contact.phone}<br>
      <strong>Email:</strong> ${contact.email}
      <button class="edit-btn" onclick="editContact(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
    `;
    contactList.appendChild(contactDiv);
  });
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && phone && email) {
    if (editIndex !== null) {
      contacts[editIndex] = { name, phone, email };
      editIndex = null;
      submitBtn.textContent = 'Add Contact';
    } else {
      contacts.push({ name, phone, email });
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactForm.reset();
    displayContacts();
  }
});

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  displayContacts();
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;
  editIndex = index;
  submitBtn.textContent = 'Update Contact';
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query)
  );
  displayContacts(filtered);
});

window.onload = displayContacts;
