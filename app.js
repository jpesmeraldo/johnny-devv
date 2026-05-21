// ==========================================================================
// JOHNNY DEVV (JD) - LÓGICA DE INTERATIVIDADE DO DASHBOARD
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const textBriefing = document.getElementById('briefing-text');
  const charsBriefing = document.getElementById('briefing-chars');
  const chatHistory = document.getElementById('chat-history');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const codeBlock = document.getElementById('code-block');
  const currentFileName = document.getElementById('current-file-name');
  const langBadge = document.getElementById('lang-badge');
  
  // Elementos do Dialog HITL
  const hitlDialog = document.getElementById('hitl-dialog');
  const hitlDesc = document.getElementById('hitl-desc');
  const hitlCommand = document.getElementById('hitl-command');
  const hitlApproveBtn = document.getElementById('hitl-approve-btn');
  const hitlRejectBtn = document.getElementById('hitl-reject-btn');

  // Elementos de Ação do Editor (Cópia e Download)
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');

  // Variáveis de Controle de Estado
  let isTypingCode = false;
  let activeMock = null; // Armazena a solução de código ativa no editor

  // 1. CARREGAMENTO E VALIDAÇÃO DO DAILY BRIEFING DE IA (JD Briefing)
  // Limite rígido: 300 caracteres de texto visível
  const initDailyBriefing = () => {
    const rawBriefingText = "🤖 Gemini 1.5 Pro expande janela de contexto para 2M de tokens. OpenAI apresenta o GPT-4o mini, otimizado para agentes rápidos e de baixo custo. GitHub lança Copilot Workspace para workflows interativos de ponta a ponta. Fontes: [HuggingFace](https://huggingface.co) | [arXiv](https://arxiv.org)";
    
    // Calcula caracteres visíveis (removendo a marcação markdown dos links)
    const visibleText = rawBriefingText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Extrai apenas o texto entre colchetes dos links
    
    const charCount = visibleText.length;
    charsBriefing.textContent = `${charCount}/300`;

    if (charCount > 300) {
      console.warn("Alerta: O briefing diário do JD excedeu 300 caracteres visíveis!");
      charsBriefing.style.color = "var(--accent-red)";
    } else {
      charsBriefing.style.color = "var(--text-muted)";
    }

    // Renderiza o markdown simples de links para HTML
    const htmlBriefing = rawBriefingText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    textBriefing.innerHTML = htmlBriefing;
  };

  // 2. MOCK DATA - RESPOSTAS DO JOHNNY DEVV (Estilo Hacker Ágil)
  const codeMocks = {
    javascript: {
      fileName: "server.js",
      badge: "JAVASCRIPT",
      command: "node server.js",
      desc: "Iniciar servidor Node.js com Express e rotas de monitoramento de performance na porta 3000.",
      code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de tempo de resposta (Hacker style)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.path} - \${duration}ms\`);
  });
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'active', agent: 'Johnny Devv', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(\`⚡ JD Server rodando liso na porta \${PORT}\`);
});`
    },
    python: {
      fileName: "binary_search.py",
      badge: "PYTHON",
      command: "python binary_search.py --test",
      desc: "Executar suite de testes rápidos para validação do algoritmo otimizado de busca binária O(log n).",
      code: `def binary_search(arr: list, target: int) -> int:
    """Busca binária ultra-rápida. Retorna o índice ou -1 se não encontrar."""
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]
        if guess == target:
            return mid
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1

# Massa de testes limpa
if __name__ == "__main__":
    test_array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    target_val = 23
    idx = binary_search(test_array, target_val)
    print(f"🎯 Alvo {target_val} localizado no índice: {idx}")`
    },
    go: {
      fileName: "main.go",
      badge: "GO",
      command: "go run main.go",
      desc: "Compilar e rodar concorrência nativa em Go para processar logs de sistema paralelamente.",
      code: `package main

import (
	"fmt"
	"sync"
	"time"
)

func processLog(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("👷 [JD-Worker-%d] Iniciando análise de logs...\\n", id)
	time.Sleep(time.Duration(100 * id) * time.Millisecond) // Simula IO
	fmt.Printf("✅ [JD-Worker-%d] Análise concluída com sucesso.\\n", id)
}

func main() {
	var wg sync.WaitGroup
	workers := 3

	fmt.Println("🚀 Inicializando pool de workers concorrência JD...")
	for i := 1; i <= workers; i++ {
		wg.Add(1)
		go processLog(i, &wg)
	}
	wg.Wait()
	fmt.Println("⚡ Todos os logs processados com concorrência perfeita!")
}`
    },
    generic: {
      fileName: "devv_script.sh",
      badge: "SHELL",
      command: "./devv_script.sh --all",
      desc: "Executar rotina automatizada de limpeza de lixo do workspace e compilação incremental.",
      code: `#!/usr/bin/env bash
# Script automatizado pelo Johnny Devv (JD)

set -euo pipefail
echo "🧹 Limpando caches e builds anteriores..."
rm -rf ./dist ./build ./*.log

echo "📦 Instalando dependências críticas em paralelo..."
npm install --no-audit --silent

echo "🔥 Rodando build incremental..."
npm run build --minify

echo "✨ Tudo pronto. Código compilado."`
    }
  };

  // 3. AUXILIAR: RENDERIZAÇÃO DE SYNTAX HIGHLIGHTING SIMPLES
  const highlightCode = (code, lang) => {
    // Escapa HTML básico
    let html = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Adiciona classes para colorir palavras-chave e elementos
    if (lang === 'javascript' || lang === 'go') {
      html = html
        .replace(/\b(const|let|var|function|return|import|package|func|go|select|chan|struct|interface|for|if|else|switch|case|default|while|process)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
        .replace(/\b(express|get|listen|use|log|Printf|Println|Wait|Add|Done)\b/g, '<span class="code-function">$1</span>');
    } else if (lang === 'python') {
      html = html
        .replace(/\b(def|class|return|import|from|for|while|if|else|elif|in|is|and|or|not|__name__|__main__|print)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(["'])(.*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/(#.*)/g, '<span class="code-comment">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
        .replace(/\b(binary_search|len|print)\b/g, '<span class="code-function">$1</span>');
    } else {
      // Shell / Genérico
      html = html
        .replace(/\b(set|echo|rm|npm|run|install|build|if|then|fi)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(["'])(.*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/(#.*)/g, '<span class="code-comment">$1</span>')
        .replace(/\b(--\w+)\b/g, '<span class="code-function">$1</span>');
    }
    
    return html;
  };

  // 4. ANIMAÇÃO DE DIGITAÇÃO HACKER NO EDITOR DE CÓDIGO
  const typeCodeAnimation = (mock, callback) => {
    isTypingCode = true;
    codeBlock.innerHTML = "";
    currentFileName.textContent = mock.fileName;
    langBadge.textContent = mock.badge;

    // Desativa botões de ação enquanto digita nova solução
    copyBtn.classList.remove('active');
    downloadBtn.classList.remove('active');
    activeMock = null;

    const fullCode = mock.code;
    let currentLength = 0;
    
    // Digita em blocos de caracteres para simular digitação hacker rápida de tela
    const typingInterval = setInterval(() => {
      // Pega de 6 em 6 caracteres para alta velocidade
      currentLength += 6;
      if (currentLength >= fullCode.length) {
        currentLength = fullCode.length;
        clearInterval(typingInterval);
        codeBlock.innerHTML = highlightCode(fullCode, mock.badge.toLowerCase());
        isTypingCode = false;
        
        // Habilita e exibe os botões de copiar e baixar
        activeMock = mock;
        copyBtn.classList.add('active');
        downloadBtn.classList.add('active');
        
        if (callback) callback();
      } else {
        const partialCode = fullCode.substring(0, currentLength);
        codeBlock.innerHTML = highlightCode(partialCode, mock.badge.toLowerCase());
        // Auto scroll do editor se crescer muito
        codeBlock.parentElement.scrollTop = codeBlock.parentElement.scrollHeight;
      }
    }, 15);
  };

  // 5. ADICIONAR MENSAGENS AO CHAT
  const addMessage = (sender, text, type = 'normal') => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    
    if (sender === 'JD') {
      msgDiv.classList.add('jd-msg');
    } else if (sender === 'USER') {
      msgDiv.classList.add('user-msg');
    } else {
      msgDiv.classList.add('system-msg');
    }

    if (type === 'system') {
      msgDiv.innerHTML = `<div class="msg-meta">${text}</div>`;
    } else {
      msgDiv.innerHTML = `
        <div class="msg-sender">${sender}</div>
        <div class="msg-text">${text}</div>
      `;
    }

    chatHistory.appendChild(msgDiv);
    
    // Auto scroll do chat
    chatHistory.scrollTop = chatHistory.scrollHeight;
  };

  // 6. DISPARO E GERENCIAMENTO DO MODAL HITL (Human In The Loop)
  let currentActionResolve = null;

  const triggerHITLApproval = (mock) => {
    return new Promise((resolve) => {
      // Armazena a função resolve para ser chamada nos botões do modal
      currentActionResolve = resolve;
      
      // Atualiza os dados do modal HITL
      hitlDesc.textContent = `O agente JD gerou o código em ${mock.badge} no editor lateral e solicita sua aprovação humana para rodar a rotina de verificação no workspace.`;
      hitlCommand.textContent = mock.command;

      // Abre o modal nativo usando showModal() para foco preso e top layer
      hitlDialog.showModal();
    });
  };

  // Event Listeners dos botões do Modal HITL
  hitlApproveBtn.addEventListener('click', () => {
    hitlDialog.close();
    if (currentActionResolve) {
      currentActionResolve(true);
      currentActionResolve = null;
    }
  });

  hitlRejectBtn.addEventListener('click', () => {
    hitlDialog.close();
    if (currentActionResolve) {
      currentActionResolve(false);
      currentActionResolve = null;
    }
  });

  // 7. FALLBACK DE LIGHT-DISMISS PARA DIALOGS (Seguindo diretrizes Modern Web)
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    hitlDialog.addEventListener('click', (event) => {
      // Se clicou no dialog em si, pode ter sido no backdrop
      if (event.target !== hitlDialog) return;

      const rect = hitlDialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      // Se clicou fora da caixa do modal, fecha e resolve como falso (rejeitado)
      if (!isDialogContent) {
        hitlDialog.close();
        if (currentActionResolve) {
          currentActionResolve(false);
          currentActionResolve = null;
        }
      }
    });
  }

  // 8. ENVIO DO FORMULÁRIO DO TERMINAL (FLUXO COMPLETO)
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (isTypingCode) return; // Evita submeter enquanto digita o código

    const userInput = terminalInput.value.trim();
    if (!userInput) return;

    // Adiciona a mensagem do usuário no chat
    addMessage('USER', userInput);
    terminalInput.value = "";

    // Simula tempo de raciocínio do JD
    setTimeout(() => {
      // Analisa o input do usuário para escolher o mock de linguagem
      const text = userInput.toLowerCase();
      let chosenMock = codeMocks.generic;
      let languageName = "Shell Script";

      if (text.includes('js') || text.includes('javascript') || text.includes('node') || text.includes('express')) {
        chosenMock = codeMocks.javascript;
        languageName = "JavaScript";
      } else if (text.includes('py') || text.includes('python') || text.includes('busca') || text.includes('algoritmo')) {
        chosenMock = codeMocks.python;
        languageName = "Python";
      } else if (text.includes('go') || text.includes('golang') || text.includes('worker') || text.includes('concorr')) {
        chosenMock = codeMocks.go;
        languageName = "Go (Golang)";
      }

      // JD responde em estilo hacker ágil
      addMessage('JD', `Entendido. Gerando solução direta em **${languageName}**. Analise o código no editor lateral.`);

      // Inicia a animação de digitação rápida
      typeCodeAnimation(chosenMock, () => {
        // Quando a animação de digitação termina, JD solicita aprovação HITL no chat e abre o Dialog
        setTimeout(async () => {
          addMessage('JD', `Código estruturado com sucesso no arquivo \`${chosenMock.fileName}\`. Solicitei permissão no painel de aprovação HITL para rodar o comando: \`${chosenMock.command}\`.`);
          
          // Abre o Modal HITL e aguarda a decisão do usuário (Promise)
          const approved = await triggerHITLApproval(chosenMock);
          
          // Processa a decisão do usuário
          if (approved) {
            addMessage('SYSTEM', `[HITL APPROVED]: Ação "${chosenMock.command}" autorizada pelo usuário.`, 'system');
            
            setTimeout(() => {
              addMessage('JD', `Show! Comando executado. Testes rodaram 100% sem erros. Código compilado com sucesso e pronto para deploy.`);
            }, 800);
          } else {
            addMessage('SYSTEM', `[HITL REJECTED]: Execução de "${chosenMock.command}" cancelada pelo usuário.`, 'system');
            
            setTimeout(() => {
              addMessage('JD', `Perfeito. Operação abortada. Alterações salvas como rascunho no editor. Quer que eu faça algum ajuste na lógica?`);
            }, 800);
          }
        }, 500);
      });

    }, 600);
  });

  // 9. LÓGICA DE INTERAÇÃO DOS BOTÕES DE COPIAR E BAIXAR
  copyBtn.addEventListener('click', () => {
    if (!activeMock) return;

    navigator.clipboard.writeText(activeMock.code)
      .then(() => {
        // Feedback visual premium ao usuário
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "COPIADO! ⚡";
        copyBtn.style.borderColor = "var(--accent-green)";
        copyBtn.style.color = "var(--accent-green)";

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.borderColor = "";
          copyBtn.style.color = "";
        }, 1500);
      })
      .catch(err => {
        console.error('Erro ao copiar código: ', err);
      });
  });

  downloadBtn.addEventListener('click', () => {
    if (!activeMock) return;

    // Constrói o conteúdo Markdown limpo e estilizado
    const markdownContent = `# Johnny Devv (JD) - Solução de Código

**Arquivo:** \`${activeMock.fileName}\`
**Linguagem:** ${activeMock.badge}

## Descrição da Solução
${activeMock.desc}

## Código Fonte
\`\`\`${activeMock.badge.toLowerCase()}
${activeMock.code}
\`\`\`

---
*Gerado automaticamente pelo agente Johnny Devv (JD) no Dashboard de Operações.*`;

    // Cria o Blob e dispara o download do arquivo .md
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    // Define o nome do arquivo com a extensão .md a partir do nome original
    const baseName = activeMock.fileName.substring(0, activeMock.fileName.lastIndexOf('.')) || activeMock.fileName;
    link.download = `${baseName}_jd_solucao.md`;
    
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Feedback visual premium ao usuário
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "BAIXADO! 📂";
    downloadBtn.style.borderColor = "var(--accent-green)";
    downloadBtn.style.color = "var(--accent-green)";

    setTimeout(() => {
      downloadBtn.textContent = originalText;
      downloadBtn.style.borderColor = "";
      downloadBtn.style.color = "";
    }, 1500);
  });

  // Inicializa o Dashboard
  initDailyBriefing();
});
