import axios from "axios";
import { NOTE_API_URL } from '../constants/api'
import INote from "../interfaces/note.interface";

export const getNotes = async () => {
  try {
    const res = await axios.get(NOTE_API_URL)
    return res.data.notes
  } catch (error) {
    console.error(error);
  }
}

export const createNote = async (newNote: Partial<INote>) => {
  try {
    const res = await axios.post(NOTE_API_URL, newNote)
    return res.data.note
  } catch (error) {
    console.error(error);
  }
}

export const updateNote = async (noteToUpdateId: string, noteToUpdate: Partial<INote>) => {
  try {
    const url = `${NOTE_API_URL}/${noteToUpdateId}`
    const res = await axios.put(url, noteToUpdate)
    return res.data.note
  } catch (error) {
    console.error(error);
  }
}

export const deleteNote = async (noteToDeleteId: string) => {
  try {
    const url = `${NOTE_API_URL}/${noteToDeleteId}`
    const res = await axios.delete(url)
    return res.data.message
  } catch (error) {
    console.error(error);
  }
}