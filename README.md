
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

> Take a Snapshot of a form, for better UX. 

<br/>

### Introduction
A client filling up the form on your site, Left that window/tab for xyz reasons. When client re-opens that page, Seeing their half filled form is fully empty now. This workflow is normal but we can optimize this. To make better UX! 

So, actually instead of client re-enters the past filled information, What if we,
- Store that past half-filled form for specific user and store it!
- Next time user came back to same page, we reteieve that stored form and suggest to accept his/her past filled field values.

Looks interesting? Let's move to the workflow.

<br/>

### Workflow
So the idea is to take a snapshot of form whenever user fill it, No matter if its fully filled or not. Its looks like we are having track of their changes just like google form. but google form uses cloud storage option. However, Not all of the application use that approach.

> Google Form doesn't store progress if user is offline

To make this functionality available in offline mode, we are previously using localStorage API to store the form. 
But now in newer versions (>2.0.0) we are using IndexedDB API as it can also supports Blob storage which is perfect for image/file uploads storage.

<br/>

### Implementation
There are currently two packages for this implementation.
- VanillaJS version (pure/native support)
- ReactJS Specific

In past version we have introduced `useRefillableState` hook, and you have to manually assign `value`, `onChange`, `onBlur` property to each of the input elements. Which is kind of headache for developers. We've also got feedback about this painfull experience.

So, From version(V 2.0.0), it comes with a new powerfull, intelligent custom hook, `useRefillableForm`. Now you just need to add `ref` attribute to your form and it auto detects all of the nested `input` tags itself and assigns curresponding eventListeners to them. to take actions accordingly!

* Enough talking, now code part!!

## Install

```sh
npm i refillable
```

## Usage

```jsx
...
import { useRefillableForm } from "refillable";

const MyApp = () => {

  const { formRef } = useRefillableForm(configs);
  // configs = {threshold?: 50, unique_key?: 'sign_up'}
  // Provoding config is completely optional
  // threshold is amount in percentage. Only if form is (threshold)% filled, then only save it! (defaults to 50)

  return (
    <form ref={formRef}>
    
      <input type="text" placeholder="Username" name="username" />
      
      <div className="ui__needed_container">
      
        <a>Terms & Conditions</a>
        
        <div>
          <input type="checkbox" name="is_adult" />
        </div>
        
       </div>
      
    </form>
  )

}
```



### Note
* If you are using `useRefillableState` hook more than once per page (not component), You must assign `unique_key` value to differenciate multiple hooks on same page.
* This is because it uses current page url as unique identifier to store data and for retrieving also, so it won't collide

## Author

👤 **Spade Dev(s)**

* Website: www.spadebeta.in
* Twitter: [@spade_community](https://twitter.com/spade_community)
* Github: [@spade-official](https://github.com/spade-official)

## Show your support

Give a ⭐️ if this project helped you!

***


## License

MIT © [spade-official](https://github.com/spade-official)
