import CodeMirror from 'codemirror'
import typescript from 'typescript'
import tsconfig from '../tsconfig.json'

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

const cm = CodeMirror.fromTextArea(document.getElementById('cm') as HTMLTextAreaElement, {
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
  mode: 'text/javascript'
})

cm.setSize('100%', '100%')

// @ts-ignore
window.outputEl = document.getElementById('Output')

document.querySelectorAll('#lang-select').forEach((el) => {
  if (el instanceof HTMLSelectElement) {
    el.onchange = () => {
      cm.setOption('mode', el.value)
    }
  }
})

document.querySelectorAll('#lang-select-button').forEach((el) => {
  if (el instanceof HTMLButtonElement) {
    el.onclick = () => {
      let v = cm.getValue()
      const mode = cm.getOption('mode').split('/')[1]
      if (mode === 'typescript') {
        v = typescript.transpileModule(v, tsconfig as any).outputText
      }

      // eslint-disable-next-line no-eval
      eval(v)
    }
  }
})
