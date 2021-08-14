const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogBreedsList
let filter 
let fileteredObj = {}

document.addEventListener('DOMContentLoaded', e => {
    dogBreedsList = document.getElementById('dog-breeds')

    document.querySelector('#breed-dropdown').addEventListener('change', e => fetchBreeds(e.target.value))
})

function fetchImages() {
    fetch(imgUrl)
        .then(res => res.json())
        .then(imges => loadingImages(imges.message))
        .catch(error => console.log('%c Error Occer: ', 'color: firebrick', error.message))
}
fetchImages()
fetchBreeds()

function fetchBreeds(filter = null) {
    fetch(breedUrl)
        .then(res => res.json())
        .then(breeds => {
            // console.log(breeds.message)
            if (filter != null) {
                dogBreedsList.innerHTML = ''
                fileteredObj = {}

                //---------------

                Object.entries(breeds.message).forEach(([key]) => {
                   if (key.toLowerCase().startsWith(filter)){
                       fileteredObj[key] = breeds.message[key]
                   }
                })
                //----------------

                // Object.keys(breeds.message).forEach(key => {
                  
                //     if (key.toLocaleLowerCase().startsWith(filter)) {
                //          console.log(Object.values(breeds.message[key]))
                //     //    fileteredObj = Object.assign({},breeds.message)
                //     }
                // })
                // const result = Object.keys(breeds.message).filter(key => key.toLocaleLowerCase().startsWith(filter))
                loadingBreed(fileteredObj)
            } else {
            loadingBreed(breeds.message)}
        })
        .catch(error => console.log('%c Error Occer: ', 'color: firebrick', error.message))
}

function loadingBreed(breedArray) {
   
        Object.keys(breedArray).forEach(key => {
            // console.log(key, breedArray[key])
            const li = document.createElement('li')
            li.className = 'breedList'
            li.addEventListener('click', event => handleLiClicked(event))
            li.textContent = key
            if (breedArray[key].length !== 0) {
                const ul = document.createElement('ol')
                breedArray[key].forEach(value => {
                    const li = document.createElement('li')
                    li.textContent = value
                    ul.append(li)
                })
                li.append(ul)
            }
            dogBreedsList.append(li)
        })
}

function handleLiClicked(event) {
    event.target.style.color = 'firebrick'
}

function loadingImages(imgArray) {
    const imgeContainer = document.getElementById('dog-image-container')
    imgeContainer.style.display = 'flex'
    imgeContainer.style.flexDirection = 'row'
    imgeContainer.style.padding = '20px'
    imgArray.forEach(img => {
        let imgHolder = document.createElement('img')
        imgHolder.src = img
        imgHolder.style.width = '200px'
        imgeContainer.append(imgHolder)
    })
}
// console.log('%c HI', 'color: firebrick')
