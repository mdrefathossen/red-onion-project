import bfast from './bfast';
import dinner from './dinner';
import lunch from './lunch';

const fakeData = [...bfast, ...lunch, ...dinner];


const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(fakeData);

export default fakeData;