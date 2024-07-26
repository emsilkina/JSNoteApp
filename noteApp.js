let folders = [new Note(), new Note()];

function Note () {
    this.noteArray = [];
}


const noteTextLimit = 120;
const folderNameTextLimit = 20;

document.addEventListener("DOMContentLoaded", function() {
    displayNote(0, []);

    document.getElementById("folders").addEventListener("change", function() {
        let selectedFolderIndex = document.getElementById("folders").value;
        displayNote(selectedFolderIndex, []);
    });

    document.getElementById("newFolderButton").addEventListener("click", function() {
        displayNewFolderInput();
        dontDisplayRenameFolderInput();
    });

    document.getElementById("changeNameButton").addEventListener("click", function() {
        displayRenameFolderInput();
        dontDisplayNewFolderInput();
        const folderElement = document.getElementById("folders");
        const newFolderNameTextInput = document.getElementById("renameFolderTitle");
        newFolderNameTextInput.value = folderElement.options[folderElement.selectedIndex].text;
    });

    document.getElementById("acceptNewFolderName").addEventListener("click", function() {
        const folderElement = document.getElementById("folders");
        const originalFolderName = folderElement.options[folderElement.selectedIndex].text;
        const newFolderNameTextInput = document.getElementById("renameFolderTitle");
        const newFolderName = newFolderNameTextInput.value;

        if(newFolderName.length > 0 && newFolderName.length <= folderNameTextLimit) {
            if (!folders.find(folder => folder.title === newFolderTitle)) {
                if(originalFolderName == newFolderName) {
                    alert("The folder name you entered is the same as the old one.");
                } else {
                    folderElement.options[folderElement.selectedIndex].text = newFolderName;
                    dontDisplayRenameFolderInput();
                    const noteTitle = document.getElementById("noteTitle");
                    noteTitle.textContent = newFolderName;
                }
            } else {
                alert("Folder name already exists!")
            }
        } else {
            if(newFolderName.length == 0) {
                alert("Folder name can't be empty!")
            } else {
                alert("Folder name has to be less than 20 characters! Please shorten it.")
            }
        }

    });

    document.getElementById("dontAcceptNewFolderName").addEventListener("click", function() {
        dontDisplayRenameFolderInput();
        //alert user if the name is the same as the old name
    });


    document.getElementById("saveInput").addEventListener("click", function() {
        let selectedFolder = document.getElementById("folders").value;
        let userInput = document.getElementById("userInput").value;

        if(userInput.length == 0) {
            alert("Error: the new note input empty. Please try again!")
        } else if(userInput.length <= noteTextLimit) {
            folders[selectedFolder].noteArray.push(userInput);
        } else {
            alert("Error: the new note input is too large. Please try again!")
        }

        document.getElementById("userInput").value = "";
        
        displayNote(selectedFolder, []);

    });

    document.getElementById("deleteFolderButton").addEventListener("click", function() {
        let selectedFolders = document.getElementById("folders");
        let selectedFolderIndex = selectedFolders.selectedIndex;
        
        if (folders.length != 1) {
            let confirmDeletion = confirm("Are you sure you want to delete this folder?");
            if(confirmDeletion) {
                folders.splice(selectedFolderIndex, 1);
                selectedFolders.remove(selectedFolderIndex);
                selectedFolders.selectedIndex = 0;
            }
            displayNote(selectedFolders.selectedIndex, []);
        } else {
            alert("Error: can't delete folder. There must be at least one folder remaining.")
        } 

    }); 

    document.getElementById("addNewFolderButton").addEventListener("click", function() {
        let newFolderTitle = document.getElementById("newFolderTitle").value;

        if(newFolderTitle.length > 0 && newFolderTitle.length <= folderNameTextLimit) {
            if (!folders.find(folder => folder.title === newFolderTitle)) {
                let newFolderNote = new Note();
                newFolderNote.title = newFolderTitle;
                folders.push(newFolderNote); 
    
                let selectFolders = document.getElementById("folders");
                let option = document.createElement("option"); 
                option.text = newFolderTitle;
                option.value = folders.length - 1;
                selectFolders.appendChild(option); 
    
                document.getElementById("newFolderTitle").value = "";
    
                const newFolderInput = document.getElementById("newFolderName");
                newFolderInput.style.display = "none";
        
                dontDisplayNewFolderInput();
            } else {
                alert("Folder name already exists!")
            }
        } else {
            if(newFolderTitle.length == 0) {
                alert("Folder name can't be empty!")
            } else {
                alert("Folder name has to be less than 20 characters! Please shorten it.")
            }
        }
    });

    
    document.getElementById("cancelNewFolderSelection").addEventListener("click", function() {
            dontDisplayNewFolderInput();
            const newFolderButton = document.getElementById("newFolderButton");
            const changeNameButton = document.getElementById("changeNameButton");
            newFolderButton.style.display = "block";
            changeNameButton.style.display = "block";
            document.getElementById("newFolderTitle").value = "";
    });

});

let edittingNoteIndexesArray = [];

//display the note for the specific folder
function displayNote(selectedFolderIndex, edittingNoteIndexes) {
    let notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";

    folders[selectedFolderIndex].noteArray.forEach((noteText, index) => {
        let noteContainer = document.createElement("div");
        let edittingNote = edittingNoteIndexes.includes(index);
        let note = null;

        const bulletPoint = document.createElement("p");
        bulletPoint.textContent = "• ";
        bulletPoint.classList.add("bulletPoint");
        noteContainer.appendChild(bulletPoint);
        noteContainer.classList.add("noteContainer");

        if(!edittingNote) {
            //note text
            note = document.createElement("p");
            note.textContent = noteText;
            note.classList.add("note-text");
        } else {
            //note text area
            note = document.createElement("textarea");
            note.value = noteText;
            note.rows = "1";
            note.classList.add("note-textarea");
        }
        noteContainer.appendChild(note);
        
        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("icon");
        deleteButton.addEventListener("click", function() {
            folders[selectedFolderIndex].noteArray.splice(index, 1);
            displayNote(selectedFolderIndex, edittingNoteIndexesArray);
        });
        noteContainer.appendChild(deleteButton);

        if(!edittingNote) {
            //edit button
            const editButton = document.createElement("button");
            editButton.textContent = "✏️";
            editButton.classList.add("icon");
            editButton.addEventListener("click", function() {
                edittingNoteIndexesArray.push(index);
                displayNote(selectedFolderIndex, edittingNoteIndexesArray);
            });
            noteContainer.appendChild(editButton);
        } else {
            //save button
            const saveButton = document.createElement("button");
            saveButton.textContent = "✅";
            saveButton.classList.add("icon");
            saveButton.addEventListener("click", function() {
                noteText = note.value;
                if(noteText.length <= noteTextLimit) {
                    folders[selectedFolderIndex].noteArray[index] = noteText; 
                    edittingNoteIndexes.splice(index,1);
                    displayNote(selectedFolderIndex, edittingNoteIndexesArray);
                } else {
                    alert("Error: the new note input is too large. Please try again!")
                }
                
            });
            noteContainer.appendChild(saveButton);

            //don't save button
            const dontSaveButton = document.createElement("button");
            dontSaveButton.textContent = "🚫";
            dontSaveButton.classList.add("icon");
            dontSaveButton.addEventListener("click", function() {
                edittingNoteIndexes.splice(index,1);
                displayNote(selectedFolderIndex, edittingNoteIndexesArray);
            });
            noteContainer.appendChild(dontSaveButton);
        }
        

        notesContainer.appendChild(noteContainer);
    });

    document.getElementById("noteTitle").innerHTML = document.getElementById("folders").options[selectedFolderIndex].text;
}



function displayNewFolderInput() {
    const newFolderInput = document.getElementById("newFolderName");
    newFolderInput.style.display = "block";

    const newFolderButton = document.getElementById("newFolderButton");
    newFolderButton.classList.remove("purpleButton");
    newFolderButton.classList.add("purpleButtonSelected");
}

function dontDisplayNewFolderInput() {
    const newFolderInput = document.getElementById("newFolderName");
    newFolderInput.style.display = "none";

    const newFolderButton = document.getElementById("newFolderButton");
    newFolderButton.classList.remove("purpleButtonSelected");
    newFolderButton.classList.add("purpleButton");
}

function displayRenameFolderInput() {
    const renameFolderInput = document.getElementById("renameFolder");
    renameFolderInput.style.display = "block";

    const renameFolderButton = document.getElementById("changeNameButton");
    renameFolderButton.classList.remove("purpleButton");
    renameFolderButton.classList.add("purpleButtonSelected");
}


function dontDisplayRenameFolderInput() {
    const renameFolderInput = document.getElementById("renameFolder");
    renameFolderInput.style.display = "none";

    const renameFolderButton = document.getElementById("changeNameButton");
    renameFolderButton.classList.remove("purpleButtonSelected");
    renameFolderButton.classList.add("purpleButton");
}
