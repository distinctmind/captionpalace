import { useRef, useState } from 'react'

import './App.css'
import { useTheme } from './ThemeProvider.tsx';




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
      <button id="dark-mode-toggle" className={theme === 'light' ? 'light-mode-toggle' : 'dark-mode-toggle'} onClick={() => toggleTheme()}>
        <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496">
          <path fill="currentColor" d="M8,256C8,393,119,504,256,504S504,393,504,256,393,8,256,8,8,119,8,256ZM256,440V72a184,184,0,0,1,0,368Z" transform="translate(-8 -8)"/>
        </svg>
      </button>
      <div style={{height: 1000, display: 'flex', flexDirection: 'column'}}>
          <h1 className={theme === 'light' ? 'lightText' : 'darkText'}>Create Art</h1>
        <textarea ref={textAreaRef} defaultValue={''} id='caption' className={theme === 'light' ? 'light' : 'dark'} rows={10} cols={44} onChange={updateTextArea}>
        </textarea>
        <div style={{position: 'relative', margin: 30}}>
          <span style={{position: 'absolute', left: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>{2200 - characterCount} remaining</span>
          <span style={{position: 'absolute', right: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>#{30 - hashtagCount} remaining</span>
        </div>
        <button className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
          Copy to Clipboard
        </button>
      </div>
    </>
  )
}

export default App
