import {useCallback, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlenght] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllwed] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"
    for (let i = 1; i < length; i++) {
      const ch = Math.floor(Math.random() * str.length +1)
      pass +=str[ch]
    }
    
    setPassword(pass)
  }, [length,numberAllowed,charAllowed])
  
    useEffect(() => {
      const copy = document.getElementById('copy')
      if (copy.innerHTML==="COPIED") {
        copy.innerHTML="Copy"
      }
      generatePassword();
    }, [length, numberAllowed, charAllowed])
    
  const copypassword = ()=>{
    const copy = document.getElementById('copy')
    copy.innerHTML="COPIED"
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
          />
          <button
            onClick={copypassword}
            id='copy'
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div
          className='flex text-sm gap-x-2'
        >
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlenght(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              name=""
              id="" />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllwed((prev) => !prev)
              }}
              name=""
              id="" />
            <label htmlFor="charInput">Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
