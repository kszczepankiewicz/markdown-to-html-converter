const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

const convertMarkdown = () => {
    let replaced = markdownInput.value;
    // heading
    replaced = replaced.replace(/^(#+) (.+)$/gm, (_, level, text) => `<h${level.length}>${text}</h${level.length}>`);
    // strong
    replaced = replaced.replace(/(\*\*|__)(.+)\1/gm, (_, __, text) => `<strong>${text}</strong>`);
    // em
    replaced = replaced.replace(/(\*|_)(.+)\1/gm, (_, __, text) => `<em>${text}</em>`);
    // img
    replaced = replaced.replace(/!\[(.+)\]\((.+)\)/gm, (_, altText, imageSource) => `<img alt="${altText}" src="${imageSource}">`);
    // a
    replaced = replaced.replace(/\[(.+)\]\((.+)\)/gm, (_, linkText, url) => `<a href="${url}">${linkText}</a>`);
    // blockquote
    replaced = replaced.replace(/^> (.+)/gm, (_, quote) => `<blockquote>${quote}</blockquote>`);
    htmlOutput.textContent = replaced;
    preview.innerHTML = replaced;
    return replaced;
}

markdownInput.addEventListener('input', convertMarkdown);