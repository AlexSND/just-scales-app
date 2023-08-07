import styles from './NoteSelector.module.scss';
import {useCallback, useMemo} from 'react';
import {KEYS} from '../../shared/const/keys';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {IKey} from '../../shared/interfaces/key';
import {selectMainNote} from '../../app.slice';
import {classNames} from '../../shared/utils/classNames';

export const NoteSelector = () => {
  const mainNote = useSelector((state: RootState) => state.app.mainNote);
  const selectedScales = useSelector((state: RootState) => state.app.selectedScales);
  const compactView = useSelector((state: RootState) => state.app.compactView);
  const dispatch = useDispatch();

  const onKeySelect = useCallback((note: IKey) => {
    dispatch(selectMainNote(note));
  }, [dispatch]);

  const notes = useMemo(() => (
    KEYS.map(key => <div
      key={key.note}
      className={classNames([styles.note, mainNote === key ? styles.active : ''])}
      onClick={() => onKeySelect(key)}>
        {key.note}
      </div>)
  ), [onKeySelect, mainNote]);

  const compactBlock = useMemo(() => (
    <span className={styles.scale}>
      {mainNote?.note} {selectedScales[0]?.name}
    </span>
  ), [selectedScales, mainNote])

  return (
    <div className={styles.wrapper}>
      {compactView ? compactBlock : notes}
    </div>
  )
}