const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

const convertMarkdown = () => {
    let html = markdownInput.value;
    // heading
    html = html.replace(/^(#+) (.+)$/gm, (_, level, text) => `<h${level.length}>${text}</h${level.length}>`);
    // strong
    html = html.replace(/(\*\*|__)(.+)\1/gm, (_, __, text) => `<strong>${text}</strong>`);
    // em
    html = html.replace(/(\*|_)(.+)\1/gm, (_, __, text) => `<em>${text}</em>`);
    // img
    html = html.replace(/!\[(.+)\]\((.+)\)/gm, (_, altText, imageSource) => `<img alt="${altText}" src="${imageSource}">`);
    // a
    html = html.replace(/\[(.+)\]\((.+)\)/gm, (_, linkText, url) => `<a href="${url}">${linkText}</a>`);
    // blockquote
    html = html.replace(/^> (.+)/gm, (_, quote) => `<blockquote>${quote}</blockquote>`);
    htmlOutput.textContent = html;
    preview.innerHTML = html;
    return html;
}

markdownInput.addEventListener('input', convertMarkdown);