import {useDispatch, useSelector} from 'react-redux';
import {classNames} from '../../shared/utils/classNames';
import styles from './Keyboard.module.scss';
import {RootState} from '../../store';
import {KEYS} from '../../shared/const/keys';
import {IKey} from '../../shared/interfaces/key';
import {selectNoteFromKeyboard} from '../../app.slice';

export const Keyboard = () => {
  const mainNote = useSelector((state: RootState) => state.app.mainNote);
  const compactView = useSelector((state: RootState) => state.app.compactView);
  const selectedKeyboardKeys = useSelector((state: RootState) => state.app.selectedKeyboardKeys);
  const dispatch = useDispatch();

  const onKeyClick = (key: IKey) => {
    if (!compactView) {
      dispatch(selectNoteFromKeyboard(key))
    }
  }

  const keys = KEYS.map((key) => (
    <div
      key={key.note}
      onClick={() => onKeyClick(key)}
      className={classNames([
        styles.note,
        styles[key.class],
        (selectedKeyboardKeys.includes(key)) ? styles.active : '',
        (key === mainNote) ? styles.main : '',
      ])}></div>
  ))

  return (
    <div className={classNames([styles.wrapper, compactView ? styles.compact : ''])}>
      {keys}
    </div>
  )
}