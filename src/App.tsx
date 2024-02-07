import { useRef, useState } from 'react'

import './App.css'
import NavBar from './components/navbar.tsx';
import { useTheme } from './ThemeProvider.tsx';


function App() {

  const { theme, toggleTheme } = useTheme();
  const [captionText, setCaptionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [hashtagCount, setHashtagCount] = useState(0);
  const textAreaRef = useRef<any>(null);

  const saveToDrafts = () => {

  }

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

  const sunIcon = () => (
    <svg enableBackground="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="69%" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336    c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112    c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400    c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167    l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625    S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0    l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256    c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32    c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167    c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0    c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0    c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z" fill="white"/></g></g></svg>
  );

  const moonIcon = () => (
    <svg enableBackground="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M248.082,263.932c-31.52-31.542-39.979-77.104-26.02-116.542c-15.25,5.395-29.668,13.833-41.854,26.02  c-43.751,43.75-43.751,114.667,0,158.395c43.729,43.73,114.625,43.752,158.374,0c12.229-12.186,20.646-26.604,26.021-41.854  C325.188,303.91,279.604,295.451,248.082,263.932z" fill="#111111"/></svg>
  );
  

  return (
    <>
      <NavBar />
      <button id="dark-mode-toggle" className={'theme-toggle'} onClick={() => toggleTheme()}>
        {theme === 'light' ? moonIcon() : sunIcon()}
      </button>
      <div className='mainContainer' style={{display: 'flex', flexDirection: 'column'}}>
          <h1 className={theme === 'light' ? 'lightText' : 'darkText'}>What's on your mind?</h1>
        <textarea ref={textAreaRef} defaultValue={''} id='caption' className={theme === 'light' ? 'lightText' : 'darkText'} rows={10} cols={44} onChange={updateTextArea}>
        </textarea>
        <div style={{position: 'relative', margin: 30}}>
          <span style={{position: 'absolute', left: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>{characterCount}/2200 </span>
          <span style={{position: 'absolute', right: 5}} className={theme === 'light' ? 'lightText' : 'darkText'}>#{hashtagCount}/30</span>
        </div>
        <div style={{display: 'flex'}}>
          {/* <div className='buttonContainer'>
            <button className={theme === 'light' ? 'light' : 'dark'} onClick={saveToDrafts}>
              Save to Drafts
            </button>
          </div> */}
          <div className='buttonContainer'>
              <button id='successMessage' className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
                Copied to Clipboard!
              </button>
              <button className={theme === 'light' ? 'light' : 'dark'} onClick={copyText}>
                <svg className='copySvg' fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="0,190.513 0,229.34 45.298,229.34 45.298,501.125 97.066,501.125 97.066,190.513 "></polygon> </g> </g> <g> <g> <path d="M432.798,125.802L162.912,10.875L147.7,46.598l185.998,79.205H135.893v155.306h297.67V125.802H432.798z M265.314,222.869 h-38.826v-38.826h38.826V222.869z M342.968,222.869h-38.827v-38.826h38.827V222.869z"></path> </g> </g> <g> <g> <polygon points="484.547,267.381 431.993,319.935 135.893,319.935 135.893,501.125 433.563,501.125 433.563,373.273 512,294.835 "></polygon> </g> </g> </g></svg>
              </button>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
