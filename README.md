# InstantReply - Full Stack Application

A modern, full-stack AI-powered review response generator built with React, TypeScript, Express, and PostgreSQL.

## 🎯 Features

- 🤖 **AI-Powered Responses**: Uses OpenAI GPT-3.5-turbo for intelligent responses
- 🎨 **Modern UI**: Glassmorphism design with gradient themes
- 💾 **Database Storage**: PostgreSQL with Drizzle ORM
- ⚡ **Real-time Updates**: React Query for optimistic updates
- 🎭 **Multiple Tones**: Professional, Apologetic, Witty, Firm but Fair
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- ✅ **Type-Safe**: Full TypeScript implementation
- 🔄 **Review History**: Store and retrieve past responses

## 📁 Project Structure

```
instant-reply-full/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── HistoryList.tsx
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── use-reviews.ts
│   │   │   └── use-toast.ts
│   │   ├── lib/             # Utilities
│   │   │   └── queryClient.ts
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx
│   │   │   └── not-found.tsx
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── server/                   # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── db.ts               # Database connection
├── shared/                  # Shared types and schemas
│   ├── schema.ts           # Database schema & validation
│   └── routes.ts           # API contract
├── drizzle.config.ts       # Drizzle ORM config
├── tsconfig.json           # TypeScript config
├── package.json            # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone and install dependencies:**

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install
cd ..
```

Or use the helper script:

```bash
npm run install:all
```

2. **Configure environment variables:**

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/instant_reply
AI_INTEGRATIONS_OPENAI_API_KEY=sk-your-key-here
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
PORT=5000
```

3. **Setup database:**

```bash
# Create database
createdb instant_reply

# Push schema to database
npm run db:push
```

4. **Start development servers:**

```bash
# Start both client and server
npm run dev

# Or start separately:
npm run dev:client  # Vite dev server on :5173
npm run dev:server  # Express server on :5000
```

Visit `http://localhost:5173`

## 📦 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **TanStack Query** - Server state management
- **Wouter** - Routing
- **Lucide React** - Icons
- **Zod** - Schema validation

### Backend

- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **OpenAI API** - AI responses
- **Zod** - Validation

## 🎨 UI Components

The application uses a custom glassmorphism design with:

- Glass panels with backdrop blur
- Gradient backgrounds
- Smooth animations
- Responsive layout
- Dark theme

Key CSS utilities:
- `.glass-panel` - Card with glass effect
- `.glass-input` - Input with glass effect

## 🔌 API Endpoints

### POST `/api/reviews/generate`

Generate AI response to a review.

**Request:**
```json
{
  "text": "The service was terrible!",
  "tone": "Apologetic"
}
```

**Response (201):**
```json
{
  "id": 1,
  "originalText": "The service was terrible!",
  "responseText": "We sincerely apologize...",
  "tone": "Apologetic",
  "createdAt": "2024-01-29T12:00:00.000Z"
}
```

### GET `/api/reviews`

Get review history (newest first).

**Response (200):**
```json
[
  {
    "id": 1,
    "originalText": "...",
    "responseText": "...",
    "tone": "Apologetic",
    "createdAt": "2024-01-29T12:00:00.000Z"
  }
]
```

## 🛠️ Development

### Available Scripts

**Root:**
- `npm run dev` - Start both client and server
- `npm run build` - Build both for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio

**Client:**
- `npm run dev:client` - Start Vite dev server
- `npm run build:client` - Build client for production

**Server:**
- `npm run dev:server` - Start Express with hot reload
- `npm run build:server` - Compile TypeScript

### Database Migrations

```bash
# Generate migration files
npm run db:generate

# Push schema changes
npm run db:push

# Open database GUI
npm run db:studio
```

## 🏗️ Production Build

```bash
# Build everything
npm run build

# Start production server
npm start
```

The server will serve the built React app from `client/dist`.

## 🎯 Key Features Explained

### Type-Safe API

Shared types between frontend and backend ensure consistency:

```typescript
// shared/schema.ts
export const generateResponseSchema = z.object({
  text: z.string().min(1).max(2000),
  tone: z.enum(["Professional", "Apologetic", "Witty", "Firm but Fair"]),
});

// Used in both client and server
```

### Form Validation

React Hook Form + Zod for powerful validation:

```typescript
const form = useForm<GenerateResponseRequest>({
  resolver: zodResolver(generateResponseSchema),
  defaultValues: { text: "", tone: "Professional" },
});
```

### Optimistic Updates

React Query automatically updates UI:

```typescript
const generate = useGenerateResponse();

generate.mutate(data, {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  },
});
```

## 🔒 Security

- Environment variables for sensitive data
- Input validation with Zod
- SQL injection prevention via Drizzle ORM
- XSS protection via React
- Rate limiting (add as needed)

## 🐛 Troubleshooting

**"Cannot find module '@shared/schema'"**
- Ensure path aliases are configured in both `tsconfig.json` files

**Database connection errors**
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database exists

**OpenAI API errors**
- Verify API key is valid
- Check you have credits available
- Ensure `AI_INTEGRATIONS_OPENAI_API_KEY` is set

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

Built with ❤️ using React, TypeScript, Express, and OpenAI
