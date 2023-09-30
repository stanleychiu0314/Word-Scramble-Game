let words = [
'Product', 
'Consumer',
'Enemy',
'Ocean',
'Lake',
'Forest',
'Animal',
'Elephant',
'paper',
'special',
'space',
'ground',
'form',
'support',
'cup',
'provide',
'service',
'around',
'friend',
'important',
'father',
'meeting',
'determine',
'prepare',
'disease',
'rational',
'kingdom',
'aisle',
'weaken',
'protocol',
'exclusively',
'vocal',
'marketplace',
'skilled',
'managing',
'marine',
'dock',
'organized',
'fog',
'diplomat',
'capable',
'nervous',
'tourist',
'toss',
'crucial',
'bury',
'pray',
'tomato',
'exception',
'butter',
'deficit',
'bathroom',
'objective',
'wise',
'actress',
'summit',
'acid',
'odds',
'gifted',
'frustration',
'medium',
'physically',
'distinguish',
'execution',
'terrific',
'whale',
'functional',
'instinct',
'teammate',
'aluminum',
'keyboard',
'retired',
'trigger',
'spill',
'grateful',
'grace',
'virtual',
'colony',
'adoption',
'infection',
'cabinet',
'broken',
'apple',
'electric',
'proceed',
'devastating',
'depart',
'arrow',
'trauma',
'neighbour',
'soak',
'ribbon',
'world',
'Between',
'school',
'prisoner',
'fellow',
'smooth',
'nearby',
'peer'
]

const dicAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const wordPair = []; //declared a variable that stores paired value of words and hints from API 


//variable index is declared to loop through the 100 pre defined words stored locally in the js file
let index = 0; 

const getAPI = async () => {
    try {
        const oriWord = words[index];
        index++;
        const response2 = await fetch(dicAPI + oriWord);
        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }
        const dic = await response2.json();
        const hint = dic[0].meanings[0].definitions[0].definition; //receive definition based on the branch declared in the API

        return { word: oriWord, hint: hint }; //return set of word and hint into wordPair. Named first item word, second hint for easier access in order js file
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const callGetAPI = async () => {
    const promises = [];
    for (let i = 0; i < 75; i++) {
        promises.push(getAPI());
    }

    try {
        const wordPairs = await Promise.all(promises);
        wordPair.push(...wordPairs); //after all items are pushed into wordPairs variable, then it gets pushed onto our local variable
        console.log(wordPair);
        
    } catch (error) {
        console.error('Error:', error);
    }

    //this line is here to make sure that the timer and program doesn't start until the data from the API is done loading
    const event = new Event('dataLoaded'); //create a new event to signal that the callGetAPI is all done, program can proceed with rest of the code
    document.dispatchEvent(event);
};

callGetAPI();










