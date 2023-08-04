import {LogicalSize, appWindow} from '@tauri-apps/api/window';
import {useCallback, useEffect, useRef} from 'react'
import {Header} from './components/Header/Header'
import {Keyboard} from './components/Keyboard/Keyboard'
import {ScaleSelector} from './components/ScaleSelector/ScaleSelector'
import {IScale} from './shared/interfaces/scale'
import {IKey} from './shared/interfaces/key'
import {IForNoteScale} from './shared/interfaces/forNoteScale'
import {SCALES} from './shared/const/scales'
import {useDispatch, useSelector} from 'react-redux'
import {setScales} from './app.slice'
import {RootState, store} from './store'
import {KEYS} from './shared/const/keys'
import {APP_WIDTH, APP_WIDTH_COMPACT} from './shared/const/app';

function App() {
  const scales = useSelector((state: RootState) => state.app.scales);
  const dispatch = useDispatch();
  const mainRef = useRef<HTMLDivElement | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const convertScales = useCallback((scales: IScale[], keys: IKey[]): IForNoteScale[] => {
    const convertedScales: IForNoteScale[] = [];

    scales.map(scale => {
      keys.map((note, idx) => {
        const mainNoteIdx: number = idx;
        const scaleNotes: IKey[] = [];

        const scaleKeysIndexses = scale.ranges.reduce((current, next) => {
          return [...current, (current.pop() || 0) + next]
        }, [] as number[]).map(idx => {
          const index = idx + mainNoteIdx;

          return index > 11 ? index - 12 : index;
        });


        keys.forEach((note, idx) => {
          if (idx === mainNoteIdx || scaleKeysIndexses.includes(idx)) {
            scaleNotes.push(note)
          }
        })

        convertedScales.push({
          mainNote: note.note,
          name: scale.name,
          notes: scaleNotes,
        });
      });
    });

    return convertedScales;
  }, [])

  const setAppWindowSize = (entries: ResizeObserverEntry[]) => {
    const rect = entries[0].contentRect;
    // TODO: set height without hard appbar height
    if (rect) {
      const isCompact = store.getState().app.compactView;
      appWindow.setSize(new LogicalSize(isCompact ? APP_WIDTH_COMPACT : APP_WIDTH, rect.height + 60));
      appWindow.setAlwaysOnTop(isCompact);
    }
  }

  useEffect(() => {
    dispatch(setScales(convertScales(SCALES, KEYS)));
  }, [convertScales, dispatch])

  useEffect(() => {
    if (mainRef.current && !resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => setAppWindowSize(entries));
      resizeObserverRef.current.observe(mainRef.current);
    }

    () => {
      if (mainRef.current) {
        resizeObserverRef.current?.disconnect()
      }
    }
  }, [mainRef.current])

  return scales.length ? (
    <div ref={mainRef} className='main'>
      <Header/>
      <ScaleSelector/>
      <Keyboard/>
    </div>
  ) : null
}

export default App
