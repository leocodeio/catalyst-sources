async function fetchBlogs() {
    try {
        const response = await fetch('fetch_blogs.php');
        return await response.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}


function renderBlogs(blogs) {
    const parentEle = document.getElementById("blogs");
    parentEle.classList.add('blogs');
    blogs.forEach(blog => {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('blog-card');

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('blog');
        
        const h3 = document.createElement("h3");
        const p = document.createElement("p");

        h3.innerHTML = blog.heading;
        p.innerHTML = blog.content.substring(0, 200)+'...';

        outerDiv.setAttribute('onclick', `showDetails("${blog.heading}")`);

        innerDiv.appendChild(h3);
        innerDiv.appendChild(p);
        outerDiv.appendChild(innerDiv);

        parentEle.append(outerDiv);

        const detDiv=document.createElement('div');
        detDiv.classList.add('blog-details');
        detDiv.setAttribute("id",`${blog.heading}`+"Details");

        const deth3 = document.createElement("h3");
        const detp = document.createElement("p");

        deth3.innerHTML = blog.heading;
        detp.innerHTML = blog.content;

        const but=document.createElement("button");
        but.innerHTML="close";
        but.setAttribute('onclick', `hideDetails("${blog.heading}")`);

        detDiv.appendChild(but)
        detDiv.appendChild(deth3);
        detDiv.appendChild(detp);

        parentEle.append(detDiv);

    });
}

fetchBlogs().then(blogs => renderBlogs(blogs));

function showDetails(blogId) {
    var projectDetails = document.getElementById(blogId + 'Details');
    projectDetails.classList.toggle("visible");
}

function hideDetails(blogId) {
    var projectDetails = document.getElementById(blogId + 'Details');
    projectDetails.classList.remove("visible");
}


function toggleDescription(card) {
    card.classList.toggle("active");
}

function toggleNav() {
    var nav = document.querySelector('nav');
    var hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
    nav.classList.toggle('show');
}
