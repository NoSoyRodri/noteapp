// Script base JS
document.addEventListener("DOMContentLoaded", () => {
   //traer elementos del DOM
   
   

   
   
   //todo elements
   let toDoInput = document.getElementById("addToDoInput");
   let toDoBtn = document.getElementById('addToDoBtn');
   let toDoDismiss = document.getElementById('ToDoDismissBtn');
   let toDoAdd= document.getElementById('ToDoAddBtn');
   let ToDo = document.getElementById('toDo');
   //note elements
   let noteBtn = document.getElementById('addNoteBtn');
   let noteInput = document.getElementById("noteInputDiv");
   let noteDismiss = document.getElementById('noteDismissBtn');
   let noteAdd= document.getElementById('noteAddBtn');
   let Notes = document.getElementById('notes');
   //data from localStorage
   let appData = JSON.parse(localStorage.getItem("noteAppData")) || { todos: [], notes: [] };
   //auxiliar buttons
   let toDoCheck = document.getElementById('toDoCheck');
   let trashButton = document.getElementById('trashButton');
   //
   loadIData()


   function addToDo(){
   toDoInput.classList.remove("notVisible");   
   toDoInput.classList.add("visible");
   toDoDismiss.addEventListener("click", () => {
      toDoInput.classList.remove("visible");
      toDoInput.classList.add("notVisible");
   })
   toDoAdd.addEventListener("click", () => {
   let toDoContent = document.getElementById("addToDoInputText").value.trim();
   if (toDoContent === "") return; 
   
   saveToDo(toDoContent);

   let toDoItem = document.createElement("div");
   toDoItem.classList.add('toDoItem');
   toDoItem.innerHTML = `
        <div class="toDoTextDiv">
            <p class="toDoText">${toDoContent}</p>
            <button class="toDoCheck">
            <i class="bi bi-check2-square notVisible checkSquare"></i>
                       <i class="bi bi-app visible emptySquare"></i>
            </button>
        </div>
    `;
   ToDo.appendChild(toDoItem);
    
    toDoItem.querySelector(".toDoCheck").addEventListener("click", (e) => {
    const checkSquare = e.target.closest("button").querySelector(".checkSquare");
    const emptySquare = e.target.closest("button").querySelector(".emptySquare");
    checkSquare.classList.toggle('visible');
    checkSquare.classList.toggle('notVisible');
    emptySquare.classList.toggle('visible');
    emptySquare.classList.toggle('notVisible');
    toDoItem.classList.add('complete');
    appData.todos = appData.todos.filter(toDo => toDo.text !== toDoContent);
    localStorage.setItem("noteAppData", JSON.stringify(appData));
    
    setTimeout(() => toDoItem.remove(), 800);
    
    });

   document.getElementById("addToDoInputText").value = "";
   toDoInput.classList.remove("visible");
   toDoInput.classList.add("notVisible");
   })
   

   }

   function addNote(){
   noteInput.classList.remove("notVisible");   
   noteInput.classList.add("visible");
    noteDismiss.addEventListener("click", () => {
        noteInput.classList.remove("visible");
        noteInput.classList.add("notVisible");

    })
    noteAdd.addEventListener("click", () => {
    let noteTitleContent = document.getElementById("addNoteTitleInput").value.trim();
    let noteTextContent = document.getElementById("addNoteTextInput").value.trim();
    if (noteTitleContent === "" && noteTextContent === "") return; 
    saveNote(noteTitleContent, noteTextContent);
    let noteItem = document.createElement("div");
    noteItem.classList.add('note');
    noteItem.innerHTML = `
                
                <div class="noteTitleDiv">
                    <h1 class="noteTitle">
                        ${noteTitleContent}
                    </h1>
                    <button class="trashButton"><i class="bi bi-trash3-fill"></i></button>

                </div>
                <p class="noteText">
                    ${noteTextContent}
                </p>
            
    
    
    `
    Notes.appendChild(noteItem);
    noteItem.querySelector('.trashButton').addEventListener('click',()=>{
        noteItem.classList.add('removeNote');
        appData.notes = appData.notes.filter(note => note.title !== noteTitleContent || note.text !== noteTextContent);
        localStorage.setItem("noteAppData", JSON.stringify(appData));
        setTimeout(() => noteItem.remove(), 400);
    })
    document.getElementById("addNoteTitleInput").value = "";
    document.getElementById("addNoteTextInput").value = "";
    noteInput.classList.remove("visible");
    noteInput.classList.add("notVisible");
    })










   }












   function saveToDo(text){
   let toDoInputValue = document.getElementById("addToDoInputText").value.trim();
   if (!toDoInputValue) return; // si está vacío, no hacemos nada

    // Agregar al array de todos
    appData.todos.push({ text: toDoInputValue});

    // Guardar en localStorage
    localStorage.setItem("noteAppData", JSON.stringify(appData));
   }
   function saveNote(noteTitleContent, noteTextContent){
   let noteInputValueTitle = document.getElementById("addNoteTitleInput").value.trim();
   let noteInputValueText = document.getElementById("addNoteTextInput").value.trim();
   if (!noteInputValueTitle && !noteInputValueText) return; // si está vacío, no hacemos nada

    // Agregar al array de notas
    appData.notes.push({ title: noteInputValueTitle, text: noteInputValueText});

    // Guardar en localStorage
    localStorage.setItem("noteAppData", JSON.stringify(appData));
   }
   
   function loadIData(){
   appData.todos.forEach(todo => {
   let toDoItem = document.createElement("div");
   let toDoContent = todo.text;
   toDoItem.classList.add('toDoItem');
   toDoItem.innerHTML = `
        <div class="toDoTextDiv">
            <p class="toDoText">${toDoContent}</p>
            <button class="toDoCheck">
            <i class="bi bi-check2-square notVisible checkSquare"></i>
                       <i class="bi bi-app visible emptySquare"></i>
            </button>
        </div>
    `;
   ToDo.appendChild(toDoItem);


    toDoItem.querySelector(".toDoCheck").addEventListener("click", (e) => {
    const checkSquare = e.target.closest("button").querySelector(".checkSquare");
    const emptySquare = e.target.closest("button").querySelector(".emptySquare");
    checkSquare.classList.toggle('visible');
    checkSquare.classList.toggle('notVisible');
    emptySquare.classList.toggle('visible');
    emptySquare.classList.toggle('notVisible');
    toDoItem.classList.add('complete');
    appData.todos = appData.todos.filter(toDo => toDo.text !== toDoContent);
    localStorage.setItem("noteAppData", JSON.stringify(appData));
    setTimeout(() => toDoItem.remove(), 800);
    
    });
    });

    appData.notes.forEach(note => {
    let noteItem = document.createElement("div");
    let noteTitleContent = note.title;
    let noteTextContent = note.text;
    noteItem.classList.add('note');
    noteItem.innerHTML = `
                
                <div class="noteTitleDiv">
                    <h1 class="noteTitle">
                        ${noteTitleContent}
                    </h1>
                    <button class="trashButton"><i class="bi bi-trash3-fill"></i></button>

                </div>
                <p class="noteText">
                    ${noteTextContent}
                </p>
            
    
    
    `
    Notes.appendChild(noteItem);

    noteItem.querySelector('.trashButton').addEventListener('click',()=>{
        noteItem.classList.add('removeNote');
        appData.notes = appData.notes.filter(note => note.title !== noteTitleContent || note.text !== noteTextContent);
        localStorage.setItem("noteAppData", JSON.stringify(appData));
        setTimeout(() => noteItem.remove(), 400);
    })
    })
   }

   //revisar LocalStorage
   function clearToDos() {
    let appData = JSON.parse(localStorage.getItem("noteAppData")) || { todos: [], notes: [] };
    appData.todos = []; // vacía solo los to-dos
    appData.notes = []; // vacía solo las notas
    localStorage.setItem("noteAppData", JSON.stringify(appData));
    
    // Opcional: actualizar la interfaz de tareas
    loadIData();
}
// clearToDos();
   //eventos
   toDoBtn.addEventListener("click", addToDo);
   noteBtn.addEventListener("click", addNote);
//    toDoCheck.addEventListener("click", checkToDo);

});