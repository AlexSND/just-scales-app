import styles from './Header.module.scss';
import {NoteSelector} from '../NoteSelector/NoteSelector';
import {Config} from '../Config/Config';

export const Header = () => {
  return (
    <header className={styles.header}>
      <NoteSelector/>
      <Config/>
    </header>
  )
}