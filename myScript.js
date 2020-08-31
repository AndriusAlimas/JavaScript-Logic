/* Question 1: Clean the room function: given an input of 
[1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that 
organizes these into individual array that is ordered. 
For example answer(ArrayFromAbove) should return: 
[[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
Bonus: Make it so it organizes strings differently from number types. 
i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

 Question 2: Write a javascript function that takes an array of numbers and a target
number.The function should find two different numbers in the array that, 
when added together, give the target number. For example: answer([1,2,3], 4)
should return [1,3]

 Question 3: Write a function that converts HEX to RGB. Then Make that function 
auto-dect the formats so that if you enter HEX color format it returns RGB 
and if you enter RGB color format it returns HEX.
*/

// result variable for solution 3: 
let colorOutput = document.getElementById("colorOutput");

// given array for solution 1:
const array = [1,"2","1","1",4,591,392,391,2,5,"10",2,1,1,1,"20",20,591,5,5,5];

let answer = [];

// FUNCTIONS:
// sort array to ascending order 
const sortArray = arr =>{
    arr.sort((a,b) =>{
        return a- b;
    });
  }

  // check duplicates
const checkDuplicates = (currentItem, newString) => newString.includes(currentItem + " " + currentItem);

// organizes strings differently from number types.
const organize = (array, isNumArray) =>{
  let numArray = []; let stringArray = [];

  for(item of array){
     if(typeof item == 'number'){
       numArray.push(item);
     }else if(typeof item =='string'){
       stringArray.push(item);
     }
  }
  if(isNumArray){
    return numArray;
  }
  return stringArray;
}

// convert array of string to array of numbers
const convertToNum = (arrayOfString) =>{
  let result =[];
  for(item of arrayOfString){
    item = parseInt(item);
   result.push(item);
  }
  return result;
}

/* this function takes array and target as arguments. 
Find two  different numbers in the array that, when 
added together, give the target number. Solution 2 */
const targetSumArray = (array, target) =>{

  // first we sort array by natural order
  sortArray(myArray);
  
  let answer = [];
  let lowIndex = 0;
  let highIndex = array.length - 1;
  
  while(lowIndex < highIndex){
    let sum = array[lowIndex] + array[highIndex]; // we add first(smallest) and last item(highest)
    if(sum > target){ 
      highIndex--;
    }else if(sum < target){
      lowIndex++;
    }else{
      answer.push(array[lowIndex]);
      answer.push(array[highIndex]);
      return answer;
    }
  }
}

// function that receive from input field color and process by its format
const receiveColor = (input) =>{
  // Messages that can print to screen if something happen:
  const message_hex_wrong = `<h3 style="color:red">It has to be right format like this
   #RRGGBB<ol>
   <li>RR- represent red color</li>
   <li>GG- represent green color</li>
   <li>BB - represent blue color</li>
   </ol>
   </h3>`

   const message_hex_low = `<h3 style="color:red">In hex format, not less 
   than 6 characters after #</h3>`;

   const message_hex_value = `<h3 style="color:red">Hex code 
   byte values range from 00, which is the lowest intensity
    of a color, to FF which represents the highest intensity. One value must be from 0-9 or A-F </h3>`;

   const message_rgb_wrong = `<h3 style="color:red">When using rgb, make sure its right format:
   <ol>
   <li>Starts with rgb</li>
   <li>Format rgb(red, green, blue)</li>
   <li>red, green, blue = values from 0 to 255, no letters or other simbols</li>
   </ol></h3>`; 

   const resultMessage = `<h2 style="padding:100px 25px; 
   border: 3px solid blue; width:50%;
   text-align:center">`;

   input = input.trim(); // erase all white space

  // if hex format
  if(input.length > 0 && input[0] ==="#"){
    if(input.length > 7){
      colorOutput.innerHTML = message_hex_wrong;
    }else if(input.length === 7){
       if(checkHexValues(input)){// check hex value if its in right format
        let result = convertToRgb(input); // call function to convert this hex input to rgb format
        colorOutput.innerHTML = `${resultMessage} ${result}</h2>`;
      } else{
        colorOutput.innerHTML = message_hex_value;
      }
        
    }else{
      colorOutput.innerHTML = message_hex_low;
    }
    // if rgb format
  }else if(input[0].toLowerCase() === "r"){
    let result = checkRgbValues(input) // check rgb values to start with rgb in right format
     if(result){ 
         result = convertToHex(result);
         colorOutput.innerHTML = `${resultMessage} ${result}</h2>`;;
     }else{
      colorOutput.innerHTML = message_rgb_wrong;
     }
  }else{
    alert("Please insert rgb color format starts with rgb or hex color format starts with #");
  }
}

// function check if its valid format of hex color
const checkHexValues = (input) =>{
  input = input.toLowerCase(); // make all lower case letters

  const isHexCorrect = /^#[0-9a-f]{6}$/i.test(input);
 
  if(isHexCorrect){
    return true;
  }else{
    return false;
  }
}

// function simply converts from hex to correct decimal value to form rgb color
const convertToRgb = input => {
  let hex = "0x";
  let red = hex + input[1] + input[2];
  let green = hex + input[3] + input[4];
  let blue = hex + input[5] + input[6];
 
  red = parseInt(red);
  green = parseInt(green);
  blue = parseInt(blue);
  
  return `rgb(${red}, ${green}, ${blue})`;
}

// function check if its valid format of rgb color
const checkRgbValues = input =>{
  let values = [];
  input = input.toLowerCase(); // make all lower case letters
  // check rgb() is included
    if(input.includes("rgb(") && input.slice(-1) == ")" ){
      input = input.replace("rgb(","");
      input = input.replace(")","");
      input = input.split(",");
      for(number of input){
        number = parseInt(number);
        if(number > 255 || number < 0 || Object.is(number, NaN)){
            return false;
        }else{
          values.push(number);
        }
      }
    }else{
      return false;
    }

  return values;
}

// function simply converts from rgb decimal to correct hex value to form hex color
const convertToHex = input =>{
  let result =[];
  for(number of input){
   number = number.toString(16);
   result.push(number);
  }
  result = "#" + result.toString().replace(/\s*,\s*|\s+,/g,"");
  result = result.replace("0","00");
  return result;
}

// function for solution 1 , organizes these into individual array that is ordered. 
const organizeDuplicates = myArray =>{
  //  convert array to a string, using regex eliminate commas:
  let newString = myArray.toString().replace(/\,/g,' ');
  let temp = []; // this variable is temporally array where it holds duplicates items

  for(let i = 0; i < myArray.length;i++){
    let currentItem = myArray[i];
    let index = 0; // this index variable its for if we already check item with that index we can skip going again
    // check duplicates:
    if(checkDuplicates(currentItem,newString)){
      temp.push(currentItem);
      for(let j = 1; j < myArray.length;j++){
        if(myArray[i+j] === currentItem){ // check next item if have same value
          temp.push(currentItem);
          index = i + j; // because it has duplicates and it ends on this index, it no reason to check in loop
          // so in loop we just skip this to this index where we finish
        }else{
          break; // no duplicates no reason check other items
        }
      } // done searching same item
      answer.push(temp);
    
      temp = []; // erase array, for next duplicates
     }else{
       answer.push(currentItem); // single item
       continue; // don't set i to index at this stage
     }
     i = index;
   }
   console.log("answer: " , answer);
}

// 1 :
console.log("************** -1- ****************");
console.log("Original array:",array);
let stringArray = organize(array,false); // organize array split to numbers and string arrays
let numArray = organize(array,true);
let myArray = convertToNum(stringArray); // convert string to number array
myArray = myArray.concat(numArray);
sortArray(myArray);
console.log("Sorted number array: ", myArray);
organizeDuplicates(myArray);

// 1(Bonus):
console.log("************** -1-[bonus] ****************");
myArray = [5, "4", "1", 2,1,100];
console.log("Original array:", myArray);

 // organize array split to numbers and string arrays
stringArray = organize(myArray,false);
numArray = organize(myArray,true);   
console.log("string array:", stringArray);
console.log("num array:", numArray);

myArray = []; // empty original array and start filling
myArray.push(numArray);
myArray.push(stringArray);

// sort these  arrays:
sortArray(numArray);
sortArray(stringArray);
console.log("Answer array:", myArray);

// 2:
console.log("************** -2- ****************");
myArray = [1,2,3];
let target = 5;
console.log("Original array:", myArray);
console.log("Target:", target);
answer = targetSumArray(myArray,target);
console.log(answer);