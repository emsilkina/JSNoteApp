let folders = [new Note(), new Note()];

function Note () {
    this.noteArray = [];
}

//push Note into folder? 

// let todoNote = new Note();

let str = "";

document.addEventListener("DOMContentLoaded", function() {
    displayNote(0, []);

    document.getElementById("saveInput").addEventListener("click", function() {
        let selectedFolder = document.getElementById("folders").value;
        let userInput = document.getElementById("userInput").value;


        folders[selectedFolder].noteArray.push(userInput);

        displayNote(selectedFolder, []);

        // str = "";
        // for(let i=0; i<folders[selectedFolder].noteArray.length; i++) {
        //     str += folders[selectedFolder].noteArray[i] + "<br>";
        // }

        // document.getElementById("noteText").innerHTML = str;
        // document.getElementById("noteTitle").innerHTML = document.getElementById("folders").options[selectedFolderIndex].text;

    });

    document.getElementById("saveNewFolder").addEventListener("click", function() {
        let newFolderTitle = document.getElementById("newFolderTitle").value;

        if (!folders.find(folder => folder.title === newFolderTitle)) {
            let newFolderNote = new Note();
            newFolderNote.title = newFolderTitle;
            folders.push(newFolderNote); //adds the note to the array of folders

            let selectFolders = document.getElementById("folders"); //locates the folder dropdown
            let option = document.createElement("option"); //creates a new option
            option.text = newFolderTitle;
            option.value = folders.length - 1;
            selectFolders.appendChild(option); 
            //create function that adds an id that matches

            document.getElementById("newFolderTitle").value = "";
        }

    });

    document.getElementById("folders").addEventListener("change", function() {
        let selectedFolderIndex = document.getElementById("folders").value;
        displayNote(selectedFolderIndex, []);
    });

    // document.getElementById("noteTitle").innerHTML = document.getElementById("folders").options[selectedFolderIndex].text;

});

let edittingNoteIndexesArray = [];

//display the note for the specific folder
function displayNote(selectedFolderIndex, edittingNoteIndexes) {
    let notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    // if(selectedFolderIndex == null) {
    //     selectedFolderIndex = 0;
    // }

    //search element by id/querry

    // let str = "";
    // for (let i = 0; i < folders[selectedFolderIndex].noteArray.length; i++) {
    //     //str += folders[selectedFolderIndex].noteArray[i] + "<br>";
    //     const note = document.createElement("p");
    //     const text = document.createTextNode(folders[selectedFolderIndex].noteArray[i]);
    //     note.appendChild(text);
    //     notes.appendChild(note);
    // }


    folders[selectedFolderIndex].noteArray.forEach((noteText, index) => {
        let noteContainer = document.createElement("div");
        let edittingNote = edittingNoteIndexes.includes(index);
        let note = null;


        if(!edittingNote) {
            //note text
            note = document.createElement("p");
            note.textContent = "• " + noteText;
        } else {
            note = document.createElement("textarea");
            note.value = noteText;
            note.rows = "1";
        }
        noteContainer.appendChild(note);
        
        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.addEventListener("click", function() {
            folders[selectedFolderIndex].noteArray.splice(index, 1);
            //do I need to recall function after?
            displayNote(selectedFolderIndex);
        });
        noteContainer.appendChild(deleteButton);

        //edit button
        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.addEventListener("click", function() {
            edittingNoteIndexesArray.push(index);

            // let newNote = prompt("Enter the new note:");
            // while(newNote == "") {
            //     newNote = prompt("Enter the new note:");
            // }
            //do I need to recall function after?
            displayNote(selectedFolderIndex, edittingNoteIndexesArray);
        });
        noteContainer.appendChild(editButton);

        notesContainer.appendChild(noteContainer);
    });

    // document.getElementById("noteText").innerHTML = str;
    document.getElementById("noteTitle").innerHTML = document.getElementById("folders").options[selectedFolderIndex].text;

    
    let selectFolders = document.getElementById("noteText");
}
