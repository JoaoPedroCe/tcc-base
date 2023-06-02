# Sindalquim Painel Web
---

# 🚀 Rodando o Projeto

1. Renomeie o [.env.example] para [.env], por padrão `API_URL` vem com a url de `http://localhost:3333`, verifique a url da sua API e caso seja necessário troque somente a url.
2. Utilizando a `v14 do Node.js`, entre no diretório do projeto e execute o comando `yarn install` para instalar as dependências, após concluída execute o comando:
* `yarn dev`

A aplicação será aberta em: [localhost:3000](http://localhost:3000)

--- 
# 💻 Desenvolvimento

Para trabalhar em uma nova versão do projeto, siga os passos (para exemplo, simulo a v1.0.0):

1. Mude para a branch de desenvolvimento: git checkout develop.
2. Pegue as alterações que estão no repositório: git pull origin develop.
3. Crie uma branch com a versão que irá trabalhar, ex: git branch v1.0.0.
4. Faça o merge da branch develop com a sua: git merge develop.
5. Resolva os conflitos, se existirem.
6. Envie a branch criada localmente para o repositório: git push origin v1.0.0.
7. Abra o resposiório no GitLab, crie uma Pull Request da branch v1.0.0 para a branch develop.
8. Agora é só aguardar o Code Review e aprovação da PR.

---
# 🔨 Construído com

* [NextJs](https://nextjs.org/)
* [Ant Design](https://ant.design/docs/react/introduce)
