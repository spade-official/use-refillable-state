
<h1 align="center">Welcome to use-refillable-state Documentation 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/use-refillable-state" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/use-refillable-state.svg">
  </a>
  <a href="https://standardjs.com" target="_blank">
    <img alt="Code Standard" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: Spade Community" src="https://img.shields.io/badge/License-Spade Community-yellow.svg" />
  </a>
  <a href="https://twitter.com/spade_community" target="_blank">
    <img alt="Twitter: spade_community" src="https://img.shields.io/twitter/follow/spade_community.svg?style=social" />
  </a>
</p>

> html for save and retrieve back when re-visit

## Install

```sh
npm i use-refillable-state
```

### Live Playable Demo
[Launch on CodeSandBox](https://codesandbox.io/embed/use-refillable-state-demo-7bdij3?fontsize=14&hidenavigation=1&theme=dark)
## Usage

```jsx
...
import useRefillableState from 'use-refillable-state'

function MyCustomForm() {
  
  const { currentState, setCurrentState, acceptDraft, discardDraft, showingDraft, saveState } = useRefillableState({username: '',
                                                                                                                    user_agree_tnc: false,
                                                                                                                    ...})
  
   const handleFormSubmit = (e) => {
   
    e.preventDefault(); // Prevents from redirecting page
    discardDraft(); // In this case it deletes Saved Draft bcz now we dont need this because user filled this form and submitted now!
   
   }
  
  return (
  
    <form onSubmit={handleFormSubmit}>
    
      <input
        onBlur={saveState}
        type="text"
        placeholder="Username"
        value={currentState.username}
        onChange={(e) => { setCurrentState({...currentState, username: e.target.value}) }} 
       />
    
       <label for="agreetnc">Agree Terms & Conditions?</label> 
       <input 
         name="agreetnc"
         id="agreetnc"
         type="checkbox"
         value={currentState.username}
         onChange={(e) => { setCurrentState({...currentState, username: e.target.value}) }}
       />
        
        {
        //Other bunch of inputs in this form continues...
        }
            
 
            
       <button type="submit">Submit</button>
    
    </form>
  
  )

  
}

export default MyCustomForm;

```

## Author

👤 **Spade Dev(s)**

* Website: www.spadebeta.in
* Twitter: [@spade\_community](https://twitter.com/spade\_community)
* Github: [@spade-official](https://github.com/spade-official)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_


## License

MIT © [spade-official](https://github.com/spade-official)
