var _a, _b;
var blogPosts = [
    {
        title: "Exploring streets",
        author: "Kanishka",
        date: "2025-02-03",
        summary: "A journey through the vibrant streets of Delhi, experiencing culture, food, and history",
        category: "Travel"
    },
    {
        title: "Lifestyle Changes",
        author: "Aman",
        date: "2025-01-15",
        summary: "This vlog is about lifestyle changes.",
        category: "Lifestyle"
    },
    {
        title: "Top Travel Destinations",
        author: "Sam",
        date: "2025-01-22",
        summary: "Discover amazing technologies around the world.",
        category: "Technology"
    },
    {
        title: "Modern Education Techniques",
        author: "Ten",
        date: "2025-01-10",
        summary: "Exploring new methods of teaching and learning.",
        category: "Education"
    }
];
window.onload = function () {
    loadBlogPosts(blogPosts);
};
function loadBlogPosts(posts) {
    var blogSection = document.getElementById("blog-posts");
    blogSection.innerHTML = "";
    posts.forEach(function (post) {
        var article = document.createElement("article");
        article.innerHTML = "\n        <h2>".concat(post.title, "</h2>\n        <p>Author: ").concat(post.author, "</p>\n        <p>Publish Date: ").concat(post.date, "</p>\n        <p>Summary: ").concat(post.summary, "</p>\n      ");
        blogSection.appendChild(article);
    });
}
(_a = document.getElementById("search-bar")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function (e) {
    var searchTerm = e.target.value.toLowerCase();
    var filteredPosts = blogPosts.filter(function (post) {
        return post.title.toLowerCase().includes(searchTerm) || post.author.toLowerCase().includes(searchTerm);
    });
    loadBlogPosts(filteredPosts);
});
var categoryLinks = document.querySelectorAll("aside ul li a");
categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        var _a;
        e.preventDefault();
        var category = ((_a = e.target.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        var filteredByCategory = blogPosts.filter(function (post) { return post.category === category; });
        loadBlogPosts(filteredByCategory);
    });
});
(_b = document.getElementById("subscription-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    if (!name || !email) {
        alert("Please fill in both Name and Email.");
        return;
    }
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    alert("Successfully subscribed!");
});
