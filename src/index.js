import React, { useEffect, useRef } from 'react'



export default function useRefillableState(initial_state, form_unique_key=''){

  /*


  Args: {key: value,...}
  
    * `value` must be any of [String, Number, Boolean, Blob, Json]
    * form_unique_key => If you use this hook more than once per page, provide harcoded value (preffer string over numbers/other).
!                     => Do not use useId() hook from react to provide form_unique_key as it can generate different values as client reloads page
!                     => form_unique_key must be harcoded / unchangable
  


  Quick Handshake Guide:


    ** About Unique Identifier for each state/form:
    
        * Global Format: " {page_url_encoded} / {form_unique_key_encoded} " => value (current_state)

        * xyz_encoded => encodeURIComponent(xyz)


  */

  const [ currentState, setCurrentState ] = React.useState(initial_state);
  const [ draftState, setDraftState ] = React.useState(null);
  const [ mode, setMode ] = React.useState('current'); // current | draft

  const db = React.useRef(null);


  const unique_key = typeof window !== 'undefined' 
      ?window.location.pathname.endsWith('/') && window.location.pathname.length > 1
          ? encodeURIComponent(window.location.pathname.slice(0, -1)) + form_unique_key
              ? "/"+encodeURIComponent(String(form_unique_key)) 
              : "" 
          : encodeURIComponent(window.location.pathname) + form_unique_key 
            ? "/"+encodeURIComponent(String(form_unique_key)) 
            : "" 
      : null;

  
  
  const configureIndexedDB = () => {

    const indexedDB = window.indexedDB;

    const request = indexedDB.open("urs_form_context_db", 1);

    request.onerror = function (event) {

        console.error("Error creating/opening Database")
        console.error(event)
    }

    request.onupgradeneeded = () => {

      const _db = request.result;
            
      const store = _db.createObjectStore("forms", { keyPath: "formIdentifier__urs" });
      
      
    }
    
    request.onsuccess = () => {

      const _db = request.result;
      
      db.current = _db

      SeekDraft();

    }

  }

  const SeekDraft = () => {

    /* 
      Checks if there is any before saved draft to this form or not
        * Yes
          - Show Drafted State to user
        *No
          - Continue
    */

    if(typeof db.current === null) {

      console.error("Looks like DB not initialized properly")
      return;

    }

    const transaction = db.current.transaction("forms", "readwrite");
    const store = transaction.objectStore("forms");

    try{

      const current_form_draft_query = store.get(unique_key);
  
      current_form_draft_query.onsuccess = () => {
  
        const { result } = current_form_draft_query
  
        try{
          
          delete result.formIdentifier__urs

          setDraftState(result)
          setCurrentState(result)
          setMode('draft')
  
        } catch {}
  
      }
    } catch {}

  }

  const SyncStateLocally = () => {

    if(typeof db.current == null) {

      console.error("Looks like DB not initialized properly")
      return;

    }

    const transaction = db.current.transaction("forms", "readwrite");
    const store = transaction.objectStore("forms");

    try{

      setCurrentState(curr => {store.put({...curr, formIdentifier__urs: unique_key});return curr})

      

    } catch (e) {

      console.error("Error Saving Current State: ", e);

    }

  }

  const deleteState = () => {

    if(typeof db.current == null) {

      console.error("Looks like DB not initialized properly")
      return;

    }

    const transaction = db.current.transaction("forms", "readwrite");
    const store = transaction.objectStore("forms");

    try{

      store.delete(unique_key);

    } catch (e) {

      console.error("Error deleting State:", e)

    }

  }

  const AcceptDraft = () => {

    if (typeof draftState == null) return;
    setCurrentState({...draftState})
    setMode('current')

  }

  const DiscardDraft = () => {

    setMode('current')

  }

  React.useEffect(() => {


    if( typeof initial_state !== 'object' ) {

      throw new Error("initial_state argument must be 'object' type")

    }

    if(typeof window !== 'undefined'){

      // On-Client
      configureIndexedDB();

    }

  }, [])


  return {

    setCurrentState: setCurrentState,
    draftState: draftState,
    acceptDraft: AcceptDraft,
    discardDraft: DiscardDraft,
    showingDraft: mode === 'draft',
    currentState: currentState,
    saveState: SyncStateLocally,
    deleteState: deleteState

  }



}


export function useRefillableForm() {

  /*
  
  @Args: None
  
  Quick Handshake Guide:

    - Default Save-Call is on blur of spammable fields like text/email/password etc...
    - deleteDraft should be only called on (2xx responses)/depends usecases, as it cannot retrieve deleted draft
  ! - Only select tag need to update the state, as it is not farly detectable from hook itself.
    - Form stores uploaded digital assets as `File()` type formation, so as retrieved value.

  ?NOTE: If you want more customization over state manipulation/other action calls, you can use generic hook (useRefillableState) to modify according to your usecase.

  */

  const { currentState, setCurrentState, draftState,acceptDraft, discardDraft, showingDraft, saveState, deleteState } = useRefillableState({})
  const inputRefs = React.useRef([]);
  const formRef = React.useRef();

  const handleInputChange = (e, save_on_change=false) => {
    setCurrentState(curr => {return {...curr, [e.target.name]: ['file', 'image'].includes(e.target.type) ? e.target.files[0] : e.target.type !== 'checkbox' ? e.target.value : e.target.checked }})
    if(['file', 'image'].includes(e.type)) {saveState()}

    if(save_on_change) saveState();

  }

  const RadioInputChange = ( e ) => {
    setCurrentState(curr => {return {...curr, radio_inputs: { [e.target.name]: e.target.value }}})

  }

  const configureTag = (elem) => {

    //Tracking inner input elements in DFS formation.
    for (const child of elem.children){
      let _catch = configureTag(child)
    }


    if (!['input', 'select'].includes(elem.tagName.toLowerCase()) || (["button", "submit"].includes(elem.type)) ) return false;

    let listener_type = "keyup";

    if ( ["checkbox", "color", "date", "datetime-local", "radio", "file", "image", "month", "radio", "range"].includes(elem.type) ){
      listener_type = "change";

    }else{

      // Spammable fields save on Blur(off-Focus)
      // Ex.. 'text', 'email', 'password'....
      elem.addEventListener("blur", saveState);

    }

    if(elem.type === 'radio'){

      elem.addEventListener(listener_type, RadioInputChange);

    }else {

      elem.addEventListener(listener_type, (e) => {handleInputChange(e, listener_type === 'change')})
  
      // Each time input field un-focuses/ save it!!
    }
    
    


    // If its load first time and have saved state / sync the value

    inputRefs.current.push(elem);

    return elem;

  }

  React.useEffect(() => {

    Object.values(formRef.current?.children).map(configureTag);

    return () => {

      for(const inp in inputRefs.current){

        inp?.removeEventListener("blur", saveState);
        inp?.removeEventListener("keyup", handleInputChange);
        inp?.removeEventListener("change", handleInputChange);
        

      }

    }
  }, [])

  React.useEffect(() => {

    if(showingDraft){
      for (const inp of inputRefs.current){

        if(!['file', 'image'].includes(inp.type)){

          switch (inp.type){

            case "checkbox":
              inp.checked = currentState[inp.name] ?? inp.defaultChecked 
              break;

            case "radio":
              inp.checked = inp.value === currentState.radio_inputs?.[`${inp.name}`];
              break;

            default:
              inp.value = currentState[inp.name] ?? ""


          }

        }
        
        inp.disabled = true

      }
    }


  }, [showingDraft])

  return {

    formRef: formRef,
    currentState: currentState,
    showingDraft: showingDraft,
    setCurrentState: setCurrentState,
    deleteDraft: deleteState,
    acceptDraft: () => {inputRefs.current.map((inp) => {inp.disabled = false});acceptDraft();deleteState();},
    discardDraft: () => {inputRefs.current.map((inp) => {if (inp.tagName === 'INPUT' && inp.type !== 'radio') { inp.value=""}else{inp.checked=false};inp.disabled = false});discardDraft();deleteState();setCurrentState({})}

  }

}
