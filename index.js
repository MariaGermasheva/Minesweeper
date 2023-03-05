startGame(16, 16, 40);

function startGame(width, height, bombsCount) {
    const field = document.querySelector('.field');
    const face = document.querySelector('.face_status');
    const cellsCount = width * height;

    field.innerHTML = '<button></button>'.repeat(cellsCount);
    const cells = [...field.children];

    let closedCount = cellsCount;

    const bombs = [...Array(cellsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombsCount);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== "BUTTON") {
            return;
        }

        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);
        open(row, column);
    });

    function showBombs() {
        bombs.forEach(bomb => {
            bomb.style.backgroundPosition = '-85px -51px';
        });
    }



    field.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (event.target.tagName !== "BUTTON") {
            return;
        }

        const index = cells.indexOf(event.target);
        const checkbox = cells[index];
        checkbox.style.backgroundPosition = "-34px -51px";
        checkbox.disabled = true;

        
        field.addEventListener('contextmenu', (event) => {
            if (event.target == checkbox) {
                event.target.style.backgroundPosition = "-51px -51px";
            }
            const questionMark = checkbox;

            field.addEventListener('contextmenu', (event) => {
                if (event.target == questionMark) {
                    event.target.style.backgroundPosition = "-0px -51px";
                }
                questionMark.disabled = false;
            });
        });
    });


    field.addEventListener('mousedown', () => {
        face.style.backgroundPosition = "-54px -24px";
        field.addEventListener('mouseout', () => {
            face.style.backgroundPosition = "";
        });
        field.addEventListener('mouseup', () => {
            face.style.backgroundPosition = "";
        });
    });


    function isValid(row, column) {
        return row >= 0 && row < height && column >=0 && column < width;
    }

    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, column + x)) {
                    count++;
                }
            }
        }
        return count;
    }

    function open(row, column) {
        if (!isValid(row, column)) return;

        face.addEventListener('mousedown', () => {
            face.style.backgroundPosition = '-27px -24px';
        });

        face.addEventListener('mouseup', () => {
            startGame(16, 16, 40);
            face.style.backgroundPosition = '';
        });

        const index = row * width + column;
        const cell = cells[index];

        if (cell.disabled === true) return;

        cell.disabled = true; 
        
        function disableAllCells() {
            cells.forEach(cell => {
                cell.disabled = true;
            });
        }

        
        if (isBomb(row, column)) {
            cell.style.backgroundPosition = '-102px -51px';
            face.style.backgroundPosition = '-108px -24px';
            disableAllCells();

            // остановить таймер и карта бомб
            return;
        }

        closedCount--;
        if (closedCount <= bombsCount) {
            disableAllCells();
            face.style.backgroundPosition = '-81px -24px';
            return;
        }

        const count = getCount(row, column);

        if (count == 1) {
            cell.style.backgroundPosition = '-0px -68px';
            return;
        } if (count == 2) {
            cell.style.backgroundPosition = '-17px -68px';
            return;
        } if (count == 3) {
            cell.style.backgroundPosition = '-34px -68px';
            return;
        } if (count == 4) {
            cell.style.backgroundPosition = '-51px -68px';
            return;
        } if (count == 5) {
            cell.style.backgroundPosition = '-68px -68px';
            return;
        } if (count == 6) {
            cell.style.backgroundPosition = '-85px -68px';
            return;
        } if (count == 7) {
            cell.style.backgroundPosition = '-102px -68px';
            return;
        } if (count == 8) {
            cell.style.backgroundPosition = '-119px -68px';
            return;
        } 
            
        for (let x = -1; x < 1; x++) {
            for (let y = -1; y < 1; y++) {
                open((row + y), (column + x));
            }
        }
    }

    function isBomb(row, column) {
        if (!isValid(row, column)) {
            return false;
        }
        const index = row * width + column;

        return bombs.includes(index);
    }



    // таймер

    

}