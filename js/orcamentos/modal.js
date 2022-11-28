const modal = document.querySelector('.modal-container')

function openModal() {
  modal.classList.add('active')

}

function closeModal() {
  const caixaCli = document.getElementById('caixaCli');
  caixaCli.value = null;
  modal.classList.remove('active')
}