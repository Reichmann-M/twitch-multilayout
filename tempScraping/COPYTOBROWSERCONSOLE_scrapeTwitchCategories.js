const scrollCount = 50;
const catDiv = document.querySelector('.tw-tower')
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
async function scrollAmount() {
    console.log('*SCROLLING '+scrollCount+" TIMES*")
    for (let i = 0; i < scrollCount; i++) {
        catDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
        console.log('Scrolling: ', i + 1);
        await delay(1500);
    }
    console.log('-Scrolling complete-');
}
async function main() {
    await scrollAmount();
    console.log('-Code after logging-');
    const cardElements = document.querySelectorAll('.tw-card');
    const categoryData = [];
    cardElements.forEach((cardElement) => {
        const link = cardElement.querySelector('[data-a-target="tw-box-art-card-link"]').href
        const imgValue = cardElement.querySelector('img').src
        const name = cardElement.querySelector('h2').innerHTML
        categoryData.push({ link, imgValue, name });
    });
    console.log(categoryData);
}
main();