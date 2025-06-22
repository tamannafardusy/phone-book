const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const searchInput = document.getElementById('search');

// Store contacts in memory
let contacts = [];

function renderContacts(list) {
  contactList.innerHTML = ''; // Clear list
  list.forEach((contact, index) => {
    const li = document.createElement('li');
    li.className = 'contact-item';

    li.innerHTML = `
      <div class="contact-info">
        <strong>${contact.name}</strong><br>
        📞 ${contact.phone}<br>
        🏠 ${contact.address}
      </div>
      <div class="actions">
        <button onclick="editContact(${index})" class="edit-button">Edit</button>
        <button onclick="deleteContact(${index})" class="delete-button">Delete</button>
      </div>
    `;
    contactList.appendChild(li);
  });
}

// Add Contact
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (name && phone) {
    contacts.push({ name, phone, address });
    renderContacts(contacts);
    contactForm.reset();
  }
});

// Delete Contact
function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts(contacts);
}

// Edit Contact
function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('address').value = contact.address;

  // Remove the old contact, wait for user to resubmit
  contacts.splice(index, 1);
  renderContacts(contacts);
}

// Search Contacts
searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase();
  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query) ||
    contact.phone.includes(query) ||
    contact.address.toLowerCase().includes(query)
  );
  renderContacts(filtered);
});
