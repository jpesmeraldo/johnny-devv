# ⚡ Johnny Devv (JD) — Dashboard de Operações

O **Johnny Devv (JD)** é uma aplicação web interativa de console projetada para simular a operação de um agente de programação ágil com personalidade "hacker". A interface foi desenvolvida seguindo os princípios de **Flat Design 2D** minimalista com foco máximo em destaque a interações e aprovações **HITL (Human-in-the-Loop)**.

---

## 🎨 Recursos Visuais & Funcionalidades

### 1. Daily IA Briefing
Localizado no topo do dashboard, exibe um resumo diário e ultra-curto (limite rígido de 300 caracteres) com as notícias de IA mais importantes do mundo, incluindo links clicáveis diretos para fontes de referência como HuggingFace, GitHub e arXiv.

### 2. Terminal Hacker Interativo (Chat)
Um chat simulado com o JD. Ao enviar comandos como requests de criação de código, o JD responde de forma direta e sem rodeios, explicando didaticamente apenas quando necessário.

### 3. Editor de Código Lateral Animado
Exibe a digitação acelerada do código gerado pelo JD em tempo real com realce de sintaxe (*syntax highlighting*) embutido para diversas linguagens (JavaScript, Python, Go, Shell Script).

### 4. Modal HITL (Human In The Loop) de Alta Prioridade
Quando uma ação de código é concluída, o painel de aprovação é disparado. Utilizando o elemento HTML5 nativo `<dialog>`, o modal bloqueia interações indesejadas e destaca visualmente a decisão que o usuário precisa tomar ("APROVAR E EXECUTAR" ou "RECUSAR ALTERAÇÃO").
* **Animações Fluidas**: Implementado com tecnologias de CSS moderno (**`@starting-style`**, **`transition-behavior: allow-discrete`** e transição de **`overlay`**) para garantir uma entrada/saída elegante do diálogo, sem bibliotecas pesadas.
* **Acessibilidade completa**: Suporta redução de movimento no sistema operacional (`prefers-reduced-motion`) simplificando as transições.

---

## 🛠️ Tecnologias Utilizadas

* **Estrutura**: HTML5 Semântico e nativo.
* **Estilização**: Vanilla CSS3 moderno baseado em variáveis HSL e sombras Neo-Brutais 2D sólidas.
* **Lógica**: JavaScript Vanilla (ES6+) assíncrono para manipulação de animações e Promises de fluxo de aprovação.

---

## 🚀 Como Executar Localmente

Você tem duas maneiras muito simples de testar e rodar o projeto:

### Método 1: Servidor Local (Recomendado)
Para evitar bloqueios de segurança de carregamento de arquivos locais (`file://`) em navegadores modernos, utilize o servidor local nativo do Python:

```bash
# Navegue até a pasta do projeto e inicie o servidor
python3 -m http.server 8000 --bind 127.0.0.1
```

Agora, abra seu navegador e acesse:
👉 **[http://localhost:8000](http://localhost:8000)**

### Método 2: Acesso Direto
1. Abra a pasta do projeto no seu explorador de arquivos (Finder ou Explorer).
2. Dê dois cliques no arquivo `index.html` ou arraste o arquivo diretamente para dentro de uma aba aberta do seu navegador.

---

## 🌎 Como Subir para o seu GitHub Pessoal

Se você deseja disponibilizar este projeto no seu GitHub ou fazer o deploy público via **GitHub Pages**, siga os comandos abaixo no seu terminal:

```bash
# 1. Vincule este repositório local ao seu repositório criado no GitHub
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# 2. Defina a branch principal como main
git branch -M main

# 3. Suba as alterações para a nuvem
git push -u origin main
```
