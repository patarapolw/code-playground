import CodeMirror from 'codemirror'
// import VConsole from 'vconsole'
import { render, h } from 'preact'
import htm from 'htm'
// @ts-ignore
import safeEval from 'safe-eval'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/yaml/yaml.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter.js'
import 'codemirror/mode/pug/pug.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/theme/monokai.css'

const html = htm.bind(h)

const textAreaEl = document.getElementById('editor') as HTMLTextAreaElement

const cm = CodeMirror.fromTextArea(textAreaEl, {
  theme: 'monokai',
  lineNumbers: true,
  autoCloseBrackets: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  lineWrapping: true,
  tabSize: 2,
  extraKeys: {
    'Cmd-/': 'toggleComment',
    'Ctrl-/': 'toggleComment',
    Tab: (cm: CodeMirror.Editor) => {
      const spaces = Array(cm.getOption('indentUnit')! + 1).join(' ')
      cm.getDoc().replaceSelection(spaces)
    }
  },
  foldGutter: true,
  mode: 'javascript'
})

cm.setSize('100%', '100%')

const App = () => {
  return html`
  <div class="flex-horizontal control is-expanded">
    <div class="select is-fullwidth">
      <select class="control" onchange=${({ target }: {
        target: HTMLSelectElement
      }) => {
        cm.setOption('mode', target.value)
      }}>
        <option value="typescript">TypeScript</option>
        <option selected value="javascript">JavaScript</option>
        <option value="python">Python (Brython)</option>
      </select>
    </div>
    <div class="buttons">
      <button class="button" onclick=${() => {
        safeEval(cm.getValue())
      }}>
        <div class="icon">
          <i class="fas fa-play"></i>
        </div>
      </button>
    </div>
  </div>`
}

render(html`<${App}/>`, document.getElementById('Controls') as HTMLDivElement)
