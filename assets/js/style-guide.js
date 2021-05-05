// ---------------------------------------------
// STYLE GUIDE: JAVASCRIPT

// ---------------------------------------------
// STYLE GUIDE: DUPLICATE DEMO EXAMPLES IN CODE BLOCKS

// Escape HTML
//  - Parameters:
//    - str {string} : Takes a string and returns it with HTML entities escaped
// Example:
// >>> escapeHtml("<div>Foo & Bar</div>")
// "&lt;div&gt;Foo &amp; Bar&lt;/div&gt;"
const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text))
    return div.innerHTML
}

// Trim whitespace and preserve indentation
//  - Parameters:
//    - code {string} : Takes a string and trims extra whitespace

const reIndentCode = (code) => {
    const lines = [];
    const linesArr = code.split("\n");

    linesArr.forEach(function (line, index) {
        if (line.trim() === "" && index === 0) {
            return;
        }

        if (line.trim() === "" && index === linesArr.length - 1) {
            return;
        }

        lines.push(line);
    });

    const line1 = lines[0];

    // Get the number of whitespace indentation characters on the first line
    // by comparing the length of the string with and without trimmed whitespace
    const whitespaceLen = line1.length - line1.trimLeft().length;

    // Loop through all lines and remove conditionally whitespace to the left equal to the whitespace on line 1
    return lines.map(function (line) {
        return line.length - line.trimLeft().length >= whitespaceLen ? line.substring(whitespaceLen, line.length) : line;
    }).join("\n");
}


const styleBlockAppendCode = () => {
    const styleBlocks = document.querySelectorAll(".styleguide-demo-block");

    styleBlocks.forEach(styleBlock => {
        const demo = styleBlock.querySelector('.styleguide-demo-each');
        const code = reIndentCode(escapeHtml(demo.innerHTML));
        const container = document.createElement("div");
        container.classList.add("styleguide-code-block");
        container.setAttribute("data-id", "styleguide-code-block");
        const preBlock = document.createElement("pre");
        const codeBlock = document.createElement("code");
        codeBlock.innerHTML = code;
        preBlock.appendChild(codeBlock);
        container.appendChild(preBlock);
        styleBlock.appendChild(container);
    });
}

styleBlockAppendCode();


const btnCode = document.querySelectorAll("[data-id=btn-styleguide-code]");

// Toggle style guide demos on clicking "Code" button
const btnToggleCode = btn => {
    const parentCode = btn.parentNode.querySelector("[data-id=styleguide-code-block]");
    parentCode.classList.toggle("styleguide-code-block--show")
}

btnCode.forEach(btn => {
    btn.addEventListener("click", evt => {
        btnToggleCode(evt.target);
    })
})


// ---------------------------------------------
// STYLE GUIDE: NAVIGATION

const navTrigger = document.querySelector("[data-id=btn-styleguide-menu]");
const toggleElement = document.querySelector("[data-id=styleguide-sidebar]");
const sidebarLinks = document.querySelectorAll("[data-id=styleguide-sidebar] a");

const toggleSidebar = () => {
    toggleElement.classList.toggle("styleguide-sidebar--show");
}

const hideSidebar = () => {
    toggleElement.classList.remove("styleguide-sidebar--show");
}

navTrigger.addEventListener("click", toggleSidebar);

sidebarLinks.forEach(link => {
    link.addEventListener("click", hideSidebar);
});
