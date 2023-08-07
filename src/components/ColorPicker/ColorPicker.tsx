import {ChangeEvent, useEffect, useRef} from 'react';
import styles from './ColorPicker.module.scss';

export const ColorPicker = () => {
  const rootEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootEl.current = document.querySelector(':root');
    setColorsFromStorage();
  }, [])

  const convertHexToRGB = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

  const setColorsFromStorage = () => {
    if (localStorage.getItem('primary-color')) {
      rootEl.current?.style.setProperty('--primary-color', localStorage.getItem('primary-color'));
    }
  }

  const onPrimaryColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('primary-color', convertHexToRGB(e.target.value));
    rootEl.current?.style.setProperty('--primary-color', convertHexToRGB(e.target.value));
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.picker}>
        <input type="color" onChange={onPrimaryColorChange}/>
      </label>
    </div>
  )
}