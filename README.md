



# Ubot_testeTécnico
 <p>Desafio técnico da ubots, nesse desafio consistia em criar um sistema FullStack com javascript que atendesse uma empresa do setor financeiro. Nesse desafio precisavamos criar um sistema que recebesse dados via api rest e direcionasse para as filas corretas, e vinculasse ao atendente o usuário da solicitação.</p> <br>
 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
 <p> O sistema tem mecânica CRUD (create, read, update e delete), autenticação, login e cadastro. Além de configurações adicionais</p><br>
- Frameworks, bibliotecas usadas e banco de dados<br>
<ul>
      <li>  Node.js  </li>
      <li>    Express </li>
      <li>    Axios   </li>
      <li>  Mongoose  </li>
      <li>  MongoDB  </li>
      <li>  Bootstrap5  </li>
      <li>    React.js </li>
            <li>   Typescript </li>
</ul>
<br>     
<h2>Principais mecânicas</h2>
- Sistema de Adm <br>
- Login <br>
- Sistema para cadastro, atualização e delete de leads <br>
<br>
<h2>Intalação Backend</h2>
<p>Para iniciar apenas o  backend digite no terminal:</p>
- cd backend > cd src > npm install > npm start.<br>

<h3>Uso da api do atendente</h3>
<p>Use as seguinte uri para manipular as requisições de atendimento: </p>
<br>
 - POST: http://localhost:4005/invext/cadastro  =>Cria o cadastro na plataforma, retorna o token de usuário.
 <br>

	{
	
			"nome":  "String",
			"email":  "String",
			"senha":  "String",
			"teams":  "String"

	}
				 
<br>
 - POST: http://localhost:4005/invext/login  =>Faz login no sistema, necessário para acessar as rotas, retorna o token criado no cadastro,

		{
			"email":  "ryanoliveiram2015@gmail.com",
			"senha":  "usuarior"
		}
				 
				 
<br>	 

 - POST: http://localhost:4005/invext/status => Mudar status do atendente, para mudar o status é necessário informar o cabeçalho do tipo: Authorization + token gerado
	
				
		{
			"status":  "Online"
		}
<br>

 - GET:http://localhost:4005/invest/user/info  => Retorna as informações do usuário. Retorna o nome, email... Para a chamada é necessário informar o token no cabeçalho da requisição sendo: authorization + token.

<hr>
<h3>Uso da api de usuário</h3><br>

 - POST: http://localhost:4005/invext/teams  => Enviar mensagem para fila de atendimento. São aceitos 3 campos, nome do usuário da requisição, texto contendo a conversa / solicitação e o time. Sendo o time permitido: cartoes, emprestimos e outros assuntos

		{
			"nome":"String",
			"texto": "String",
			"teams": "String"
		}
<br>

 - GET: http://localhost:4005/invest/mensagens/vizualizar  => Retorna os usuários vinculados ao atendente, retorna os usuários que estão esperando por atendimento, sendo que só serão aceito 3 usuários por atendentes. Para a requisição é necessário informar no header o token. Sendo a chamada contendo o header authorization + token.

<br>
<h2>Intalação Frontend</h2>

 1. Para instalar o frontend e o backend, basta abrir com o botão direito do mouse o arquivo "initialize",
 2. ![enter image description here](https://github.com/LordRyanII/Ubots_teste/blob/main/frontend/public/imagem/github-imagem/initializePowerShell.png) 3. Após basta acessar o link que retornará no initialize
 4.![enter image description here](https://github.com/LordRyanII/Ubots_teste/blob/main/frontend/public/imagem/github-imagem/capturaInicialInitialize.png)

<br>
<hr>
<h3>Capturas de tela:</h3>

![enter image description here](https://github.com/LordRyanII/Ubots_teste/blob/main/frontend/public/imagem/github-imagem/homePag.png)

![enter image description here](https://github.com/LordRyanII/Ubots_teste/blob/main/frontend/public/imagem/github-imagem/mensagensPag.png)
