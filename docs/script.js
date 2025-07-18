function actualizarEstado(caja) {
  const id = caja.dataset.identificacion;
  const materias = document.querySelectorAll(`input[data-prereq="${id}"]`);

  if (caja.checked) {
    // Si se marca la materia, habilita las que dependen de ella
    materias.forEach(materia => {
      materia.disabled = false;
    });
  } else {
    // Si se desmarca, desmarca y bloquea las dependientes recursivamente
    materias.forEach(materia => {
      materia.checked = false;
      materia.disabled = true;
      actualizarEstado(materia);
    });
  }
}
