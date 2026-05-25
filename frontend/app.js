const API = "http://localhost:5000/api";

let token = "";

async function register() {

    await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    });

    alert("Registered");
}

async function login() {

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();

    token = data.token;

    alert("Logged In");
}

async function createPost() {

    await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            author: username.value
        })
    });

    loadPosts();
}

async function loadPosts() {

    const res = await fetch(`${API}/posts`);

    const posts = await res.json();

    postsDiv.innerHTML = "";

    posts.forEach(post => {

        postsDiv.innerHTML += `
        
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>By ${post.author}</small>

            <h4>Comments</h4>

            ${post.comments.map(c => `
                <p>${c.user}: ${c.text}</p>
            `).join("")}

            <input id="comment-${post._id}" placeholder="Comment">

            <button onclick="addComment('${post._id}')">
                Add Comment
            </button>

            <button onclick="deletePost('${post._id}')">
                Delete
            </button>
            <button onclick="editPost('${post._id}')">
    Edit
</button>
        </div>
        `;
    });
}

async function addComment(id) {

    const text = document.getElementById(`comment-${id}`).value;

    await fetch(`${API}/posts/${id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            user: username.value,
            text
        })
    });

    loadPosts();
}

async function editPost(id) {

    const newTitle = prompt("Enter new title");

    await fetch(`${API}/posts/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },

        body: JSON.stringify({
            title: newTitle
        })
    });

    loadPosts();
}