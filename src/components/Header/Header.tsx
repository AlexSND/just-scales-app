import styles from './Header.module.scss';
import {NoteSelector} from '../NoteSelector/NoteSelector';
import {Config} from '../Config/Config';

export const Header = () => {
  return (
    <header data-tauri-drag-region className={styles.header}>
      <NoteSelector/>
      <Config/>
    </header>
  )
}