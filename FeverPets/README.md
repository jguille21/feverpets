# FeverPets

Thanks for taking the time for reviewing my version of FeverPets!
It was a fun project to tackle, and while it didn't presented any major roadblocks it was still interesting to try and put as many Vue features as I could while keeping the code clean and scalable.

## Considerations
First time using vite! Is was fine, specially since adding some extra configuration for the testing was quite easy.
Also, first time using vitest. A bit different than jest in some aspects, but it was fun trying out something new.

Navigation speed could be improved by storing the pets data on the user's browser local storage, and doing pagination and sorting by hand but, since you guys provided an API with pagination and sorting options, I decided to use those instead.

I tried to keep some of Fever's look and feel by using font and colors taken from Fever's web page.

Also, I implemented some logic to make sure images provided by the API have a valid URL, since there's a broken one. I guessed this was on purpose so I included and image file to at least show a placeholder.

Finally... I left a little bug in the application. It's nothing major, and it can't be perceived by the user, but it's there! Find out where it is, or hire me if you can't!

### Unresolved stuff
Couldn't fix an eslint error in the test file for the browser-utils helper in which the global variable is told to not be defined, even if it is since the test is working.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
