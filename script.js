const addButton = document.querySelector('#add');

const savaData = ()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note)=>{
        return notes.push(note.value)
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="content ${text ? "" :"hidden"}"></div>
            <textarea class="${text ? "hidden" :""}"></textarea>
    `;
    note.insertAdjacentHTML('afterbegin', htmlData)
    document.body.appendChild(note)

    // Selecting Elements
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const content = note.querySelector('.content');
    const textArea = note.querySelector('textarea');

    //Deleting note
    delButton.addEventListener('click',()=>{
        note.remove();
        savaData();
    })

    //Toggel
    textArea.value=text;
    content.innerHTML = text;

    //Toggle content & textarea
    editButton.addEventListener('click',()=>{
        content.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    //Reflecting textArea data into containt div
    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        content.innerHTML = value;
        //Save data into local storage
        savaData(); 
    })

}

//Getting back data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addNote(note))
}

addButton.addEventListener('click', () => addNote())