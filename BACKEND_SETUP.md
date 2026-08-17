# Backend Setup Guide

## Backend Features Implemented

✅ **Contact Form API** - Store visitor messages with email notifications  
✅ **Blog API** - Hardcoded blog posts (can be enhanced with database later)  
✅ **Page View Analytics** - Track and display real-time page views  
✅ **Email Notifications** - Gmail integration for contact messages  

---

## Setup Instructions

### 1. **Set Up PostgreSQL Database**

Choose one option:

#### Option A: Supabase (Cloud - Recommended)
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the PostgreSQL connection string
5. Paste it into your `.env.local` as `DATABASE_URL`

#### Option B: Local PostgreSQL
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a new database: `createdb portfolio`
3. Add to `.env.local`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
   ```

### 2. **Update Environment Variables**

Edit `.env.local`:
```env
DATABASE_URL="your_database_url_here"
GMAIL_USER="ajiboyecaroline95@gmail.com"
GMAIL_APP_PASSWORD="your_gmail_app_password_here"
```

### 3. **Generate Prisma Client and Create Tables**

Run:
```bash
npx prisma migrate dev --name init
```

This will:
- Generate Prisma client
- Create database tables
- Create a migration file

### 4. **Test the APIs**

#### Test Contact Form:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Hello from the contact form!"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "contactId": 1
}
```

#### Test Page Tracking:
```bash
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/",
    "sessionId": "user-session-123"
  }'
```

#### Get Analytics:
```bash
curl http://localhost:3000/api/analytics
```

Expected response:
```json
{
  "today": 5,
  "total": 25,
  "topPages": [
    {
      "path": "/",
      "count": 12
    }
  ]
}
```

---

## File Structure

```
app/
├── api/
│   ├── contact/route.ts          # Contact form API
│   ├── track/route.ts            # Page view tracking
│   ├── analytics/route.ts        # Analytics API
│   └── github-activity/route.ts  # GitHub integration
├── lib/
│   └── email.ts                  # Email service
├── blogs/
│   └── constants.ts              # Blog posts
└── page.tsx                      # Home page (updated with analytics)

prisma/
└── schema.prisma                 # Database schema

.env.local                        # Environment variables (keep secret!)
```

---

## Database Schema

### Contact Table
```sql
CREATE TABLE Contact (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### BlogPost Table
```sql
CREATE TABLE BlogPost (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### PageView Table
```sql
CREATE TABLE PageView (
  id SERIAL PRIMARY KEY,
  path VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sessionId VARCHAR(255)
);
```

---

## What's Ready to Use

### ✅ Home Page
- Real-time page view counter in the metrics section
- Replaces the "Streak" metric with "Page Views Today"
- Auto-tracks every page visit

### ✅ Blog Posts
- 3 sample blog posts in `app/blogs/constants.ts`
- Ready to display on `/blogs` page

### ✅ Contact Form
- API endpoint ready: `POST /api/contact`
- Validates email and required fields
- Sends Gmail notification automatically
- Stores message in database

### ✅ Analytics
- Page views tracked automatically on every page load
- Real-time dashboard at `GET /api/analytics`
- Shows page views today, total, and top pages

---

## Next Steps (Optional)

1. **Contact Form UI** - Create a form component on a contact page
2. **Blog Display** - Update `/blogs/page.tsx` to display blog posts
3. **Admin Dashboard** - Add interface to manage contact messages
4. **Email Templates** - Enhance email formatting
5. **Analytics Dashboard** - Create detailed analytics page

---

## Troubleshooting

**Error: "Unable to connect to database"**
- Check DATABASE_URL in `.env.local`
- Verify database is running
- Test connection with: `npx prisma db push`

**Gmail emails not sending**
- Verify GMAIL_APP_PASSWORD is correct (not your regular Gmail password!)
- Enable "Less secure app access" if using personal Gmail
- Check spam folder

**Page views not tracking**
- Check browser console for errors
- Verify `/api/track` endpoint is working
- Check database connection

---

## Security Notes

⚠️ **Keep `.env.local` private!** Never commit it to GitHub.
- Database credentials
- Gmail app password
- Any API keys

Make sure it's in `.gitignore` (already configured).

---

## Support

For issues or questions about the backend setup, refer to:
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Nodemailer Documentation](https://nodemailer.com/)
