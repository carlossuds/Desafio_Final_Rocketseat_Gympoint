# Frontend do Desafio Final

- Aqui temos as telas que foram requisitadas e suas funcionalidades:

<p align="center">
  <img width="256" height="256" src="../gostack-256x256.png">
</p>

## 1. SignIn

- Nessa tela o Usuário tem acesso à aplicação inserindo suas credenciais

## 2. 'Students' - Lista de Alunos cadastrados

- Aqui estão listados todos Alunos cadastrados na aplicação
- O usuário pode optar por :

1. cadastrar um novo Aluno;
2. editar os dados ou;
3. apagar algum Aluno já existente (apenas SE o aluno não estiver matriculado)

## 3. 'StudentCreate' - Cadastro de Aluno

- O usuário pode cadastrar um novo Aluno no sistema informando seu nome, e-mail, idade, peso e altura

## 4. 'StudentEdit' - Edição de Aluno

- A tela inicializa com os dados do Aluno previamente selecionado na tela de listagem

## 5. 'Plans' - Lista de Planos cadastrados

- Aqui estão listados todos Planos cadastrados na aplicação
- O usuário pode optar por :

1. cadastrar um novo Plano;
2. editar os dados ou;
3. apagar algum Plano já existente (apenas SE o Plano não estiver sendo usado em nenhuma Matrícula)

## 6. 'PlanCreate' - Cadastro de Plano

- O usuário pode cadastrar um novo Plano no sistema informando seu título, duração e preço mensal. O preço total será calculado automaticamente baseado na duração x mensalidade.

## 7. 'PlanEdit' - Edição de Plano

- A tela inicializa com os dados do Plano previamente selecionado na tela de listagem

## 8. 'Registrations' - Lista de alunos Matrículas

- Aqui estão listados todas Matrículas cadastrados na aplicação
- O usuário pode optar por :

1. cadastrar uma nova Matrículas;
2. editar os dados ou;
3. apagar alguma Matrículas já existente (apenas SE a Matrícula estiver inativa)

## 9. 'RegistrationCreate' - Cadastro de Matrícula

- Nessa tela eu me atrapalhei demais com os componentes do React-Select dentro do unform e por isso talvez tenha ficado bastante bagunçado o código.

## 10. 'RegistrationEdit' - Lista de Matrículas cadastradas

- A tela inicializa com os dados da Matrícula previamente selecionada na tela de listagem
- Obs: Nessa tela o campo de Data de início não recebe os dados por ser do tipo date e não text, e é obrigatório para o envio correto do formulário.

## 11. 'HelpOrders' - Lista de Pedidos de Auxílio

- Aqui estão todos Pedidos de Auxílio feitos pelos Alunos
- O usuário pode optar por responder, abrindo um modal com a Pergunta e uma caixa de texto para Resposta
