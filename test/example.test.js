// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderParticipant } from '../events/render-utils.js';
const test = QUnit.test;

test('time to test a function', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div class="participant"><p>carolynn : undefined</p></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderParticipant({ name: 'carolynn' }).outerHTML;

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});
