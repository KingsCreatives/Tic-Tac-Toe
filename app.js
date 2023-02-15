const form = document.querySelector('.myForm');

//Get form data
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const modal =document.querySelector('.modal-wrapper');
    modal.style.display = "none";
})