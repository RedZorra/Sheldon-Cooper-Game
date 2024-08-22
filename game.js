//Sheldons GAme of Rock Paper Scissors Lizard Spock
//willkommen bei Terminal  game Sheldon's Rock Paper Scissors Lizard Spock

//GAme Rules
//Scissors cuts Paper
//Paper covers Rock
//Rock crushes Lizard
//Lizard poisons Spock
//Spock smashes Scissors
//Scissors decapitates Lizard
//Lizard eats Paper
//Paper disproves Spock
//Spock vaporizes Rock
//Rock crushes Scissors


import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const logo = `
██████╗ ██████╗ ███████╗███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
██████╔╝██████╔╝███████╗███████╗███████╗
██╔══██╗██╔═══╝ ╚════██║╚════██║╚════██║
██║  ██║██║     ███████║███████║███████║
╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝╚══════╝
╔═══════════════════════════════════════╗
║Rock · Paper · Scissors · Lizard · Spock  ║
╚═══════════════════════════════════════╝
`;


const rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    sciccors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock']
}

const asciiArt = {
    rock: `
    _______
---'   ____)
        (_____)
        (_____)
        (____)
---.__(___)
    `,
    paper: `
    _______
---'   ____)____
            ______)
            _______)
            _______)
---.__________)
    `,
    scissors: `
    _______
---'   ____)____
            ______)
        __________)
        (____)
---.__(___)
    `,
    lizard: `
   _____
   /     \\
  /       \\
 (  \\/\\/  )
  \\      /
   \\____/
`,
    spock: `
      _______
---'   ____)____
           ______)
        __________)
       (____)
---.__(___)
`
};

const options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const MAX_ROUNDS = 3;

function getComputerChoice() {
    return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(playerChoice, computerChoice) {
    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (playerChoice === computerChoice) {
        return 'tie';
    }
    if (rules[playerChoice].includes(computerChoice)) {
        playerScore++;
        return 'Player';
    }
    computerScore++;
    return 'Computer';
}

function explainRules(playerChoice, computerChoice) {
    const winningMoves = {
        rock: { scissors: 'crushes', lizard: 'crushes' },
        paper: { rock: 'covers', spock: 'disproves' },
        scissors: { paper: 'cuts', lizard: 'decapitates' },
        lizard: { spock: 'poisons', paper: 'eats' },
        spock: { scissors: 'smashes', rock: 'vaporizes' }
    };

    if (winningMoves[playerChoice] && winningMoves[playerChoice][computerChoice]) {
        return `${playerChoice} ${winningMoves[playerChoice][computerChoice]} ${computerChoice}`;
    } else if (winningMoves[computerChoice] && winningMoves[computerChoice][playerChoice]) {
        return `${computerChoice} ${winningMoves[computerChoice][playerChoice]} ${playerChoice}`;
    }

    return `${playerChoice} ties with ${computerChoice}`;
}

function playRound(roundNumber = 1) {
    if(roundNumber > MAX_ROUNDS){
        endGame();
        return;
    }
    console.clear();
    console.log(chalk.cyan(logo));
    console.log(chalk.bold.yellow('Welcome to Rock Paper Scissors Lizard Spock'));
    console.log('Choose one of the following: rock, paper, scissors, lizard, spock');
    
    rl.question(chalk.cyan('Your choice: '), (playerChoice) => {
        playerChoice = playerChoice.toLowerCase();
        if (!options.includes(playerChoice)) {
            console.log(chalk.red('Invalid choice'));
            setTimeout(playRound, 2000);
            return;
        }
        
        const computerChoice = getComputerChoice();
        
        console.log(chalk.green('You chose:'));
        console.log(chalk.green(asciiArt[playerChoice]));
        console.log(chalk.red('Computer chose:'));
        console.log(chalk.red(asciiArt[computerChoice]));
        
        const winner = determineWinner(playerChoice, computerChoice);
        
        console.log(chalk.yellow(explainRules(playerChoice, computerChoice)));
        
        if (winner === 'tie') {
            console.log(chalk.yellow('It\'s a tie'));
        } else {
            console.log(chalk.magenta(`${winner} wins!`));
        }
        
        console.log(chalk.blue(`Score - Player: ${playerScore}, Computer: ${computerScore}`));
        
        roundsPlayed++;
        
        if (roundsPlayed < MAX_ROUNDS) {
            setTimeout(() => {
                rl.question(chalk.cyan('Press Enter to continue...'), () => {
                    playRound(roundNumber + 1);
                });
            }, 1000);
        } else {
            endGame();
        }
    });
}

function endGame() {
    console.log(chalk.bold.magenta('Game Over!'));
    if (playerScore > computerScore) {
        console.log(chalk.bold.green('You Win the series!'));
    } else if (playerScore < computerScore) {
        console.log(chalk.bold.red('Computer Wins the series!'));
    } else {
        console.log(chalk.bold.yellow('The series is a tie!'));
    }
    
    rl.question('Do you want to play again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            playerScore = 0;
            computerScore = 0;
            roundsPlayed = 0;
            playRound(1);
        } else {
            console.log(chalk.magenta('Thanks for Playing! Bye!' + '\n'));
            rl.close();
        }
    });
}

playRound(1);

