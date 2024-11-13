
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const ContainerDcontactos = document.getElementById("ContainerDcontactos");
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Renderisa los contactos
    function renderContacts() {
        ContainerDcontactos.innerHTML = "";
        contacts.forEach((contact, index) => {
            const contactCard = document.createElement("div");
            contactCard.classList.add("contact-card");
            contactCard.innerHTML = `
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Address:</strong> ${contact.address}</p>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            `;
            ContainerDcontactos.appendChild(contactCard);
        });
    }

    // Validate Form Fields
    function validateForm(contact) {
        const { name, phone, email, address } = contact;
        if (!name || !phone || !email || !address) {
            alert("All fields are required!");
            return false;
        }
        return true;
    }

    // agregar user
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newContact = {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            address: document.getElementById("address").value.trim(),
        };
        if (validateForm(newContact)) {
            contacts.push(newContact);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            renderContacts();
            contactForm.reset();
        }
    });

    
    renderContacts();
});

// para editar y borrar
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    document.getElementById("address").value = contact.address;
    deleteContact(index);
}

function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    document.dispatchEvent(new Event("DOMContentLoaded")); // Refresh the page
}
