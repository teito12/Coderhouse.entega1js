let tasktodo = [];  //almacen de tareas

let nonstop = true;  // control el bucle principal
while (nonstop) {
  // Menú de opciones
  let option = prompt("Selecciona una opción numérica: \n1. Agregar Tarea \n2. Ver Tareas \n3. Eliminar Tarea \n4. Salir");

  // Validación y ejecución de opciones
  if (option === "4") {
    nonstop = false; 
    alert("Saliendo del programa...");
  } else if (option === "1" || option === "2" || option === "3") {
    exeOption(option);
  } else {
    alert("Por favor, escribe bien los números."); 
  }
}

// Función que determina qué opción ejecutar
function exeOption(option) {
  switch (option) {
    case "1":
      addTask(); 
      break;
    case "2":
      viewTask();  
      break;
    case "3":
      deleteTask(); 
      break;
    default:
      alert("Opción no válida."); 
  }
}

// Función para agregar tareas
function addTask() {
  let newtask = prompt("Por favor, ingresa el nombre de la nueva tarea:");

  if (newtask) { 
    tasktodo.push(newtask);
    alert(`Tarea "${newtask}" agregada correctamente.`);
  } else {
    alert("El campo está vacío.");
  }
}

// Función para ver tareas
function viewTask() {
  if (tasktodo.length === 0) {
    alert("No hay tareas para mostrar.");
  } else {
    alert("Tareas actuales:\n" + tasktodo.join("\n"));
  }
}

// Función para eliminar tareas
function deleteTask() {
  if (tasktodo.length === 0) {
    alert("No hay tareas para eliminar.");
  } else {
    let taskToDelete = prompt("Ingresa el nombre exacto de la tarea que quieres eliminar:");
    let index = tasktodo.indexOf(taskToDelete);

    if (index !== -1) {
      let confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la tarea "${taskToDelete}"?`);
      if (confirmDelete) {
        tasktodo.splice(index, 1);
        alert(`Tarea "${taskToDelete}" eliminada correctamente.`);
      } else {
        alert("Eliminación cancelada.");
      }
    } else {
      alert("Tarea no encontrada.");
    }
  }
}