import {Config} from "../Config/Config"
import {NoteSelector} from "../NoteSelector/NoteSelector"
import styles from './TopNav.module.scss'

export const TopNav = () => {
  return (
    <div className={styles.wrapper}>
      <NoteSelector/>
      <Config/>
    </div>
  )
}