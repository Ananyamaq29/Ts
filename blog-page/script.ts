interface BlogPost {
    title: string;
    author: string;
    date: string;
    summary: string;
    category: string;
  }
  
  const blogPosts: BlogPost[] = [
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
  
  function loadBlogPosts(posts: BlogPost[]): void {
    const blogSection = document.getElementById("blog-posts") as HTMLElement;
    blogSection.innerHTML = "";
  
    posts.forEach(post => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>Author: ${post.author}</p>
        <p>Publish Date: ${post.date}</p>
        <p>Summary: ${post.summary}</p>
      `;
      blogSection.appendChild(article);
    });
  }
  
  document.getElementById("search-bar")?.addEventListener("input", function (e) {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) || post.author.toLowerCase().includes(searchTerm)
    );
    loadBlogPosts(filteredPosts);
  });
  
  const categoryLinks = document.querySelectorAll("aside ul li a");
  categoryLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = (e.target as HTMLAnchorElement).textContent?.trim() || '';
      const filteredByCategory = blogPosts.filter(post => post.category === category);
      loadBlogPosts(filteredByCategory);
    });
  });
  
  document.getElementById("subscription-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
  
    if (!name || !email) {
      alert("Please fill in both Name and Email.");
      return;
    }
  
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    alert("Successfully subscribed!");
  });
  