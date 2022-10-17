import React, { useEffect } from "react"
import { useRefillableForm } from "use-refillable-state/src";

const App = () => {

  const { formRef, showingDraft, deleteDraft, acceptDraft, discardDraft, currentState, setCurrentState } = useRefillableForm({threshold: 50, unique_key: 'sign_up_form'});
  const [blobUrl, setBlobUrl] = React.useState('')


  const handleFormSubmit = (e) => {

    let submission_successfull = make_submission(currentState);
    
    if(submission_successfull){
      deleteDraft();
    }

  }

  useEffect(() => {
    if(currentState['profile_resume']){

      setBlobUrl(URL.createObjectURL(currentState['profile_resume']))
    }
  }, [currentState['profile_resume']])


  return (
    <center>
      {/* can use display flex, align i... */}


      {showingDraft && <div className="draft_confirm_alert">
        <p>Accept Drafted Changes?</p>
        <div>
          {/* <button> */}

          <svg onClick={acceptDraft} color="#2B7A0B" width="23" height="23" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>

          {/* </button> */}
          {/* <button> */}

          <svg onClick={discardDraft} color="#E64848" width="23" height="23" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>

          {/* </button> */}
        </div>
      </div>}
      <form onSubmit={handleFormSubmit} ref={formRef}>


        <h2>Provide Details</h2>  
        <input placeholder="First Name" type="text" name="first_name" />
        <input placeholder="Last Name" type="text" name="last_name" />
        <input placeholder="Email" type="email" name="email" />
        <input placeholder="Phone No." type="phone" name="phone_no" />
        <input placeholder="Password" type="password" name="phone_no" />
        {
        
        currentState['profile_resume']  
              ? <div style={{ width: 'min(500px, 50vw)', border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0 0.8rem 1rem 0.8rem', margin: '0.7rem 1rem' }}>
                  <p >Preview File: {currentState['profile_resume']?.name}</p>
                  <img style={{height: '100px', borderRadius: '5px'}}  src={`${blobUrl}`} />
                </div>
              :
         <input placeholder="File" type="file" name="profile_resume" />
        }
        

        <div>
          <b>Which Language you love the most? </b>
          <select defaultValue="python" name="loved_language" onChange={(e) => {setCurrentState(curr => {return {...curr, [e.target.name]: e.target.value}});e.persist()}}>
            <option value="python">Python</option>
            <option value="js">JS</option>
            <option value="c">C</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <i>Choose you fav. OTT </i>
          <input type="radio" id="Netflix" name="brand" value="Netflix"/>
          <label for="Netflix">Netflix</label>
          
          <input type="radio" id="AP" name="brand" value="AP"/>
          <label for="AP">Amazon Prime</label>

          <input type="radio" id="hotstar" name="brand" value="hotstar"/>
          <label for="hotstar">Hotstar</label>
        </div>

        <div>
        <input placeholder="Agree TnC" type="checkbox" name="agree_tnc" defaultChecked={true} />
        <span>I Agree Terms and Conditions</span>
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </center>
  )

}

export default App

























function make_submission (e) {return true}