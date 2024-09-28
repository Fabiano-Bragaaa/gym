# 🏋️‍♂️ Exercícios App

Este é um projeto focado no gerenciamento e acompanhamento de **exercícios diários**, desenvolvido com **React Native** e uma **API REST**. O objetivo é proporcionar uma experiência eficiente para o usuário registrar e visualizar seus treinos, utilizando conceitos avançados de **token** e **refresh token**.

## 📱 Funcionalidades

- **Autenticação Segura**: O usuário cria uma conta, e os dados são enviados ao banco de dados junto com o token de autenticação. O token expira em 1 dia, mas a estratégia de **refresh token** permite que o usuário permaneça autenticado sem precisar fazer login novamente.
- **Registro de Exercícios**: O usuário pode cadastrar os exercícios feitos no dia e visualizar todos os treinos já realizados, junto com as datas correspondentes.
- **Gerenciamento de Perfil**: O usuário pode alterar o nome e senha, mas o email permanece fixo por questões de segurança. Também é possível atualizar a foto de perfil, com a imagem sendo enviada para a API e exibida dinamicamente.
- **Validação de Formulários**: Implementada com **React Hook Form** e **Yup** para garantir a consistência dos dados.
- **Feedback Visual com Toasts**: Toasts são utilizados para fornecer feedback visual em diversas ações, como sucesso ou erro.
- **Estilização Moderna**: A estilização foi feita com **GluestackUI**, que proporciona componentes estilizados e flexíveis.

## 🚀 Tecnologias Usadas

- **React Native** (0.74.5)
- **React Hook Form** (7.53.0)
- **Yup** (1.4.0)
- **Axios** (1.7.7)
- **Firebase** (para autenticação e banco de dados)
- **Expo** (File System, Font, Image Picker, Status Bar)
- **React Navigation** (navegação entre telas)
- **GluestackUI** (estilização de componentes)
- **AsyncStorage** (armazenamento local)
- **Lucide-react-native** (ícones)

## 📄 Estrutura das Telas

- **Tela Home**: Exibe todos os exercícios registrados, com busca em tempo real para filtrar atividades por data.
- **Tela de Detalhes**: Mostra detalhes sobre cada exercício, como data e tipo de atividade.
- **Tela de Perfil**: Permite ao usuário atualizar suas informações pessoais e a foto de perfil.
- **Tela de Favoritos**: Visualize exercícios marcados como favoritos para fácil acesso futuro.

  
## 🛠️ Tecnologias Utilizadas
- **React Native** (0.74.5)
- **Expo** (51.0.28)
- **React Hook Form** (7.53.0)
- **Yup** (1.4.0)
- **GluestackUI** (1.0.57)
- **Axios** (1.7.7)
- **React Navigation**
- **Lucide-react-native**

## 🛠️ Como Rodar o Projeto

### 1. Clonar o Repositório e Instalar Dependências

```bash
git clone https://github.com/Fabiano-Bragaaa/gym
cd gym
npm install
# ou
yarn install
```

### 2. Configurar Variáveis de Ambiente

```bash
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

### 3. Rodar o Projeto

```bash

npx expo start

```

## 🌟 Veja Como Ficou

Dê uma olhada no projeto em funcionamento e veja como tudo foi integrado de forma fluida e intuitiva. Acesse o site para conferir o resultado final.

https://www.linkedin.com/feed/update/urn:li:activity:7245533119582208001/
