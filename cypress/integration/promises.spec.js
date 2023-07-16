it('sem testes ainda', function() {})

/* const getSomething = callback => {
setTimeout(() => {
   console.log('respondendo')
   callback(11);
}, 1000);
} */

const getSomething = () => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
       console.log('respondendo')
       resolve(11);
    }, 1000)
    })}

const system = () => {
    console.log('init')
    const prom = getSomething();
    prom.then(some => {
        console.log(`something is ${some}`)  
        console.log('end')});
   
}

system();