
let tgtower1 = document.querySelector('.tower-1'),
tgtower2 = document.querySelector('.tower-2'),
tgtower3 = document.querySelector('.tower-3'),
holding = null,
tgblockCount = 7,
moves = 0;

const towerGame = {
    init: (e) => {
        tgtower1.innerHTML = "";
        tgtower2.innerHTML = "";
        tgtower3.innerHTML = "";
        holding = null;
        towerGame.countMove(0);
        for (let i = 1; i <= tgblockCount; i++) {
            const li = document.createElement('li');
            li.setAttribute('class', `disk disk-${i}`);
            li.setAttribute('data-value', i);
            tgtower1.prepend(li);
        }
        if(e !== 'reset') {
            towerGame.controls();
        }
    },
    controls: () => {
        let tower = document.querySelectorAll('.tower');
        Array.from(tower).forEach(function(e) {
            e.addEventListener('click', () => towerGame.blockMove(e));
        });
    },
    countMove: (e) => {
        e == 0 ? moves= 0 : moves++;
        document.querySelector('.moves').innerHTML = moves;

        let losestart = document.querySelector('.lose-start'),
        stars1 = document.querySelector('.star-1'),
        stars2 = document.querySelector('.star-2'),
        stars3 = document.querySelector('.star-3');
        
        if(moves > 126) {
            losestart.innerHTML = 'Congratulations! You Won!';
        }
        if(moves > 150) {
            losestart.innerHTML = 'You lose the 1 Star';
            stars3.classList.add('none');
        }
        if(moves > 200) {
            losestart.innerHTML = 'You lose the 2 Stars';
            stars2.classList.add('none');
        }
        if(moves > 250) {
            losestart.innerHTML = 'You lose the All Stars';
            stars1.classList.add('none');
        }
        if(e == 0 ) {
            stars1.classList.remove('none');
            stars2.classList.remove('none');
            stars3.classList.remove('none');
            losestart.innerHTML = '';
        }
    },
    blockMove: (e) => {
        let topBLock = e.lastElementChild,
        topBLockValue = topBLock && topBLock.getAttribute('data-value'),
        holdingBlock = document.querySelector('.hold');

        if(holdingBlock !== null) {
            if(topBLockValue === holding) {
            topBLock.classList.remove('hold');
            } else if(topBLockValue == null ||topBLockValue > holding) {
            holdingBlock.remove();
            const createli = document.createElement('li');
            createli.setAttribute('class', `disk disk-${holding}`);
            createli.setAttribute('data-value', holding);
            e.appendChild(createli);
            towerGame.countMove();
            if((e.classList.contains('tower-2') || e.classList.contains('tower-3')) && e.childElementCount == tgblockCount) {
                towerGame.winner(e);
            }
            }
        } else if(topBLock !== null) {
            topBLock.classList.add('hold');
            holding = topBLockValue;
        }
    },
    reset: () => {
        towerGame.init('reset');
    },
        winner: (e) => {
        console.log('you win!!');
    }
}

window.addEventListener('DOMContentLoaded', function(e) {
    towerGame.init(tgtower1);
    document.querySelector('.reset').addEventListener('click', () => towerGame.reset());
});
