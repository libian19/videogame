const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let canvasSize;
let elemSize;

const playerPosition = {
	x: undefined,
	y: undefined,
};
const giftPosition = {
	x: undefined,
	y: undefined,
};
let bombasPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
	canvasSize = Math.min(window.innerHeight, window.innerWidth)*0.75;
	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elemSize = (canvasSize / 10);
	startGame();
}

function startGame() {
	game.font = (elemSize -10) + 'px Verdana';
	game.textAlign = 'center';
	//EN ESTA VARIABLE SE GUARDA EL ELEMENTO STRING
	const map = maps[0];
	//LIMPIA EL STRING DE ESPACIOS Y \n
	const mapRows = map.trim().split('\n');
	bombasPosition = [];
	//LIMPIA TODO EL CANVAS
	game.clearRect(0,0, canvasSize,canvasSize)
	//CONVIERTE CADA FILA EN ELEMENTOS(COLUMNAS) DE UN ARRAY
	const mapRowsCols = mapRows.map(row => row.trim().split(''));
	console.log({map, mapRows, mapRowsCols})

	mapRowsCols.forEach((row, rowI) => {
		row.forEach((col, colI) => {
			const emoji = emojis[col]; //EL VALOR DE COL
			const posX = elemSize * (colI+0.5)
			const posY = elemSize * (rowI+0.5);

			if (col == 'O'){
				if (!playerPosition.x && !playerPosition.y) {
					playerPosition.x = posX / elemSize;
					playerPosition.y = posY / elemSize;
					console.log({playerPosition})
				}
			
			}if (col == 'I'){
				giftPosition.x = posX / elemSize;
				giftPosition.y = posY / elemSize;
			
			}if (col == 'X'){
				const valueX = posX / elemSize;
				const valueY = posY / elemSize
				bombasPosition.push({x: valueX, y: valueY})
			}
			game.fillText(emoji, posX, posY);

		})
	});
	console.log(bombasPosition)
	movePlayer()
}

function movePlayer(){
	const giftColisionX = playerPosition.x == giftPosition.x;
	const giftColisionY = playerPosition.y == giftPosition.y;
	const giftColision = giftColisionX && giftColisionY;
	
	if (giftColision) {
		console.log('Colision')
	}

	const bombaColision = bombasPosition.find(enemy => {
		const enemyColisX = enemy.x == playerPosition.x;
		const enemyColisY = enemy.y == playerPosition.y;
		return enemyColisX && enemyColisY;
	});

	if(bombaColision){
		console.log('Bombassss')
	}

	const playerPosX = Math.floor(playerPosition.x * elemSize);
	const playerPosY = Math.floor(playerPosition.y * elemSize);
	game.fillText(emojis['PLAYER'], playerPosX, playerPosY);
}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', goToUp);
btnLeft.addEventListener('click', goToLeft);
btnRight.addEventListener('click', goToRight);
btnDown.addEventListener('click', goToDown);

function moveByKeys(event){
if (event.key == 'ArrowUp') goToUp();
else if (event.key == 'ArrowLeft') goToLeft();
else if (event.key == 'ArrowRight') goToRight();
else if (event.key == 'ArrowDown') goToDown();
}

function goToUp(){
	if (playerPosition.y > 1){
		playerPosition.y -= 1;
		startGame();
	}else{
		//playerPosition.y = 1
	}
}

function goToLeft(){
	if (playerPosition.x > 1){
		playerPosition.x -= 1;
		startGame();
	}
}

function goToRight(){
	if (playerPosition.x < 9){
	console.log('Right')
		playerPosition.x += 1;
		startGame();
	}
}

function goToDown(){
	if (playerPosition.y < 9){
		playerPosition.y += 1;
		startGame();
	}
}
