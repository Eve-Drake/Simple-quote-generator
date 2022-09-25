import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css';

interface quote{
  _id: string,
  content: string,
  author: string,
  tag: tag
  authorSlug:	string,
  length:	number
  dateAdded:	string,
  dateModified:	string,
}

interface tag{
  0: string,
}
function App() {
  const [quoteData, setQuoteData] = useState<quote>()
  const [loading, setLoading] = useState<boolean>(false)
  const [easyRead, setEasyRead] = useState<boolean>(false)

  const getPersonQuote = async () =>{
    setLoading(true)
    try{
      const response = await axios.get('https://api.quotable.io/random?')
      setQuoteData(response.data)
      setLoading(false)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getPersonQuote()
  },[])

  return (
    <div className="app">
      <div className='toggleSwitch'>
        <label htmlFor='toggle'>Toggle Font: </label>
          <input 
            className='toggle'
            type="checkbox" 
            onChange={()=>setEasyRead(!easyRead)} />
      </div>

        <div className='quote'>
          {!loading &&  <div className={(easyRead? 'easy' : 'script')}>
              <h1>{quoteData?.content}</h1>
              <p>-{quoteData?.author}</p>
            </div>}          
            <div className='getMore'>
              <button onClick={getPersonQuote}>New Quote</button>
            </div>
          </div>




    </div>
  );
}

export default App;
