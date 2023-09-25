const loadPhoneApi = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneApi(data.data, dataLimit);

}

const displayPhoneApi = (phones, dataLimit) =>{

    const phonesDiv = document.getElementById('phone-container');
    phonesDiv.textContent = '';

    // no meassage found 
    const noMeassage = document.getElementById('no-meassage');
    if( phones.length === 0){
        noMeassage.classList.remove('d-none');
    }else{
        noMeassage.classList.add('d-none');
    }

    // only show on UI cards 20 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length >20){
        phones = phones.slice(0, 20);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    phones.forEach(phone =>{
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-2">
                <img style="height: 350px" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadModalDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailModal">
                       See Deatils
                    </button>
                </div>
            </div>
        `;
        phonesDiv.appendChild(div);
    })
    // stopSpinner 
    spinnerLoading(false)
}

const showAllSearch = (dataLimit) =>{
    spinnerLoading(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhoneApi(searchText, dataLimit)
}

// keypress event handler add in search field 
document.getElementById('search-field').addEventListener('keypress', function(e){
    console.log(e.key)
    if(e.key === 'Enter'){
        showAllSearch(20)
    }
})

document.getElementById('btn-showAll').addEventListener('click', function(){
    showAllSearch()

})

const spinnerLoading = isLoading =>{
    const loadingOn = document.getElementById('loader');
    if(isLoading){
        loadingOn.classList.remove('d-none')
    }else{
        loadingOn.classList.add('d-none')
    }
}

// modal phone details 
const loadModalDetails = async(id) =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)

}

const displayPhoneDetails = (detail) =>{
    console.log(detail)
    const modalTitle = document.getElementById('detailModalLabel');
    modalTitle.innerText = detail.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <p>Others: USB ${detail.others.USB}, GPS ${detail.others.GPS}</p>
        <p>${detail.releaseDate ? detail.releaseDate : 'No release dae found'}</p>
        <p>Memory: ${detail.mainFeatures?.memory}</p>
        <p>Sensors: ${detail.mainFeatures?.sensors[0]}, ${detail.mainFeatures?.sensors[1]}, ${detail.mainFeatures?.sensors[2]}</p>
    `

}

loadPhoneApi('iphone')