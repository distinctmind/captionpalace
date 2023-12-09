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
    document.querySelector('.copySvg')?.classList.add('hide');
    document.querySelector('#successMessage')?.classList.add('show');
  
    setTimeout(()=>{
      document.querySelector('.copySvg')?.classList.toggle('hide');
      document.querySelector('#successMessage')?.classList.toggle('show');
    }, 2222);

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
      <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1 className={theme === 'light' ? 'lightText' : 'darkText'}>Create Art</h1>
        <textarea ref={textAreaRef} defaultValue={''} id='caption' className={theme === 'light' ? 'light' : 'dark'} rows={10} cols={44} onChange={updateTextArea}>
        </textarea>
        <div style={{position: 'relative', margin: 30}}>
          <span style={{position: 'absolute', left: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>{characterCount}/2200 </span>
          <span style={{position: 'absolute', right: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>#{hashtagCount}/30</span>
        </div>
       
        <div className='buttonContainer'>
          <button id='successMessage' className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
            Copied to Clipboard!
          </button>
          <button className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
            <svg className='copySvg' fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="0,190.513 0,229.34 45.298,229.34 45.298,501.125 97.066,501.125 97.066,190.513 "></polygon> </g> </g> <g> <g> <path d="M432.798,125.802L162.912,10.875L147.7,46.598l185.998,79.205H135.893v155.306h297.67V125.802H432.798z M265.314,222.869 h-38.826v-38.826h38.826V222.869z M342.968,222.869h-38.827v-38.826h38.827V222.869z"></path> </g> </g> <g> <g> <polygon points="484.547,267.381 431.993,319.935 135.893,319.935 135.893,501.125 433.563,501.125 433.563,373.273 512,294.835 "></polygon> </g> </g> </g></svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default App
