/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
   */
function isAllTrue(array, fn) {
  if (!(array instanceof Array) || array.length === 0) {
    throw new Error('empty array');
  } else if (!(fn instanceof Function)) {
    throw new Error('fn is not a function');
  }

  for (const i of array) {
    if (fn(i) === false) {
      return false;
    }
  }
  return true;
}
// try {
//   isAllTrue([1, 2, 3, 4, 5], n => n < 10)
//   isAllTrue([100, 2, 3, 4, 5], n => n < 10)
// } catch (er) {
//   console.log(er.message)
// }
/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
  if (!(array instanceof Array) || array.length === 0) {
    throw new Error('empty array');
  } else if (!(fn instanceof Function)) {
    throw new Error('fn is not a function');
  }

  for (const i of array) {
    if (fn(i) === true) {
      return true;
    }
  }
  return false;
}
// try {
//   isSomeTrue([1, 2, 30, 4, 5], n => n > 20)
//   isSomeTrue([1, 2, 3, 4, 5], n => n > 20)
// } catch (er) {
//   console.log(er.message)
// }
/*
 Задание 3:

 3.1: Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */

////* 1 вариант решения =>
// function returnBadArguments(fn, ...args) {
//   const array = [];

//   for (const item of args) {
//     try {
//       if (!(fn instanceof Function)) {
//         throw new Error("fn is not a function")
//       }
//       fn(item)
//     } catch (er) {
//       console.log(er.message)
//       array.push(...item)
//     }
//   }

//   return array;
// }
// returnBadArguments(n => n > 20, [1, 2, 3, 30, 4, 5]) // вернёт []
// returnBadArguments(n => n > 20, [1, 2, 3, 30, 4, 5]) // вернёт fn is not a function  и  массив (6) [1, 2, 3, 30, 4, 5]  в консоль

//// 2 вариант решения, и по сути, правильный вариант решения, но до конца мне не ясный.
//// Тестировщик на него не выдаёт ошибок.
function returnBadArguments(fn, ...args) {
  const array = [];
  if (!(fn instanceof Function)) {
    throw new Error('fn is not a function');
  }

  for (const item of args) {
    try {
      fn(item);
    } catch (er) {
      array.push(item);
    }
  }

  return array;
}
// try {
//   returnBadArguments(n => n > 20, [1, 2, 3, 30, 4, 5])
// } catch (er) {
//   console.log(er.message)
// }                                        // спокойно вернет в консоли fn is not a function

// returnBadArguments(n => n > 20, [1, 2, 3, 30, 4, 5]) // вернёт []
// returnBadArguments(20, [1, 2, 3, 30, 4, 5]) // вернёт Uncaught Error: fn is not a function

////////////////////////////////////////////////////////////////////

//// 3 вариант решения =>
// function returnBadArguments(fn, ...args) {
//   const array = [];

//   for (const item of args) {
//     try {
//       if (!(fn instanceof Function)) {
//         throw new Error("fn is not a function")
//       }
//       fn(item)
//     } catch (er) {
//       array.push(item)
//     }
//   }

//   return array;
// }
// returnBadArguments(n => n > 20, [1, 2, 3, 30, 4, 5]) // вернёт []
// returnBadArguments(20, [1, 2, 3, 30, 4, 5]) // вернёт [Array(6)]
/*
Задание 4:
 
4.1: Функция имеет параметр number (по умолчанию - 0)

4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

Количество передаваемых в методы аргументов заранее неизвестно

4.3: Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
*/
function calculator(number = 0) {
  if (typeof number !== 'number') {
    throw new Error('number is not a number');
  }

  return {
    sum(...args) {
      for (const arg of args) {
        return (number += arg);
      }
    },
    dif(...args) {
      for (const arg of args) {
        return (number -= arg);
      }
    },
    div(...args) {
      for (const arg of args) {
        if (arg === 0) {
          throw new Error('division by 0');
        }
        return (number /= arg);
      }
    },
    mul(...args) {
      for (const arg of args) {
        return (number *= arg);
      }
    },
  };
}

// try {
//   calculator(2).sum(2)
// } catch (er) {
//   console.log(er.message)
// }

/* При решении задач, постарайтесь использовать отладчик */

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };
