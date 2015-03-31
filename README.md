# mNotes
### What is it ?
mNotes is a minimal isomorphic library. You input a note, mNotes outputs the frequency as a number. Multiple input formats are allowed. Nine octaves, from 0 to 9.
### How can I use it ?
#### Client-side
    mNotes.get('D4#') // returns 311.13
#### Server-side
Install it using NPM : `npm install mnotes`

    var mNotes = require('mNotes');
    mNotes.get('D4#') // returns 311.13
#### Input formats
    mNotes.get('D4#') // It can be one string
    mNotes.get('d', 4, '#') // Or three arguments, capitals are optional
    mNotes.get('4d#') // The ordering of the two first arguments (note and octave) is your choice
    mNotes.get(4, 'd') // If your note has no intonation you can ommit it
    mNotes.get('d4n') // You can also signify that there is no intonation with 'n'
    //Sharps are either '#' or 'S', for flats it's 'b' or 'F', case-insensitive
### Why would I use it ?
I built it to ease the process of music composition on [code-music-studio](https://github.com/substack/code-music-studio "code-music-studio"). Use it as you wish (while respecting the license).
### What is the license ?
GPLv3