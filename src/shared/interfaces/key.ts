export type TClass = 'c' | 'c-sharp' | 'd' | 'd-sharp' | 'e' | 'f' | 'f-sharp' | 'g' | 'g-sharp' | 'a' | 'a-sharp' | 'b';
export type TNote = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export interface IKey {
  note: TNote,
  class: TClass,
}