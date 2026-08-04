// To save storage, this scripts adds template content to blog files
// separately from blog-setup/blog-template.html

const content = document.body.innerHTML;
const template = `
<div id="layout">
  <section id="sidebar">
    <ul id="navigation">
      <li>
        <a href="/#blogs"><< #blogs</a>
      </li>
    </ul>
  </section>

  <section id="main">
    <div id="about" class="blog">
      ${content}
    </div>
  </section>
</div>

<div id="background-image"></div>
`;

document.body.innerHTML = template;
