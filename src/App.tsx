import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect, FocusEvent } from 'react';
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note';
import INote from './interfaces/note.interface';
import { getNotes, createNote, deleteNote, updateNote } from './services/notesService';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function App() {
  const [noteLists, setNoteLists] = useState<Array<any>>([]);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    text: '',
    link: ''
  });
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)

  const handleCloseAddModal = () => {
    setShowAddNoteModal(false)
    setNewNote({
      text: '',
      link: ''
    })
  };
  const handleShowAddModal = () => setShowAddNoteModal(true);

  useEffect(() => {
    // const noteListsFromStorage = localStorage.getItem('my-notes')
    // setNoteLists(noteListsFromStorage ? JSON.parse(noteListsFromStorage) : DUMMY_NOTES)

    getNotedFromBackend()
  }, [])

  const getNotedFromBackend = async () => {
    const notes = await getNotes()
    setNoteLists(notes)
  }

  const addNote = async () => {
    const savedNote = await createNote(newNote)
    setNoteLists([...noteLists, savedNote])
    handleCloseAddModal()
  }

  // Store note lists to localStorage after updated
  useEffect(() => {
    const noteListsString = JSON.stringify(noteLists)
    localStorage.setItem('my-notes', noteListsString)
  }, [noteLists])

  const onNoteUpdate = async (noteObj: INote) => {
    const noteFromServer = await updateNote(noteObj._id, noteObj)

    const updatedNoteLists = noteLists.map((note: INote) => {
      if (note._id === noteFromServer._id) {
        return noteFromServer
      }

      return note
    })

    setNoteLists(updatedNoteLists)
  }

  const onNoteDelete = async (note: INote) => {
    await deleteNote(note._id)
    const remainingNote = noteLists.filter((noteItem) => {
      return noteItem._id !== note._id
    })

    setNoteLists([...remainingNote])
  }

  return (
    <div className="App">
      <Button variant="dark" className='add-btn' onClick={handleShowAddModal}>
        +
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Text" className="mb-3">
            <Form.Control onChange={(event) => {
              const newValue = event.currentTarget.value
              setNewNote({ ...newNote, text: newValue })
            }} as="textarea" style={{ height: '100px' }} placeholder="Input text here" />
          </FloatingLabel>

          <FloatingLabel label="Link">
            <Form.Control onChange={(event) => {
              const newValue = event.currentTarget.value
              setNewNote({ ...newNote, link: newValue })
            }} type="text" placeholder="Input link here" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='note-lists'>
        {/* Show Details */}
        {
          noteLists.map((note, index) => {
            return (
              <Note key={index} note={note} onNoteDelete={onNoteDelete} onNoteUpdate={onNoteUpdate} />
            )
          })
        }

      </div>
    </div>
  );
}

export default App;
