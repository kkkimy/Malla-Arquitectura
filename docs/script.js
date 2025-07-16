// Función para actualizar el estado de las materias basado en los prerrequisitos
function actualizarEstadoMateria(caja) {
    const identificacionActual = caja.dataset.identificacion;

    // Selecciona todos los divs de materias que tienen la materia actual como prerrequisito
    const materiasDependientes = document.querySelectorAll(`div[data-prerequisito*="${identificacionActual}"]`);

    if (caja.checked) {
        // Si la materia actual (caja) está marcada
        materiasDependientes.forEach(materiaDiv => {
            const prerequisitosStr = materiaDiv.dataset.prerequisito;
            const prerequisitos = prerequisitosStr.split(' '); // Divide la cadena de prerrequisitos en un array

            let todosLosPrerequisitosCumplidos = true;
            for (const prereqId of prerequisitos) {
                // Encuentra el checkbox de cada prerrequisito
                const checkboxPrerequisito = document.querySelector(`input[data-identificacion="${prereqId}"][type="checkbox"]`);
                // Si un checkbox de prerrequisito no existe o no está marcado, no se cumplen todos los prerrequisitos
                if (!checkboxPrerequisito || !checkboxPrerequisito.checked) {
                    todosLosPrerequisitosCumplidos = false;
                    break;
                }
            }

            const inputMateria = materiaDiv.querySelector('input[type="checkbox"]');
            if (inputMateria) {
                if (todosLosPrerequisitosCumplidos) {
                    inputMateria.disabled = false; // Habilita la materia dependiente
                } else {
                    // Si no todos los prerrequisitos están cumplidos, asegúrate de que permanezca deshabilitada
                    inputMateria.disabled = true;
                }
            }
        });
    } else {
        // Si la materia actual (caja) está desmarcada
        materiasDependientes.forEach(materiaDiv => {
            const inputMateria = materiaDiv.querySelector('input[type="checkbox"]');
            if (inputMateria) {
                // Si la materia dependiente está marcada, desmárcala y propaga el cambio
                if (inputMateria.checked) {
                    inputMateria.checked = false;
                    // Llama recursivamente para las materias que dependen de esta 'inputMateria'
                    actualizarEstadoMateria(inputMateria);
                }
                inputMateria.disabled = true; // Siempre deshabilita si el padre está desmarcado
            }
        });
    }
}

// Configuración inicial cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los checkboxes de materias
    const todosLosCheckboxesDeMaterias = document.querySelectorAll('input[type="checkbox"][data-identificacion]');

    // Agrega el event listener 'change' a cada checkbox de materia
    todosLosCheckboxesDeMaterias.forEach(checkbox => {
        checkbox.addEventListener('change', () => actualizarEstadoMateria(checkbox));
    });

    // Deshabilita las materias cuyos prerrequisitos no están cumplidos al cargar la página
    document.querySelectorAll('div[data-prerequisito]').forEach(materiaDiv => {
        const prerequisitosStr = materiaDiv.dataset.prerequisito;
        const prerequisitos = prerequisitosStr.split(' ');

        let debeEstarDeshabilitado = false;
        for (const prereqId of prerequisitos) {
            const checkboxPrerequisito = document.querySelector(`input[data-identificacion="${prereqId}"][type="checkbox"]`);
            if (!checkboxPrerequisito || !checkboxPrerequisito.checked) {
                debeEstarDeshabilitado = true;
                break;
            }
        }

        const inputMateria = materiaDiv.querySelector('input[type="checkbox"]');
        if (inputMateria && debeEstarDeshabilitado) {
            inputMateria.disabled = true;
            inputMateria.checked = false; // Asegura que esté desmarcado si está deshabilitado
        }
    });
});
