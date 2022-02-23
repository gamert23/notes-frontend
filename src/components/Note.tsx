import { FC, FocusEvent, useState } from 'react'
import INote from '../interfaces/note.interface'
import '../styles/Note.css'

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
}

const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocused, setIsFocused] = useState(false)

  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false)
    const newTextValue = event.currentTarget.textContent

    if (newTextValue?.trim() === note.text?.trim()) {
      return
    }

    const updatedNoteObj: INote = {
      ...note,
      text: newTextValue || ''
    }

    onNoteUpdate(updatedNoteObj)
  }

  return (
    <div className={isFocused ? 'note note--focused' : 'note'}>
      <button onClick={() => onNoteDelete(note)} type="button" className="btn-close" aria-label="Close"></button>

      <div
        onFocus={() => setIsFocused(true)}
        onBlur={noteTextUpdated}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className='note__text'> {note.text} </div>
      <div className='note__link'>
        <a href={note.link}> {note.link} </a>
      </div>
    </div >
  )
}

export default Note