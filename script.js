const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

const convertMarkdown = () => {
    let html = markdownInput.value;

    const rules = [
        {
            regex: /^(#+) (.+)$/gm,
            replace: (_, level, text) => `<h${level.length}>${text}</h${level.length}>`
        },
        {
            regex: /(\*\*|__)(.+)\1/gm,
            replace: `<strong>$2</strong>`
        },
        {
            regex: /(\*|_)(.+)\1/gm,
            replace: `<em>$2</em>`
        },
        {
            regex: /!\[(.+)\]\((.+)\)/gm,
            replace: `<img alt="$1" src="$2">`
        },
        {
            regex: /\[(.+)\]\((.+)\)/gm,
            replace: `<a href="$2">$1</a>`
        },
        {
            regex: /^> (.+)/gm,
            replace: `<blockquote>$1</blockquote>`
        }
    ];

    for (const rule of rules) html = html.replace(rule.regex, rule.replace);
    htmlOutput.textContent = html;
    preview.innerHTML = html;
    return html;
}

markdownInput.addEventListener('input', convertMarkdown);