import {IKey, TNote} from "./key";

export interface IForNoteScale {
  mainNote: TNote;
  name: string;
  notes: IKey[];
}