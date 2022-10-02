# use-refillable-state

> Saves Html form data when user leaves page data and refill when revisits that page again!

[![NPM](https://img.shields.io/npm/v/use-refillable-state.svg)](https://www.npmjs.com/package/use-refillable-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-refillable-state
```

## Usage

```jsx
import React, { Component } from 'react'
import useRefillableState from 'use-refillable-state/src'
// Clone And Run for better understanding!!
const App = () => {
  
  const { currentState, setCurrentState, acceptDraft, discardDraft, showingDraft, saveState } = useRefillableState({first_name: '', last_name: '', email: '', password: ''})

  return (

    <center style={{width: '30vw', marginTop: '30vh', marginLeft: '40vw', backgroundColor: '#EFEAD8', borderRadius: '10px', fontFamily: 'monospace'}}>

      {showingDraft ? <div style={{display: 'flex', alignItems: 'center', borderRadius: '10px 10px 0 0', justifyContent: 'space-between', backgroundColor: '#00FFAB', padding: '0 1rem'}}>
        <p style={{color: 'black'}}>Accept Saved Changes?</p>
        <div >

          <button style={{color: 'green'}} onClick={acceptDraft}>&#x2713; Accept</button> {' '}
          <button style={{color: 'red'}} onClick={discardDraft}>&#x2717; Ignore</button>

        </div>
      </div> : <p style={{textAlign: 'left', backgroundColor: '#00FFAB', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', padding: '1rem 1rem'}}>Long/Complex Form</p>}
      <br/>

      
      <form>


        <input placeholder="First Name" disabled={showingDraft} type="text" style={{color: showingDraft ? 'lightgreen' : ''}} value={currentState.first_name} onChange={(e) => { setCurrentState({...currentState, first_name: e.target.value}) }} />
        <br/>
        <input placeholder="Last Name" disabled={showingDraft} type="text" style={{color: showingDraft ? 'lightgreen' : ''}} value={currentState.last_name} onChange={(e) => { setCurrentState({...currentState, last_name: e.target.value}) }} />
        <br/>

        <input placeholder="Email" disabled={showingDraft} type="email" style={{color: showingDraft ? 'lightgreen' : ''}} value={currentState.email} onChange={(e) => { setCurrentState({...currentState, email: e.target.value}) }} />
        <br/>

        <input placeholder="Password" disabled={showingDraft} type="password" style={{color: showingDraft ? 'lightgreen' : ''}} value={currentState.password} onChange={(e) => { setCurrentState({...currentState, password: e.target.value}) }} />
        <br/>

        <br/>
        <span style={{color: '#c4c4c4', fontFamily: 'monospace'}}>//Other radio/checkbox/mixed inputs</span>
        <br/>
        <br/>

        <button disabled={showingDraft} onClick={(e) => {e.preventDefault(); saveState();}}>Save Externally</button>
        <br/>
        <br/>

      </form>

    </center>

  )
}

export default App

```

## License

MIT © [spade-official](https://github.com/spade-official)
