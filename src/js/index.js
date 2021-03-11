import {Observable, range, from} from "rxjs";
import { map, filter } from "rxjs/operators";

// -----------------------------------------------------------------------------------------
// 1. Sposoby implementowania asynchronicznosci w aplikacjach JS
// -----------------------------------------------------------------------------------------

// a. callbacks - stare podejscie, ktore wprowadza nieporzadek w kodzie szczegolnie kiedy
//    masz duzo callback-ow wywolywanych w innych callback-ach --> CALLBACK HELL

/*
function wowAction() {
    console.log('WOW!');
}

function info(name, surname, callback) {
    console.log(`HELLO ${name} ${surname}`);
    callback();
}

info('K', 'M', wowAction);
*/

// b. Promises - wprowadzone w JS ES6 daja mozliwosc implementowania bardziej czytelnej
//    struktury kodu asynchronicznego w porownaniu do callbacks, zwraca specjalny obiekt
//    ktory posiada metody pozwalajace przetwarzac otrzymane asynchronicznie dane
//    Obiekt Promise moze przebywac w trzech stanach:
//    pending    - stan poczatkowy Promise zanim zacznie byc przetwarzany
//    fulfilled  - stan oznaczajacy koniec przetwarzania Promise
//    rejected   - stan oznaczajacy pojawienie sie bledow podczas przetwarzania Promise

/*
const p1 = Promise.resolve('THIS IS MESSAGE');
p1
    .then(data => console.log(data))
    .catch(err => console.error(err));
*/

// c. async / await - skladnia ktora jeszcze bardziej upraszcza zarzadzanie i przetwarzanie
//    Promise, pozwala wprowadzac funkcje asynchroniczne, w ktorych ciele mozesz umieszczac
//    slowo kluczowe await przed wyrazeniem zwracajacym Promise. To powoduje ze funkcja wstrzymuje
//    dzialanie w tym miejscu dopoki Promise sie nie przetworzy i zwroci danych, ktore dzieki await
//    sa wyluskiwane i przypisywane do obiektu po lewej stronie operatora =
//    Na koniec funkcja asynchroniczna sama w sobie zwraca Promise ktory mozna dalej przetwarzac
//    asynchronicznie

/*
function doAction(number)  {
    return Promise.resolve(`ACTION NO. ${number}`);
}

async function runTasks() {
    const res1 = await doAction(1).catch(err => console.error(err));
    console.log('1: ' + res1);
    const res2 = await doAction(2);
    console.log('2: ' + res2);
    const res3 = await doAction(3);
    console.log('3: ' + res3);
    return [res1, res2, res3].join(', ');
}

runTasks()
    .then(data => console.log(data))
    .catch(err => console.log(err));
*/

// d. RxJS Observables - kolejny sposob realizowania asynchronicznosci, pochodzacy z biblioteki
//    RxJS

//    Observable mozne znajdowac sie w 4 stanach:
//    Creation      - tworzenie Observable za pomoca jednej z wielu funkcji z biblioteki RxJS
//    Subscription  - 'podpiecie sie' pod dane emitowane przez Observable
//    Execution     - przetwarzanie danych w sposob asynchroniczny
//    Destruction   - w momencie zakonczenia przetwarzania lub bledu przetwarzania nastepuje
//                    'unsubscribe' ktore czasami wykonuje sie automatycznie a czasami trzeba
//                    wykonac je recznie - w trakcie unsubscribe nastepuje zwolnienie zajmowanych
//                    zasobow  i anulowanie operacji zwiazanych z przetwarzaniem danych z Observable

// Zeby uzywac rxjs w aplikacji JavaScript musisz zainstalowac:
// >> npm install rxjs

// Nastepnie przetestuj dzialanie rxjs

/*

let subscription = range(1, 10)
    .pipe(
        filter(x => x % 2 === 1),
        map(x => 2 * x)
    )
    .subscribe(x => console.log(x));

setTimeout(() => subscription.unsubscribe(), 3000);
*/

// -----------------------------------------------------------------------------------------
// 2. Promises vs Observables
// -----------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Observables -> LAZY
// Promise    ->  EAGER
// ------------------------------------------------------------------------------------------

/*const p11 = new Promise(resolve => {
    // Ten kod zostanie wywolany natychmiast kiedy tylko utworzysz Promise
    console.log('IN PROMISE 1')
    resolve('PROMISE 1 RESULT');
});
console.log('BEFORE CALLING PROMISE 1');
p11.then(console.log);*/

/*
const o11$ = new Observable(observer => {
    // Nothing happens without subscribe
    console.log('IN OBSERVABLE 1');
    observer.next('OBSERVABLE 1 RESULT');
    observer.complete();
});
console.log('BEFORE CALLING OBSERVABLE 1');
o11$.subscribe(console.log);
*/

// Zawsze mozesz przjesc  z Observable na Promise i w druga strone

/*
const fromObservable = o11$.toPromise();
fromObservable.then(console.log);

const fromPromise = from(Promise.resolve('XXX'));
fromPromise.subscribe(console.log);
*/

// ------------------------------------------------------------------------------------------
// Observables -> moze byc async lub sync
// Promise    ->  zawsze async
// ------------------------------------------------------------------------------------------
/*
const o21$ = new Observable(observer => {
    console.log('IN OBSERVABLE2');

    // Wersja asynchroniczna
    // setTimeout(() => {
    //     observer.next('O2');
    //     observer.complete();
    // }, 2000);

    // Wersja synchroniczna
    // observer.next('O2');
    // observer.complete();
});

console.log('BEFORE CALLING OBSERVABLE 2');
o21$.subscribe(console.log);
console.log('AFTER CALLING OBSERVABLE 2');
*/

// ------------------------------------------------------------------------------------------
// Observables -> moze przetworzyc zero, jedna lub wiecej wartosci
// Promise    ->  moze przetworzyc tylko jedna wartosc
// ------------------------------------------------------------------------------------------
/*
const p33 = new Promise(resolve => {
    resolve('P33.1');
    resolve('P33.2');
});
p33.then(console.log);
*/

/*
const o33$ = new Observable(observer => {
    observer.next('O33.1');
    observer.next('O33.2');
    observer.next('O33.3');
    observer.next('O33.4');
    observer.complete();
})
o33$.subscribe(console.log);
*/

// ------------------------------------------------------------------------------------------
// Observable -> ma przeogromna ilosc operatorow, ktore pozwalaja przetwarzac Observable
// Mozliwosc przetwarzania strumieniowego
// ------------------------------------------------------------------------------------------

// Observable moze to co Promise i znacznie wiecej.
