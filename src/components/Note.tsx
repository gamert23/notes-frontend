import { FC, FocusEvent } from 'react'
import INote from '../interfaces/note.interface'
import '../styles/Note.css'

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
}

const Note: FC<Props> = ({ note, onNoteUpdate }) => {

  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
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
    <div className='note'>
      <div
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