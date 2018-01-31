import showdown from 'showdown'
import highlightjs from 'highlightjs'

showdown.extension('codehighlight', function () {
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        // use new shodown's regexp engine to conditionally parse codeblocks
        const left = '<pre><code\\b[^>]*>'
        const right = '</code></pre>'
        const flags = 'g'
        const replacement = function (wholeMatch, match, left, right) {
          // unescape match to prevent double escaping
          match = match
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
          // add color to text
          if (left.includes('class="')) {
            left = left.replace('class="', 'class="hljs ')
            return left + highlightjs.highlightAuto(match).value + right
          } else {
            left = left.replace('<code', '<code class="hljs"')
            return left + match + right
          }
        }
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags)
      }
    }
  ]
})

showdown.setFlavor('github')
showdown.setOption('openLinksInNewWindow', 'true')

export default new showdown.Converter({ extensions: ['codehighlight'] })
