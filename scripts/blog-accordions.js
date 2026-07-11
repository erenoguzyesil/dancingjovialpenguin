const accordionsDiv = document.getElementById("accordions");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Blog(name, link, date) {
  this.name = name;
  this.link = link;
  this.date = date;

  this.generateHtmlCode = () => {
    return `<li>
                <div class="container">
                  <a href="blogs/${this.link}.html"
                    >${this.name}</a
                  >
                </div>
              </li>`;
  };
}

function Accordion(name, id) {
  this.name = name;
  this.id = id;
  this.blogItems = [];

  this.generateHtmlCode = () => {
    let blogItemsHtml = "";

    this.blogItems.forEach((blog) => {
      blogItemsHtml += blog.generateHtmlCode();
    });

    return `<div class="blog-accordion" id="accordion-${this.id}">
              <div class="header">
                <span
                  >${this.name} (${this.blogItems.length})
                  <button type="button" data-accordion-id="${this.id}"></button></span
                >
              </div>
              <ul class="content">
                ${blogItemsHtml}
              </ul>
          </div>
    `;
  };
}

function AccordionCollection() {
  this.accordions = [];

  this.addNewBlog = (blog, header) => {
    let accordionExists = false;

    this.accordions.forEach((accordion) => {
      if (accordion.name === header) {
        accordion.blogItems.push(blog);

        accordionExists = true;

        return;
      }
    });

    if (accordionExists) return;

    let newAccordion = new Accordion(header, this.accordions.length);
    newAccordion.blogItems.push(blog);

    this.accordions.push(newAccordion);
  };

  this.addNewAccordion = (accordion) => {
    this.accordions.push(accordion);
  };

  this.sortAccordions = () => {
    this.accordions.sort((a, b) => {
      return new Date(b.blogItems[0].date) - new Date(a.blogItems[0].date);
    });
  };

  this.generateHtmlCode = () => {
    let endString = "";

    this.accordions.forEach((accordion) => {
      endString += accordion.generateHtmlCode();
    });

    return endString;
  };
}

const accordionCollection = new AccordionCollection();

blogList.forEach((pureBlogObject) => {
  let blog = new Blog(
    pureBlogObject.title,
    pureBlogObject.link,
    pureBlogObject.date,
  );

  let dateObject = new Date(blog.date);

  accordionCollection.addNewBlog(
    blog,
    months[dateObject.getMonth()] + " " + dateObject.getFullYear(),
  );
});

accordionCollection.sortAccordions();
accordionsDiv.innerHTML = accordionCollection.generateHtmlCode();

const accordionShowButtons = document.querySelectorAll(
  ".blog-accordion .header button",
);

accordionShowButtons.forEach((button, index) => {
  let buttonAccordionId = button.getAttribute("data-accordion-id");
  let parentAccordion = document.getElementById(
    "accordion-" + buttonAccordionId,
  );

  if (index < 4) {
    parentAccordion.classList.add("visible");
  } else {
    parentAccordion.classList.add("hidden");
  }

  button.addEventListener("click", () => {
    if (parentAccordion.classList.contains("visible")) {
      parentAccordion.classList.remove("visible");
      parentAccordion.classList.add("hidden");
    } else {
      parentAccordion.classList.remove("hidden");
      parentAccordion.classList.add("visible");
    }
  });
});
