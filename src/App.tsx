import { useRef, useState } from 'react'

import './App.css'
import { useTheme } from './ThemeProvider.tsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';



function App() {

  const { theme, toggleTheme } = useTheme();
  const [captionText, setCaptionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [hashtagCount, setHashtagCount] = useState(0);
  const textAreaRef = useRef<any>(null);

  const copyText = () => {
    if (textAreaRef.current) textAreaRef.current.select();
    navigator.clipboard.writeText(captionText);

  }

  const findHashtagCount = (value: string) => {
    const regex = /#\w+/g;
    const matches = value.match(regex);
    return matches ? matches.length : 0;
}

  const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setCharacterCount(e.target.value.length);
      setCaptionText(e.target.value);
    } else {
      setCharacterCount(0);
    }
    setHashtagCount(findHashtagCount(e.target.value))
  }

  return (
    <>
      <div style={{position: 'absolute', top: 10, left: 10}} className={theme === 'light' ? 'light' : 'dark'} onClick={() => toggleTheme()}>
        { theme === 'light' ? 
          <LightModeIcon/>
          :
          <DarkModeIcon/>
          }
      </div>
      <div style={{height: 1000, display: 'flex', flexDirection: 'column'}}>
        <div style={{position: 'relative', margin: 30}}>
          <text style={{position: 'absolute', left: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>{characterCount}/2200</text>
          <text style={{position: 'absolute', right: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>{hashtagCount}/30</text>
        </div>
        <textarea ref={textAreaRef} defaultValue={''} id='caption' className={theme === 'light' ? 'light' : 'dark'} rows={10} cols={44} onChange={updateTextArea}>
        </textarea>
        <button className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
          Copy to Clipboard
        </button>
      </div>
    </>
  )
}

export default App
