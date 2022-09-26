const getValueInput = () => {
    let previousValue = [
        199,
        200,
        208,
        210,
        200,
        207,
        240,
        269,
        260,];
    let val = parseInt(document.getElementById("answer_input").value);
    previousValue.push(val)
    calculateLarger(previousValue)
}
function calculateLarger(elements) {
    let larger = []
    elements.map((e, index) => {
        if (index === 0) {
            larger[index] = `${e} (N/A, no previous measurement)`;
        } else if (elements[index - 1] > elements[index])
            larger[index] = `${e} (Decrement)`
        else {
            larger[index] = `${e} (Increment)`
        }
    });

    let inputAswer = document.getElementById("response")
    let ol = createList(larger);
    inputAswer.appendChild(ol)
}
function createList(elements) {
    let ul = document.createElement("ul");

    if (elements && Array.isArray(elements)) {
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            let li = document.createElement("li");
            let liText = document.createTextNode(element);
            li.appendChild(liText);
            ul.appendChild(li);
        }
    }
    return ul;
}