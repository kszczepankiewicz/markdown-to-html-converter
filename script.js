const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

const convertMarkdown = () => {
    let html = markdownInput.value;
    // heading
    html = html.replace(/^(#+) (.+)$/gm, (_, level, text) => `<h${level.length}>${text}</h${level.length}>`);
    // strong
    html = html.replace(/(\*\*|__)(.+)\1/gm, `<strong>$2</strong>`);
    // em
    html = html.replace(/(\*|_)(.+)\1/gm, `<em>$2</em>`);
    // img
    html = html.replace(/!\[(.+)\]\((.+)\)/gm, `<img alt="$1" src="$2">`);
    // a
    html = html.replace(/\[(.+)\]\((.+)\)/gm, `<a href="$2">$1</a>`);
    // blockquote
    html = html.replace(/^> (.+)/gm, `<blockquote>$1</blockquote>`);
    htmlOutput.textContent = html;
    preview.innerHTML = html;
    return html;
}

markdownInput.addEventListener('input', convertMarkdown);