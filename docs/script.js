function actualizarEstado(checkbox) {
  const id = checkbox.dataset.id;
  const materias = document.querySelectorAll(`input[data-prerreq="${id}"]`);
  
  if (checkbox.checked) {
    // Si se completó una materia, habilita las que dependen de ella
    materias.forEach(m => m.disabled = false);
  } else {
    // Si se desmarca, vuelve a bloquear las que dependían
    materias.forEach(m => {
      m.checked = false;
      m.disabled = true;
      actualizarEstado(m); // Recursivo
    });
  }
}
