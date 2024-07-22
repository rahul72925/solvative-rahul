// for (var i = 0; i < 10; i++) {
//   switch (i) {
//     case 0:
//     case 1:
//       i++;
//       break;
//     case 3:
//       i = i + 2;
//       break;
//   }
// }

// 10 times, skip 1+1+1

// 7 times
// 9

// Q1: Will case 0 be executed or not?
// Q2: How many times this for loop will be executed?
// Q3: What will be the value of i after for loop?

//

// canPlantFlowers([1, 0, 0, 1, 1], 1)

function canPlantFlowers(arr, k) {
  const lent = arr.length;
  for (let i = 0; i < lent; i++) {
    if (arr[i] == 1) {
      i++;
    } else {
      if (i == 0 && arr[i + 1] == 0) {
        k--;
        i++;
      } else if (arr[i - 1] == 0 && arr[i + 1] == 0) {
        k--;
        i++;
      } else if (arr[i - 1] == 0 && i == lent - 1) {
        k--;
        i++;
      }
    }
  }
  console.log(k == 0);
}

// console.log(plant([0, 0, 0, 0, 0], 3));

canPlantFlowers([1, 0, 0, 0, 1], 1);
// true
canPlantFlowers([0, 0, 0, 0, 0], 3);
// true
canPlantFlowers([1, 0, 1, 0, 1], 1);
// false
// f(n) = f(n-1) == 0 && f(n + 1) == 0
/*
t=0 p=0 f=1 -> p=2

t=1 p=2 f=0 -> plant here   -> 1-1  = 0 -> p = 4  [1,0,1,0,1] return true 

t=3 p=4 f=1 -> no plant

t=4 no further iteration k > 0

return false

*/

// Kamal Joshi
// 16:55
// false
// canPlantFlowers([1, 0, 0, 0, 1], 1)
// true
// canPlantFlowers([0, 0, 0, 0, 0], 3)
// true
// canPlantFlowers([1, 0, 1, 0, 1], 1)
// false
