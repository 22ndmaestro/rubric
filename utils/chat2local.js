function addQuiz(subject, topic, questions) {
  let RubicQuiz = JSON.parse(localStorage.getItem('RubicQuiz')); // Get the 'RubicQuiz' array from local storage

  if (!Array.isArray(RubicQuiz)) { // Check if the 'RubicQuiz' array does not exist or is not an array
    RubicQuiz = []; // Create a new empty array
  }

  const id = Date.now();
  const score = [];

  const quiz = { id, subject, topic, questions, score }; // Create a new quiz object

  RubicQuiz.push(quiz); // Add the new quiz object to the 'RubicQuiz' array

  localStorage.setItem('RubicQuiz', JSON.stringify(RubicQuiz)); // Save the updated 'RubicQuiz' array to local storage
  return localStorage.getItem('RubicQuiz');
}
function stringify(string) {
  let count = 1;
  // Remove spaces from keys
  //string = string.replace(/ ([a-z]+) /g, "$1");
  let regex = /(?<={)\s+|\s+(?=:)/g;
  string = string.replace(regex, "");
  // Replace single quotes with double quotes
  string = string.replace(/'/g, "\"");
  // Replace " with \"
  string = string.replace(/"/g, '\\"');
  //Remove all spaces greater than 1:
  string = string.replace(/\s+/g, " ");
  //remove spaces between wrong and option
  string = string.replace(/wrong\s+option/gi, "wrongoption");
  //remove spaces between correct and option
  string = string.replace(/correct\s+answer/gi, "correctanswer");

  // Replace { with "{ and } with }"
  string = string.replace(/{/g, '{"');
  string = string.replace(/}/g, '"}');

  // Replace : with ": and , with ","
  string = string.replace(/:/g, '":"');
  string = string.replace(/,/g, '","');

  // Remove backslashes
  string = string.replace(/\\/g, "");
  // Remove spaces for and after quotation marks:
  string = string.trim().replace(/\s*"\s*/g, '"');
  // Replace duplicate double quotes with one double quote:
  string = string.replace(/""/g, '"');
  string = string.replace(/"\{/g, "{").replace(/\}"/g, "}");

  // use replace method to insert '"', ',' and '"' before them
  string = string.replace(/([^,"]*)(correctanswer|wronganswer)/g, (match, p1, p2) => {
    if (p1[p1.length - 1] !== '"' && p1[p1.length - 1] !== ',') {
      return p1 + ',"' + p2 + '"';
    } else {
      return match;
    }
  });

  // Add " at the beginning and end of the string
  string = '"' + string + '"';
  // Rename repeated keys with numbers
  string = string.replace(/(wrongoption)/g, function(match) {
    let newMatch = match + count;
    count = (count % 3) + 1;
    return newMatch;
  });
  return string
}



function processString(str) {
  if (!str.endsWith('}]')) { // Check if the string does not end with '}]'
    const lastBracketIndex = str.lastIndexOf('}'); // Find the index of the last closing bracket

    if (lastBracketIndex !== -1) { // Check if a closing bracket was found
      str = str.slice(0, lastBracketIndex + 1) + ']'; // Remove all characters after the last closing bracket and add a closing square bracket to the end
    }
  }
  console.log(str);
  console.log('before:stringify');
  str = str.replace(/”|'|'|‘|‘|”|”|’|’|“|“/g, '"');
  str = str.replace(/'/g,'"');
  str = str.replace(/""/g, '"');
  str = str.replace(/",",/g, '","');
  str = str.replace(/""/g, '"');
  str = str.replace(/\s*"\s*/g, '"');
  str = str.replace(/\s*:\s*/g, ':');
  str = str.replace(/\s*,\s*/g, ',');
  str = str.replace(/�/g,'');
  str = str.replace(/(\d)\s*\.\s*(\d)/g, '$1.$2');
  console.log('After:stringify');
  console.log(str);

  return JSON.parse(str); // Convert the processed string to an array and return it
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { addQuiz, processString, shuffleArray }