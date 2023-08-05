import {LogicalSize, appWindow} from '@tauri-apps/api/window';
import {useCallback, useEffect} from 'react'
import {Header} from './components/Header/Header'
import {Keyboard} from './components/Keyboard/Keyboard'
import {ScaleSelector} from './components/ScaleSelector/ScaleSelector'
import {IScale} from './shared/interfaces/scale'
import {IKey} from './shared/interfaces/key'
import {IForNoteScale} from './shared/interfaces/forNoteScale'
import {SCALES} from './shared/const/scales'
import {useDispatch, useSelector} from 'react-redux'
import {setScales} from './app.slice'
import {RootState} from './store'
import {KEYS} from './shared/const/keys'
import {APP_HEIGHT, APP_HEIGHT_COMPACT, APP_WIDTH, APP_WIDTH_COMPACT} from './shared/const/app';

function App() {
  const scales = useSelector((state: RootState) => state.app.scales);
  const compactView = useSelector((state: RootState) => state.app.compactView);
  const dispatch = useDispatch();

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

  useEffect(() => {
    appWindow.setSize(new LogicalSize(
      compactView ? APP_WIDTH_COMPACT : APP_WIDTH,
      compactView ? APP_HEIGHT_COMPACT : APP_HEIGHT
    ));
    appWindow.setAlwaysOnTop(compactView);
  }, [compactView]);

  useEffect(() => {
    dispatch(setScales(convertScales(SCALES, KEYS)));
  }, [convertScales, dispatch])

  return scales.length ? (
    <div className='main'>
      <Header/>
      <ScaleSelector/>
      <Keyboard/>
    </div>
  ) : null
}

export default App
