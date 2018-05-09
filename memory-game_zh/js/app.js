/*
 * 创建一个包含所有卡片的数组
 */
var cards = ["fab fa-github", "fab fa-github", "fas fa-anchor", "fas fa-anchor",
            "fab fa-telegram-plane", "fab fa-telegram-plane", "far fa-gem", "far fa-gem",
            "fab fa-pagelines", "fab fa-pagelines", "fas fa-globe", "fas fa-globe",
            "fas fa-bicycle", "fas fa-bicycle", "fas fa-heart", "fas fa-heart"];
var open = [];
var match = [];

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
    shuffle(cards);
    var deck = document.getElementsByClassName("deck");
    var cardsFa = deck[0].getElementsByTagName("i");

    for (var i = 0; i < cards.length; i++){
        // console.log(cardsFa[i]);
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
 * 给每张卡片设置监听器，并且控制整个游戏流程
 */
function cardChange() {
    creatHtml();
    var deckCards = document.getElementsByClassName("deck")[0].getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        deckCards[i].addEventListener("click", clickCard);
    }

}

/**
 * 翻开并显示卡片
 * @param card
 */
function showCard(card) {
    var currentClass = card.className;
    var changedClass = currentClass + " show" + " open";
    card.setAttribute("class", changedClass);
}

/**
 * 将卡片添加到状态为open的数组中
 * @param card
 */
function addOpenStatus(card) {
    open.push(card);
}

/**
 *
 * @param card
 */
function clickCard(card) {
    showCard(card.target);
    addOpenStatus(card.target);
    if (open.length === 2) {
        console.log(isMatch(card.target));
        if (isMatch(card.target)) {
            stayOpen(open[0], open[1]);
        } else {
            setTimeout(cardClose(open[0], open[1]),2000);
        }
    }

}

/**
 * 判断两张卡片是否匹配
 * @param card
 * @returns {boolean}
 */
function isMatch(card) {
    var currentCard = card.getElementsByTagName("i")[0].className;
    var lastCard = open[0].getElementsByTagName("i")[0].className;
    // console.log(currentCard);
    // console.log(lastCard);
    if (lastCard === currentCard) {
        return true;
    }
    return false;
}


cardChange();
