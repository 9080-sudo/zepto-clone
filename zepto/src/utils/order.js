const getNumbers = () => {
    let numbersString = ''
    for(let i=0;i<=9;i++) numbersString += i
    return numbersString
}

export const getCapitalLetters = () => {
    let capitalLettersString = ''
    for(let i=65;i<=90;i++) capitalLettersString += String.fromCharCode(i);
    return capitalLettersString
}

export const generateOrderId = () => {
    const charactersString = getNumbers() + getCapitalLetters()
    const length = charactersString.length 
    let randomOrderId = ''
    for(let i=0;i<14;i++)
        randomOrderId += charactersString[Math.floor(Math.random() * length)]
    return randomOrderId
}