import './App.css';
import axios from 'axios';
import { useState, useEffect, FocusEvent } from 'react';
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note';
import INote from './interfaces/note.interface';

function App() {
  const [noteLists, setNoteLists] = useState<Array<any>>([]);

  useEffect(() => {
    const noteListsFromStorage = localStorage.getItem('my-notes')

    setNoteLists(noteListsFromStorage ? JSON.parse(noteListsFromStorage) : DUMMY_NOTES)
  }, [])

  // Store note lists to localStorage after updated
  useEffect(() => {
    const noteListsString = JSON.stringify(noteLists)
    localStorage.setItem('my-notes', noteListsString)
  }, [noteLists])

  const onNoteUpdate = (noteObj: INote) => {
    const updatedNoteLists = noteLists.map((note: INote) => {
      if (note._id === noteObj._id) {
        note.text = noteObj.text
      }

      return note
    })

    setNoteLists(updatedNoteLists)
    console.log(updatedNoteLists)
  }

  const getNotes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/notes')
      setNoteLists(res.data.notes)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div className='note-lists'>
        {/* Show Details */}
        {
          noteLists.map((note, index) => {
            return (
              <Note key={index} note={note} onNoteUpdate={onNoteUpdate} />
            )
          })
        }

      </div>
    </div>
  );
}

export default App;
