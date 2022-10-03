import React from 'react'
// import {useHistory} from "react-router-dom"
function unMarshalData(data, type){

  switch (type) {

    case 'string':
      return data;

    case 'number':
      return Number(data);

    case 'object':
      return JSON.parse(data);

    case 'boolean':
      return Boolean(data)
    
    default: 
      return data;

  }

}

function useRefillableState(initial_state){

  /*

  Args: content_key_hardcoded => Do not use useId() from react as it can generate different values as client refreshes page/component

  */

  const [givenState, setGivenState] = React.useState(initial_state)
  const [draftState, setDraftState] = React.useState(null)
  const [currentState, setCurrentState] = React.useState(givenState)
  const [ showState, setShowState] = React.useState('current') // current | draft


  const unique_key = typeof window !== 'undefined' ? window.location.pathname.endsWith('/') && window.location.pathname.length > 1 ? window.location.pathname.slice(0, -1) : window.location.pathname : null;
  const unique_key_type = typeof initial_state;

  const changeGivenState = (new_state) => {

    console.log("curr:", new_state)

    setGivenState(new_state);
    // if(showState === 'current'){
      setCurrentState(new_state)
    // } else {
    // }

  } 

  const SyncStateLocally = () => {

    try{

      localStorage.setItem(unique_key + '__type', typeof currentState)
      localStorage.setItem(unique_key, typeof currentState === 'object' ? JSON.stringify(currentState) : currentState);
    
    } catch (e) {

      console.error("Error Syncing data locally: ", e)

    }


  }

  const DiscardDraft = () => {

    setShowState('current');
    setCurrentState(givenState);
    setDraftState(null)

    try{

      localStorage.removeItem(unique_key)
      localStorage.removeItem(unique_key + '__type')

    } catch (e) {

      console.error("Can't remove saved draft::", e)

    }

  }

  const AcceptDraft = () => {

    setShowState('current');
    setCurrentState(draftState);

  }

  const handleWindowBeforeUnload = (e) => {

    e.preventDefault()
    // SyncStateLocally();
    console.log("Helllo")
    try{

      localStorage.setItem(unique_key + '__type', typeof currentState)
      localStorage.setItem(unique_key, typeof currentState === 'object' ? JSON.stringify(currentState) : currentState);
    
    } catch (e) {

      console.error("Error Syncing data locally: ", e)

    }
    // alert("yes")
    // alert("Hello")
    e.returnValue = "asdasd"
    return 'ass';

  }


  React.useEffect(() => {

    if(typeof localStorage !== 'undefined'){

      const saved_draft = localStorage.getItem(unique_key);

      if(saved_draft !=  null && saved_draft != undefined){

        const saved_draft_type = localStorage.getItem(unique_key + '__type')
        if(saved_draft_type !=  null && saved_draft_type != undefined){
          console.log("DEBUG_",draftState)
          setShowState('draft')
          setDraftState(unMarshalData(saved_draft, saved_draft_type))
          console.log("sad", unMarshalData(saved_draft, saved_draft_type))
          setCurrentState(unMarshalData(saved_draft, saved_draft_type));

        }


      }

    }

  }, [])

  return {

    setCurrentState: changeGivenState,
    acceptDraft: AcceptDraft,
    discardDraft: DiscardDraft,
    showingDraft: showState === 'draft',
    currentState: currentState,
    saveState: SyncStateLocally

  }

}

export default useRefillableState;
