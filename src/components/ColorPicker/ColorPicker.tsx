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

    return `${r}, ${g}, ${b}`;
}

  const setColorsFromStorage = () => {
    if (localStorage.getItem('primary-color')) {
      rootEl.current?.style.setProperty('--primary-color', localStorage.getItem('primary-color'));
    }
    if (localStorage.getItem('text-color')) {
      rootEl.current?.style.setProperty('--text-color', localStorage.getItem('text-color'));
    }
  }

  const onBgColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('primary-color', convertHexToRGB(e.target.value));
    rootEl.current?.style.setProperty('--primary-color', convertHexToRGB(e.target.value));
  }

  const onTextColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('text-color', convertHexToRGB(e.target.value));
    rootEl.current?.style.setProperty('--text-color', convertHexToRGB(e.target.value));
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.picker}>
        <input type="color" onChange={onBgColorChange}/>
      </label>
      <label className={styles.picker}>
        <span>T</span>
        <input type="color" onChange={onTextColorChange}/>
      </label>
    </div>
  )
}