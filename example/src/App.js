import React from 'react'
import useRefillableState from 'use-refillable-state/src'
// import { ExampleComponent } from 'use-refillable-state'
// import 'use-refillable-state/dist/index.css'
// import useRefillableState from 'use-refillable-state'

const App = () => {
  
  const { currentState, setCurrentState, acceptDraft, discardDraft, showingDraft, saveState } = useRefillableState({first_name: '', last_name: '', email: '', password: ''})

  return (
    <center>
    <center style={{width: '30vw', marginTop: '35vh', backgroundColor: '#EFEAD8', borderRadius: '10px', fontFamily: 'monospace'}}>

      {showingDraft ? <div style={{display: 'flex', alignItems: 'center', borderRadius: '10px 10px 0 0', justifyContent: 'space-between', backgroundColor: '#002E94', padding: '0 1rem'}}>
        <p style={{color: 'black'}}>Accept Saved Changes?</p>
        <div >

          <button style={{color: 'green'}} onClick={acceptDraft}>&#x2713; Accept</button> {' '}
          <button style={{color: 'red'}} onClick={discardDraft}>&#x2717; Ignore</button>

        </div>
      </div> : <p style={{textAlign: 'left', backgroundColor: '#002E94', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', padding: '1rem 1rem'}}>Long/Complex Form</p>}
      <br/>

      {/* <h3>Important/Long/Complex Form</h3> */}
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
    </center>

  )
}

export default App
