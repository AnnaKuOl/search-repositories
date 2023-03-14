
const result = document.querySelector('.result');
const resultNone = document.querySelector('.result__none');
const formSearch = document.querySelector('.search');
const input = formSearch.querySelector('.search__field');
const resultSubtitle = document.querySelector('.result__subtitle');
let results = null;
formSearch.addEventListener('submit', () => {
    resultNone.classList.add('invisible');
    if(input.value.length < 3){
        resultNone.textContent = "Недостаточно букв для поиска"
        resultNone.classList.remove('invisible');
        return;
    }
    searchRepo(input.value);
    resultSubtitle.textContent = `по слову ${input.value}`;
    input.value = '';
})
function searchRepo(request){
    fetch(`https://api.github.com/search/repositories?q=${request}&sort=stars&order=asc&per_page=10`, {
        method: 'GET',
        Accept: 'application/vnd.github+json',    
    
    }).then(
        successResponse => successResponse.json(),
        failResponse => {
            resultNone.textContent = "Ошибка соединения"
            resultNone.classList.remove('invisible');
    }).then((res) => {
        console.log(res.items);
        result.textContent = ""; 
        res.items?.length > 0 ? createList(res.items) : resultNone.classList.remove('invisible');        
    })
}
function createList(arr){   

    arr?.forEach(elem => {
        const li = document.createElement('li');
        li.classList = "result__item";
        li.innerHTML = `<a href=${elem.svn_url} class="result__link" target="_blank">${elem.name}</a> <p class="result__name">Автор: ${elem.owner.login}</p><p class="result__date">Дата создания репозитория: ${formateDate(elem.created_at)}</p>`
        result.append(li);
        return result;
    })
}
function formateDate(date){
    let d = new Date(date);
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
        ].map(el => el.slice(-2))
        return `${d.slice(0, 3).join(".")} ${d.slice(3).join(":")}`
}