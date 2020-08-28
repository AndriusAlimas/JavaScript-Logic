// Question 1: Clean the room function: given an input of 
// [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that 
// organizes these into individual array that is ordered. 
// For example answer(ArrayFromAbove) should return: 
// [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
// Bonus: Make it so it organizes strings differently from number types. 
// i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
const array = [1,"2","1","1",4,591,392,391,2,5,"10",2,1,1,1,"20",20,591,5,5,5];

let answer = [];

// sort array to ascending order 
const sortArray = arr =>{
    arr.sort((a,b) =>{
        return a- b;
    });
  }

  // check duplicates
const checkDuplicates = (currentItem) => newString.includes(currentItem + " " + currentItem);

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

const convertToNum = (arrayOfString) =>{
  let result =[];
  for(item of arrayOfString){
    item = parseInt(item);
   result.push(item);
  }
  return result;
  
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

//  convert array to a string, using regex eliminate commas:
let newString = myArray.toString().replace(/\,/g,' ');

    let temp = []; // this variable is temporally array where it holds duplicates items
 
    for(let i = 0; i < myArray.length;i++){
      let currentItem = myArray[i];
      let index = 0; // this index variable its for if we already check item with that index we can skip going again
      // check duplicates:
      if(checkDuplicates(currentItem)){
        
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

// Question 2: Write a javascript function that takes an array of numbers and a target
// number.The function should find two different numbers in the array that, 
// when added together, give the target number. For example: answer([1,2,3], 4)
// should return [1,3]

// 1:
console.log("************** -2- ****************");
myArray = [1,2,3];
let target = 4;
console.log("Original array:", myArray);
console.log("Target:", target);

const targetSumArray = (array, target) =>{
  
  sortArray(myArray);
  
  for(let i =array.length -1; i > 0; i--){
    let result = 0;
    let current = array[i];
    let next = array[i-1];
    console.log(current);
    console.log(next);
   if(array[i] > target){
     continue;
   }else{
     result = current + next;
     console.log("result", result);
     if(result < 0){
        
     }
   }
  }
  return result;
}
answer = targetSumArray(myArray,target);
console.log(answer);
// Question 3: Write a function that converts HEX to RGB. Then Make that function 
// auto-dect the formats so that if you enter HEX color format it returns RGB 
// and if you enter RGB color format it returns HEX.