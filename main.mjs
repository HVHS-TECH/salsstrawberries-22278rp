/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by Ryan Parks, Term 2 2025
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from script module
import { fb_initialise }
    from './script.mjs';
window.fb_initialise = fb_initialise;
import { fb_authenticate }
    from './script.mjs';
window.fb_authenticate = fb_authenticate;
import { fb_WriteRec }
    from './script.mjs';
window.fb_WriteRec = fb_WriteRec;
import { fb_ReadRec }
    from './script.mjs';
window.fb_ReadRec = fb_ReadRec;
import { email_view }
    from './script.mjs';
window.email_view = email_view;

/**************************************************************/
// index.html main code
/**************************************************************/

/**************************************************************/
//   END OF CODE
/**************************************************************/

