const root = document.querySelector("root");

const loadAsync = async(apiLink, funcFill) => {
    await fetch(apiLink)
        .then((response) => response.json())
        .then((data) => {
            funcFill(data);
        })
        .catch((err) => console.log(err));
};

const fillPage0 = (data) => {
    data.forEach((launchObj) => {
        const { id, acf, title, better_featured_image: img, link } = {...launchObj };
        const strHtml = `<div  class="col d-flex justify-content-center mb-md-4">
        <div class="card"><img class="card-img-top" src="${img.source_url}" alt="${title.rendered}" />
        <div class="card-body d-flex flex-column justify-content-evenly">
            <h5 class="card-title">${title.rendered}</h5>
            <p class="card-text">${acf.description}</p>
            <a href="project.html?id=${id}" class="btn-link">Learn more</a>
        </div></div>
        </div>`;
        const hook = document.getElementById("recent_posts_hook");
        hook.insertAdjacentHTML("beforeend", strHtml);
    });
};

const fillPage1 = (data) => {
    const url = new URL(window.location.href);
    const id = Number(url.searchParams.get("id"));
    const filteredData = data.filter((a) => a.id === id);
    const { title, acf, content, date, better_featured_image: img } = {...filteredData[0] };
    const fecha = new Date(date);

    const strHtml = `<h1>${title.rendered}</h1>
    <div class="row d-flex justify-content-evenly">
        <div class="col">
            <h2>${acf.description}</h2>
        </div>
        <div class="col">
            <p class="d-flex justify-content-end"><span>Completed on </span>&nbsp;${fecha.toDateString()}</p>
        </div>
    </div>
    <div class="row d-flex project-shadow mt-5">
        <div class="rowd-flex align-content-center justify-content-center">
            <div class="col">
                <div class="foto"><img src="${img.source_url}" width="100%" height="${img.media_details.height}" class="cover" alt="Graphic design iamge"></div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                ${content.rendered}
            </div>
        </div>
    </div>`;
    const hook = document.getElementById("one-project-hook");
    hook.insertAdjacentHTML("beforeend", strHtml);
};
const submitForm = () => {
    const formulario = document.querySelector("#save_data");
    formulario.onsubmit = (e) => {
        e.preventDefault();
        //saveData()
        const message = `<p>Thank you <strong>${e.target.full_name.value}</strong>, your message has been recieved correctly.</p>`;
        const mhook = document.getElementById("message-hook");
        mhook.insertAdjacentHTML("beforeend", message);
    };
};
window.onload = () => {
    switch (page) {
        case 0:
            loadAsync("https://marketplace.freelancewebdesign.online/wp-json/wp/v2/projects", fillPage0);
            break;
        case 1:
            loadAsync("https://marketplace.freelancewebdesign.online/wp-json/wp/v2/projects", fillPage1);
            break;
        case 3:
            submitForm();
            break;
    }
};