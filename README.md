<p align="center">
  <a href="https://letmeask.yanlyra.com.br/">
    <img src=".github/logo.svg"/>
  </a>
</p>

# Tabela de conteúdos

<!--ts-->

- [Tabela de conteúdos](#tabela-de-conteúdos)
- [Sobre](#sobre)
- [Pré-requisitos](#pré-requisitos)
- [Instalando](#instalando)
- [Firebase](#firebase)
- [Iniciando](#iniciando)
- [Tecnologias](#tecnologias)
- [License](#license)
- [Extras](#extras)
<!--te-->

<p align="center">
  ----
  <a href="https://letmeask.yanlyra.com.br/">
    <img src=".github/cover.svg"/>
  </a>
</p>

## Sobre

Este projeto foi desenvolvido durante a [NLW#06](http://nextlevelweek.com/), apresentada dos dias 20 a 27 de Junho de 2021. O projeto serve para ajudar os criadores de conteúdo a organizar todas as perguntas do público em um único lugar.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e caso queria, indico a utilização do [Yarn](https://yarnpkg.com/). Além disso é bom ter um editor para trabalhar com o código, como por exemplo o [VSCode](https://code.visualstudio.com/)

## Instalando

```bash
# Clone este repositório
git clone <https://github.com/ylyra/letmeask>

# Acesse a pasta do projeto no terminal/cmd
cd letmeask

# Instale as dependências
npm install
# caso tenha instaldo o yarn rode o comando abaixo
yarn
```

## Firebase

Após clonarem o projeto e iniciarem o mesmo, será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database. Após criarem as configurações no Firebase crie um arquivo `.env.local` e preencha o mesmo com as informações que o firebase disponibilizou utilizando os nomes de váriaveis encontrato em `.env.example`.

## Iniciando

Após completarem o percurso anterior basta inicializarem o projeto com os comandos abaixo:

```bash
# Execute a aplicação em modo de desenvolvimento
npm run start
# ou
yarn start

# O projeto iniciará na porta :3000 para acessar ele no localhost basta ir em <http://localhost:3000>
```

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [React](https://pt-br.reactjs.org/)
- [Node Sass](https://github.com/sass/node-sass)
- [TypeScript](https://www.typescriptlang.org/)
- [Classames](https://github.com/JedWatson/classnames#readme)
- [Fast-sort](https://github.com/snovakovic/fast-sort)
- [Firebase](https://firebase.google.com/)
- [React-elmet](https://github.com/nfl/react-helmet#readme)
- [React-hook-form](https://www.react-hook-form.com/)
- [React-modal](https://github.com/reactjs/react-modal)
- [React-douter-dom](https://github.com/ReactTraining/react-router#readme)
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction)
- [use-context-selector](https://github.com/dai-shi/use-context-selector#readme)

## License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

# Extras

- Lista de questões ordenada (caso esteja marcada
  como highlighted vai para o topo e caso marcada como answered para o final da lista e existe uma ordenação no meio para as mais votadas).
- Login com google na página room.

- Criação de cores como var no global.scss.

- Uso do react-helmet para SEO.

- Implementação do react-toastify para toast
  elegantes.
- Implementação do react-modal para melhores modais.

- Implementação do react-hook-form para integrar
  formulários e não ter renderização desnecessária.
- Implementação do use-context-selector para melhor
  desempenho e para testar do mesmo.
- Responsividade do site.

---

<p align="center">
  <a href="https://letmeask.yanlyra.com.br/">
    <img src="https://img.shields.io/static/v1?label=Site&message=LetMeAsk&color=7159c1&style=for-the-badge&logo=ghost"/>
  </a>
</p>
