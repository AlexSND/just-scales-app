import {useDispatch, useSelector} from 'react-redux';
import {SCALES} from '../../shared/const/scales';
import styles from './ScaleSelector.module.scss';
import {RootState} from '../../store';
import {classNames} from '../../shared/utils/classNames';
import {useCallback} from 'react';
import {IScale} from '../../shared/interfaces/scale';
import {selectScale} from '../../app.slice';

export const ScaleSelector = () => {
  const selectedScales = useSelector((state: RootState) => state.app.selectedScales);
  const compactView = useSelector((state: RootState) => state.app.compactView);
  const dispatch = useDispatch();

  const onScaleSelect = useCallback((scale: IScale) => {
    dispatch(selectScale(scale))
  }, [dispatch])

  const scales = SCALES.map(scale => (
    <div
      key={scale.name}
      onClick={() => onScaleSelect(scale)}
      className={classNames([styles.scaleBtn, selectedScales.some(selectedScale => selectedScale.name === scale.name) ? styles.active : ''])}>
        {scale.name}
    </div>
  ))

  return (
    compactView ? null : <div className={styles.wrapper}>{scales}</div>
  )
}