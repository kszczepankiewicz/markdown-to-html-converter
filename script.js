const $ = id => document.getElementById(id);

const markdownInput = $('markdown-input');
const htmlOutput = $('html-output');
const preview = $('preview');
const copyBtn = $('copy-button');

const rules = [
    {
        regex: /^(#{1,6})\s+(.+?)$/gm,
        replace: (_, level, text) => `<h${level.length}>${text}</h${level.length}>`
    },
    {
        regex: /(\*\*|__)(.+?)\1/g,
        replace: `<strong>$2</strong>`
    },
    {
        regex: /(\*|_)(.+?)\1/g,
        replace: `<em>$2</em>`
    },
    {
        regex: /!\[([^\]]+)\]\(([^)]+)\)/g,
        replace: `<img alt="$1" src="$2">`
    },
    {
        regex: /\[([^\]]+)\]\(([^)]+)\)/g,
        replace: `<a href="$2">$1</a>`
    },
    {
        regex: /^>\s+(.+)/gm,
        replace: `<blockquote>$1</blockquote>`
    }
];

const escapeHTML = str =>
    str.replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;'
    }[c]));

const convertMarkdown = () => {
    let html = markdownInput.value;

    for (const rule of rules) html = html.replace(rule.regex, rule.replace);

    preview.innerHTML = html;
    htmlOutput.innerHTML = escapeHTML(html);
    return html;
}

markdownInput.addEventListener('input', convertMarkdown);

copyBtn.addEventListener('click', () => {
    try {
        navigator.clipboard.writeText(htmlOutput.innerHTML);
        copyBtn.textContent = 'Copied';
    } catch {
        copyBtn.textContent = 'Copy failed';
    }
});