# Deploying Intelligent CRM (Sales IQ) on Your Own Server

This guide takes the project from zero to live on any Linux server (Ubuntu 22.04/24.04 recommended) using Docker. Total time: ~20–30 minutes.

---

## What you get

- Frontend (React, static build served by Nginx)
- Backend (FastAPI on port 8001, internal)
- MongoDB (with a persistent volume)
- Everything wired with one command: `docker compose up -d --build`

## Files included for deployment

| File | Purpose |
|---|---|
| `docker-compose.yml` | Runs MongoDB + backend + frontend together |
| `backend/Dockerfile` | Builds the FastAPI service |
| `backend/.env.production.example` | Backend settings template — copy to `backend/.env` |
| `frontend/Dockerfile` | Builds the React app and serves it via Nginx |
| `frontend/nginx.conf` | Serves the site, proxies `/api` to the backend |
| `.env.production.example` | Root settings template — copy to `.env` |

---

## Step 1 — Get the code onto your server

Either clone from your GitHub (if you pushed from Emergent):

```bash
git clone https://github.com/YOUR-USER/YOUR-REPO.git intelligent-crm
cd intelligent-crm
```

Or upload the project folder via `scp` / SFTP.

## Step 2 — Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # then log out and back in
```

Docker Compose is included with modern Docker (`docker compose version` to verify).

## Step 3 — Configure environment

Backend:

```bash
cp backend/.env.production.example backend/.env
nano backend/.env
```

Set at minimum:
- `JWT_SECRET` — generate one: `openssl rand -hex 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your admin login for `/admin`
- `RESEND_API_KEY` — from https://resend.com → API Keys (optional; leads still save without it)
- `NOTIFICATION_EMAIL` — the inbox that should receive new leads

Root (frontend build):

```bash
cp .env.production.example .env
nano .env
```

Set `REACT_APP_BACKEND_URL` to your public URL, e.g. `https://crm.yourdomain.com`.
No domain yet? Use your server IP: `http://123.45.67.89`.

> Important: this value is baked into the frontend at build time. If you change it later, rebuild with `docker compose up -d --build`.

## Step 4 — Launch

```bash
docker compose up -d --build
docker compose ps        # all three services should be "running"
```

Open `http://YOUR-SERVER-IP` — the site should be live. Admin panel: `http://YOUR-SERVER-IP/admin`.

Useful commands:

```bash
docker compose logs -f backend     # watch backend logs
docker compose restart backend     # after editing backend/.env
docker compose up -d --build       # rebuild after code or root .env changes
docker compose down                # stop everything (data is kept in the volume)
```

## Step 5 — Point your domain + enable HTTPS

1. Create an **A record**: `crm.yourdomain.com` → your server IP.
2. Install Certbot for free SSL:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d crm.yourdomain.com
```

If you used the provided docker-compose setup, Certbot will manage SSL on the host Nginx in front, or you can map port 443 into the frontend container. The simplest path: run Certbot with a host-level Nginx that proxies to `localhost:80`.

## Step 6 — After going live (one-time cleanup)

1. **Update SEO base URLs**: the sitemap, robots.txt and social share card currently use the preview domain. Ask the Emergent agent to "swap the launch domain" (it updates `sitemap.xml`, `robots.txt`, `SEO.jsx` and regenerates `og-image.png`), or edit these files yourself before building:
   - `frontend/public/sitemap.xml`
   - `frontend/public/robots.txt`
   - `frontend/src/components/SEO.jsx` (the `SITE_URL` constant)
2. **Change the admin password** if you haven't already (`backend/.env` → restart backend).
3. **Submit your sitemap** in Google Search Console: `https://yourdomain.com/sitemap.xml`.

## Data & backups

- All leads, analytics and SEO settings live in MongoDB, persisted in the `mongo_data` Docker volume.
- Backup: `docker compose exec mongo mongodump --archive=/tmp/backup.gz --gzip --db=intelligent_crm` then copy it out with `docker cp`.
- The admin panel (`/admin`) → Leads tab → **Export CSV** gives you a spreadsheet of all leads anytime.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Site loads but forms fail | `REACT_APP_BACKEND_URL` wrong at build time — fix root `.env`, then `docker compose up -d --build` |
| `/admin` login fails | Check `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `backend/.env`, then `docker compose restart backend` |
| 502 on `/api` | `docker compose logs backend` — usually Mongo not ready; wait 10s and retry |
| No lead emails | `RESEND_API_KEY` empty or invalid in `backend/.env` — leads still save to the DB regardless |
