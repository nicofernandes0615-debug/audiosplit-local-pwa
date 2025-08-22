[README.md](https://github.com/user-attachments/files/21942601/README.md)
# StemSplit Pro - Separação de Instrumentos Musicais

![StemSplit Pro Logo](src/assets/logo.png)

## 🎵 Visão Geral

O **StemSplit Pro** é um aplicativo web completo para separação automática de instrumentos musicais usando Inteligência Artificial. Desenvolvido para músicos, produtores, DJs e estudantes de música, oferece uma interface moderna e intuitiva para criar playbacks personalizados para treinamento musical.

### ✨ Funcionalidades Principais

- 🎯 **Separação Automática de Instrumentos**: Vocal, guitarra solo, guitarra base, bateria, contrabaixo, piano/teclado e outros
- 🎨 **Interface Moderna**: Design responsivo com temas claro e escuro
- ⚡ **Processamento Rápido**: Upload por drag & drop e processamento em tempo real
- 🔐 **Sistema de Autenticação**: Registro, login e gerenciamento de perfil seguro
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🎧 **Player Integrado**: Preview e controle de reprodução dos stems gerados
- 💾 **Download Individual**: Baixe cada instrumento separadamente
- 🚀 **Pronto para Comercialização**: Integração com Hotmart e sistema de planos

## 🛠️ Tecnologias Utilizadas

### Backend
- **Flask 3.1.1** - Framework web Python
- **SQLAlchemy** - ORM para banco de dados
- **JWT** - Autenticação baseada em tokens
- **Flask-CORS** - Suporte a CORS
- **Pydub** - Manipulação de áudio
- **SQLite** - Banco de dados (desenvolvimento)

### Frontend
- **React 18.3.1** - Biblioteca JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones SVG
- **Vite** - Build tool e dev server

### Processamento de Áudio (Futuro)
- **Spleeter** - Separação de fontes musicais (Deezer)
- **Demucs** - Modelo de separação de áudio (Facebook Research)
- **Librosa** - Análise de áudio em Python

## 📁 Estrutura do Projeto

```
stemsplit-backend/
├── src/
│   ├── models/
│   │   └── user.py              # Modelos User e AudioJob
│   ├── routes/
│   │   ├── auth.py              # Autenticação (login, registro, perfil)
│   │   ├── audio.py             # Processamento de áudio
│   │   └── user.py              # Gerenciamento de usuários
│   ├── static/                  # Frontend React buildado
│   │   ├── assets/              # CSS, JS e imagens
│   │   └── index.html           # Página principal
│   ├── database/
│   │   └── app.db              # Banco SQLite
│   └── main.py                 # Aplicação Flask principal
├── venv/                       # Ambiente virtual Python
├── requirements.txt            # Dependências Python
└── README.md                   # Esta documentação

stemsplit-frontend/
├── src/
│   ├── components/
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── assets/                 # Imagens e recursos
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Entry point
├── public/                     # Arquivos públicos
├── package.json                # Dependências Node.js
└── vite.config.js             # Configuração Vite
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Python 3.11+
- Node.js 20.18.0+
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/stemsplit-pro.git
cd stemsplit-pro
```

### 2. Configuração do Backend
```bash
cd stemsplit-backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Executar aplicação
python src/main.py
```

### 3. Configuração do Frontend (Desenvolvimento)
```bash
cd stemsplit-frontend

# Instalar dependências
pnpm install

# Executar servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### 4. Variáveis de Ambiente
```bash
# .env
SECRET_KEY=sua-chave-secreta-super-segura
FLASK_ENV=development
DATABASE_URL=sqlite:///app.db
```

## 📚 APIs Disponíveis

### Autenticação (`/api/auth/`)

#### POST `/api/auth/register`
Registro de novo usuário
```json
{
  "username": "usuario",
  "email": "email@exemplo.com",
  "password": "MinhaSenh@123",
  "first_name": "Nome",
  "last_name": "Sobrenome"
}
```

#### POST `/api/auth/login`
Login de usuário
```json
{
  "username": "usuario",
  "password": "MinhaSenh@123"
}
```

#### GET `/api/auth/profile`
Obter perfil do usuário (requer autenticação)
```bash
Authorization: Bearer <jwt_token>
```

### Processamento de Áudio (`/api/audio/`)

#### POST `/api/audio/upload`
Upload de arquivo de áudio
```bash
Content-Type: multipart/form-data
audio: <arquivo_de_audio>
```

#### POST `/api/audio/separate`
Iniciar separação de instrumentos
```json
{
  "job_id": "uuid-do-job",
  "instruments": ["vocals", "drums", "bass", "guitar_lead"]
}
```

#### GET `/api/audio/status/<job_id>`
Verificar status do processamento
```json
{
  "status": "processing",
  "progress": 75,
  "instruments": ["vocals", "drums"]
}
```

## 🎨 Interface do Usuário

### Tela Principal
- **Upload Zone**: Área de drag & drop para arquivos de áudio
- **Seleção de Instrumentos**: Cards visuais para escolher instrumentos
- **Player de Áudio**: Controles de reprodução com visualização de onda
- **Barra de Progresso**: Acompanhamento do processamento em tempo real
- **Resultados**: Lista de stems gerados com preview e download

### Funcionalidades da Interface
- ✅ Tema claro/escuro alternável
- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves e micro-interações
- ✅ Feedback visual para todas as ações
- ✅ Validação de formulários em tempo real
- ✅ Estados de loading e erro tratados

## 🔐 Sistema de Autenticação

### Funcionalidades Implementadas
- **Registro de Usuário**: Validação completa de dados
- **Login Seguro**: Autenticação JWT com expiração
- **Gerenciamento de Perfil**: Atualização de dados pessoais
- **Alteração de Senha**: Validação de senha atual
- **Recuperação de Senha**: Estrutura pronta para implementação
- **Controle de Sessão**: Tokens com renovação automática

### Segurança
- Hash de senhas com Werkzeug
- Tokens JWT com expiração configurável
- Validação rigorosa de entrada
- Proteção contra ataques comuns (SQL injection, XSS)
- Rate limiting para APIs sensíveis

## 💰 Planos de Comercialização

### Plano Gratuito
- 3 uploads por mês
- Músicas até 5 minutos
- Qualidade padrão (MP3 128kbps)
- Marca d'água nos exports

### Plano Premium (R$ 29,90/mês)
- Uploads ilimitados
- Músicas até 15 minutos
- Qualidade alta (WAV/FLAC)
- Sem marca d'água
- Suporte prioritário

### Plano Pro (R$ 297,00/ano)
- Todos os benefícios Premium
- API para desenvolvedores
- Batch processing
- Relatórios de uso

### Plano Lifetime (R$ 997,00)
- Acesso vitalício
- Todas as funcionalidades
- Atualizações gratuitas
- Suporte VIP

## 🚀 Deploy em Produção

### Opções de Hospedagem
1. **Heroku** - Deploy simples com git
2. **DigitalOcean App Platform** - Escalabilidade automática
3. **AWS Elastic Beanstalk** - Infraestrutura robusta
4. **VPS/Servidor Dedicado** - Controle total

### Configuração Nginx
```nginx
server {
    listen 80;
    server_name stemsplit.com;
    
    location / {
        proxy_pass http://127.0.0.1:5002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    client_max_body_size 100M;
}
```

### SSL com Let's Encrypt
```bash
sudo certbot --nginx -d stemsplit.com
```

## 📊 Monitoramento e Analytics

### Métricas Importantes
- Taxa de conversão (gratuito → pago)
- Tempo de processamento médio
- Satisfação do usuário (NPS)
- Churn rate mensal
- Uso de recursos (CPU, memória)

### Ferramentas Recomendadas
- **Google Analytics** - Comportamento do usuário
- **Sentry** - Monitoramento de erros
- **New Relic** - Performance da aplicação
- **Mixpanel** - Eventos customizados

## 🔄 Roadmap de Funcionalidades

### Próximos 3 Meses
- [ ] Integração real com Spleeter/Demucs
- [ ] Separação de mais instrumentos (saxofone, violino)
- [ ] Modo batch (múltiplos arquivos)
- [ ] API REST completa

### Próximos 6 Meses
- [ ] App mobile (React Native)
- [ ] Integração com DAWs (Ableton, FL Studio)
- [ ] Marketplace de stems
- [ ] Colaboração em tempo real

### Próximos 12 Meses
- [ ] Separação em tempo real (streaming)
- [ ] Reconhecimento automático de acordes
- [ ] Transcrição musical automática
- [ ] Plataforma de ensino integrada

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **Python**: PEP 8
- **JavaScript**: ESLint + Prettier
- **Commits**: Conventional Commits
- **Testes**: Pytest (backend) + Jest (frontend)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

### Canais de Atendimento
- **Email**: suporte@stemsplit.com
- **Chat**: Disponível no aplicativo
- **Documentação**: [docs.stemsplit.com](https://docs.stemsplit.com)
- **FAQ**: [help.stemsplit.com](https://help.stemsplit.com)

### Comunidade
- **Discord**: [discord.gg/stemsplit](https://discord.gg/stemsplit)
- **Telegram**: [@stemsplit_br](https://t.me/stemsplit_br)
- **YouTube**: [Canal StemSplit](https://youtube.com/stemsplit)

## 🙏 Agradecimentos

- **Deezer Research** - Pela tecnologia Spleeter
- **Facebook Research** - Pelo modelo Demucs
- **Comunidade Open Source** - Pelas bibliotecas utilizadas
- **Beta Testers** - Pelo feedback valioso

---

**Desenvolvido com ❤️ para a comunidade musical brasileira**

*StemSplit Pro - Transformando a forma como músicos treinam e criam*

