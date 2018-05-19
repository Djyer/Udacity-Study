/*
 * 创建一个包含所有卡片的数组
 */
const symbols = ["fab fa-github", "fas fa-anchor", "fab fa-telegram-plane", "far fa-gem",
    "fab fa-pagelines", "fas fa-globe", "fas fa-bicycle", "fas fa-heart"];
let cards = [...symbols, ...symbols];
let open = [];
let match = [];
let moveCount = 0;
let stars = 3;

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function creatHtml() {
    // shuffle(cards);
    const deck = document.getElementsByClassName("deck");
    const cardsFa = deck[0].getElementsByTagName("i");

    for (let i = 0; i < cards.length; i++){
        cardsFa[i].setAttribute("class", cards[i]);
    }
}

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

/**
 * 给每张卡片设置监听器
 */
function cardChange() {
    creatHtml();
    const deckCards = document.getElementsByClassName("deck")[0].getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        deckCards[i].addEventListener("click", clickCard);
    }
    resetGame();

}

/**
 * 翻开并显示卡片
 * @param card
 */
function showCard(card) {
    const currentClass = card.className;
    const changedClass = currentClass + " show" + " open";
    card.setAttribute("class", changedClass);
}

/**
 * 用户点击卡片后的交互
 * @param card
 */
function clickCard(card) {
    if (card.target !== open[0] && isInMatchArray(card.target)) {
        showCard(card.target);
        open.push(card.target);
        moves();
        if (open.length === 2) {
            if (isMatch(card.target)) {
                stayOpen(open[0], open[1]);
                if (match.length === 16) {
                    congratulactions();
                }
            } else {
                cardClose(open[0], open[1]);
            }
        }
    }
}

/**
 * 判断卡片是否已在match数组中
 * @param card
 * @returns {boolean}
 */
function isInMatchArray(card) {
    for (let i = 0; i < match.length; i++) {
        if (card === match[i]) {
            return false;
        }
    }
    return true;
}

/**
 * 判断两张卡片是否匹配
 * @param card
 * @returns {boolean}
 */
function isMatch(card) {
    const currentCard = card.getElementsByTagName("i")[0].className;
    const lastCard = open[0].getElementsByTagName("i")[0].className;
    return (lastCard === currentCard) ? true : false;
}

/**
 * 将卡片保持翻转打开状态，并将卡片放入match数组中，并且从open数组中删除
 * @param card1
 * @param card2
 */
function stayOpen(card1, card2) {
    const matchClass = "card match";
    match.push(open.pop());
    match.push(open.pop());

    card1.setAttribute("class", matchClass);
    card2.setAttribute("class", matchClass);
}

/**
 * 将卡片合上，并从open数组中删除
 * @param card1
 * @param card2
 */
function cardClose(card1, card2) {
    open.pop();
    open.pop();

    wrongEffect(card1, card2);
    setTimeout(function() {
        card1.setAttribute("class", "card");
        card2.setAttribute("class", "card");
    },700);
}

/**
 * 不匹配效果
 * @param card1
 * @param card2
 */
function wrongEffect(card1, card2) {
    card1.setAttribute("class", "card wrong");
    card2.setAttribute("class", "card wrong");
}

/**
 * 点击次数计数
 */
function moves() {
    const moveSpan = document.getElementsByClassName("moves");
    moveCount++;
    moveSpan[0].innerHTML = moveCount;
    showStars();
}

/**
 * 玩家完成游戏后，显示恭喜页面，显示分数和步数
 */
function congratulactions() {
    const container = document.getElementsByClassName("container");
    const cgtltBox = document.getElementsByClassName("congratulations");
    const finallyMove = document.getElementsByClassName("finally-move");
    const finallyStar = document.getElementsByClassName("finally-star");

    container[0].setAttribute("class", "container hide");
    cgtltBox[0].setAttribute("class", "congratulations");
    finallyMove[0].innerHTML = moveCount;
    switch (stars) {
        case 1: finallyStar[0].innerHTML = 1; break;
        case 2: finallyStar[0].innerHTML = 2; break;
        case 3: finallyStar[0].innerHTML = 3; break;
    }
}

/**
 * 当超过一定步数的时候，星星就会减少
 */
function showStars() {
    if (moveCount <= 3) {
        stars = 3;
    } else if (moveCount <= 6) {
        stars = 2;
        createStars();
    } else if (moveCount >= 10) {
        stars = 1;
        createStars();
    }
}

/**
 * 根据star的数量，将html中的星星增加或减少
 */
function createStars() {
    const starsBox = document.getElementsByClassName("stars");
    let starsShow = starsBox[0].getElementsByTagName("li");

    if (starsShow.length > stars) {
        starsBox[0].removeChild(starsShow[starsShow.length - 1]);
    }
    while (starsShow.length < stars) {
        const starLi = document.createElement("li");
        const starI = document.createElement("i");
        starI.setAttribute("class", "fa fa-star");
        starLi.appendChild(starI);
        starsBox[0].appendChild(starLi);
    }
}

/**
 * 为重新开始游戏按钮添加监听
 */
function resetGame() {
    const resetBtn = document.getElementsByClassName("restart");

    for (let i = 0; i < resetBtn.length; i++) {
        resetBtn[i].addEventListener("click", resetHandle);
    }
}

/**
 * 重新开始功能
 */
function resetHandle() {
    const cards = document.getElementsByClassName("card");

    creatHtml();
    open = [];
    match = [];
    stars = 3;
    moveCount = 0;

    for (let i = 0; i < cards.length; i++) {
        cards[i].setAttribute("class", "card");
    }

    const moveSpan = document.getElementsByClassName("moves");
    moveSpan[0].innerHTML = moveCount;

    const container = document.getElementsByClassName("container");
    const cgtltBox = document.getElementsByClassName("congratulations");

    container[0].setAttribute("class", "container");
    cgtltBox[0].setAttribute("class", "congratulations hide");
    createStars();
}
cardChange();
