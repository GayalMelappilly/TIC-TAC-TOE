var firstMove = false
var gameStarted = false
var thisIsStartPage = false
var mode = ''
var player1 = ''
var player2 = ''
var symbol = 'tie'
var move = ''
var singlePlayerName = ''
var character = ''
var compCharacter = ''
var exactNumber = ''
var index = ''
var clickedPattern = [1, 2, 3, 4, 5, 6, 7, 8, 9]


StartPage()

function StartPage() {
    $('.mode-selection').attr('hidden', false)
    $('.mode-selection-btn').click(function () {

        mode = $(this).attr('id')

        if (mode === 'multiPlayer') {
            playerName(mode)
        } else if (mode === 'singlePlayer') {
            playerName(mode)
        }
    })
}

function playerName(selection) {

    if (selection === 'multiPlayer') {
        $('.mode-selection').attr('hidden', true)
        $('.player1-name-div').attr('hidden', false)
        $('.player2-name-div').attr('hidden', false)
        $('.start-div').attr('hidden', false)
        $('.click-area').attr('hidden', true)
        $('.play-again-btn').attr('hidden', true)
        $('.start-btn').click(function () {
            player1 = $('.player1-name').val()
            player2 = $('.player2-name').val()
            multiPlayer()
        })
    } else if (selection === 'singlePlayer') {
        $('.click-area').attr('hidden', true)
        $('.mode-selection').attr('hidden', true)
        $('.char-selection-div').attr('hidden', false)
        $('.heading').text('PLEASE SELECT')
        $('.heading').addClass('char-selection-spacing')
        $('.play-again-btn').attr('hidden', true)

        $('.char-selection').click(function () {
            character = $(this).attr('id')
            compCharacter = $(this).attr('aria-placeholder')
            singlePlayer(character, compCharacter)
        })
    }
}

function multiPlayer() {

    $('.mode-selection').attr('hidden', true)
    $('.game-field').attr('hidden', false)
    $('.click-area').attr('hidden', false)
    $('.player1-name-div').attr('hidden', true)
    $('.player2-name-div').attr('hidden', true)
    $('.start-div').attr('hidden', true)
    $('.name-field').attr('hidden', false)
    $('#player2').attr('hidden', false)
    $('#player1').text(player1)
    $('#player2').text(player2)

    $('.click-area').click(function () {
        if (firstMove === false) {
            var columnNumber = $(this).attr('id')
            $('#player2').removeClass('player-turn')
            $('#player2').addClass('text-danger')
            $('#player1').addClass('player-turn')
            $('#player1').removeClass('text-danger')
            $('#' + columnNumber).text('X')
            $('#' + columnNumber).removeClass('min-font')
            $('#' + columnNumber).addClass('disable-div')
            move = +move + 1
            firstMove = true
            game()
        } else if (firstMove === true) {
            var columnNumber = $(this).attr('id')
            $('#player1').addClass('text-danger')
            $('#player1').removeClass('player-turn')
            $('#player2').removeClass('text-danger')
            $('#player2').addClass('player-turn')
            $('#' + columnNumber).text('O')
            $('#' + columnNumber).removeClass('min-font')
            $('#' + columnNumber).addClass('disable-div')
            firstMove = false
            move = +move + 1
            game()
        }
    })
}


function singlePlayer(user, comp) {
    $('.mode-selection').attr('hidden', true)
    $('.game-field').attr('hidden', false)
    $('.click-area').attr('hidden', false)
    $('.player1-name-div').attr('hidden', true)
    $('.player2-name-div').attr('hidden', true)
    $('.start-div').attr('hidden', true)
    $('.name-field').attr('hidden', false)
    $('.username').text(singlePlayerName)
    $('.char-selection-div').attr('hidden', true)
    $('.heading').removeClass('char-selection-spacing')
    $('.heading').text('TIC TAC TOE')


    if (comp === 'X') {
        compMove()
    }

    function compMove() {

        var randomElement = Math.floor(Math.random() * clickedPattern.length) + 0
        var randomNumber = clickedPattern[randomElement]

        index = clickedPattern.indexOf(randomNumber)

        if (firstMove === false) {
           
            clickedPattern.splice(index, 1)

            setTimeout(() => {
                $('#col' + randomNumber).removeClass('min-font')
                $('#col' + randomNumber).text(comp)
                $('#col' + randomNumber).addClass('disable-div')
                firstMove = true
                move = +move + 1
                game()
            }, 500)
        }
    }

    $('.click-area').click(function () {
        var columnNumber = $(this).attr('id')
        exactNumber = parseInt(columnNumber.replace(/\D/g, ''))

        index = clickedPattern.indexOf(exactNumber)

        clickedPattern.splice(index, 1)

        setTimeout(() => {
            $('#' + columnNumber).text(user)
            $('#' + columnNumber).addClass('disable-div')
            $('#' + columnNumber).removeClass('min-font')
            firstMove = false
            move = +move + 1
            game()
            compMove()

        })
    })
}


function game() {

    var I = $('#col1')
    var II = $('#col2')
    var III = $('#col3')
    var IV = $('#col4')
    var V = $('#col5')
    var VI = $('#col6')
    var VII = $('#col7')
    var VIII = $('#col8')
    var IX = $('#col9')

    var possibleWays = [
        [I.attr('id'), II.attr('id'), III.attr('id')],
        [IV.attr('id'), V.attr('id'), VI.attr('id')],
        [VII.attr('id'), VIII.attr('id'), IX.attr('id')]
    ]

    var results = [
        [I.text(), II.text(), III.text()],
        [IV.text(), V.text(), VI.text()],
        [VII.text(), VIII.text(), IX.text()]
    ]

    let pos1 = results[0][0]
    let pos2 = results[0][1]
    let pos3 = results[0][2]

    let pos4 = results[1][0]
    let pos5 = results[1][1]
    let pos6 = results[1][2]

    let pos7 = results[2][0]
    let pos8 = results[2][1]
    let pos9 = results[2][2]

    if (pos1 === pos2 && pos1 === pos3) {
        symbol = pos1
        winOrLose(symbol)
    } else if (pos1 === pos5 && pos1 === pos9) {
        symbol = pos1
        winOrLose(symbol)
    } else if (pos4 === pos5 && pos4 === pos6) {
        symbol = pos4
        winOrLose(symbol)
    } else if (pos7 === pos8 && pos7 === pos9) {
        symbol = pos7
        winOrLose(symbol)
    } else if (pos1 === pos4 && pos1 === pos7) {
        symbol = pos1
        winOrLose(symbol)
    } else if (pos2 === pos5 && pos2 === pos8) {
        symbol = pos2
        winOrLose(symbol)
    } else if (pos3 === pos6 && pos3 === pos9) {
        symbol = pos3
        winOrLose(symbol)
    } else if (pos3 === pos5 && pos3 === pos7) {
        symbol = pos3
        winOrLose(symbol)
    } else if (move === 9 && symbol === 'tie') {
        winOrLose(symbol)
    }
}

function winOrLose(winner) {
    $('.game-field').css({ 'filter': 'blur(20px)', 'z-index': '0' })
    $('.name-field').attr('hidden', true)
    $('.click-area').addClass('disable-div')


    if (mode === 'multiPlayer') {
        if (winner === 'X') {
            $('.heading').addClass('won')
            $('.heading').text(player1 + ' WON')
            $('.play-again-btn').attr('hidden', false)
        } else if (winner === 'O') {
            $('.heading').addClass('won')
            $('.heading').text(player2 + ' WON')
            $('.play-again-btn').attr('hidden', false)
        } else if (winner === 'tie') {
            $('.heading').addClass('won')
            $('.heading').text('TIE')
            $('.play-again-btn').attr('hidden', false)
        }
    } else if (mode === 'singlePlayer') {
        if (winner === character) {
            $('.heading').removeClass('text-info')
            $('.heading').text('YOU WON')
            $('.heading').addClass('won')
            $('.play-again-btn').attr('hidden', false)
        } else if (winner === compCharacter) {
            $('.heading').removeClass('text-info')
            $('.heading').text('YOU LOSE')
            $('.heading').addClass('lose')
            $('.play-again-btn').attr('hidden', false)
        } else if (winner === 'tie') {
            $('.heading').removeClass('text-info')
            $('.heading').text('TIE')
            $('.heading').addClass('tie')
            $('.play-again-btn').attr('hidden', false)
        }
    }
}


