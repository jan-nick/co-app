# CoApp

Prototyp für die von Jan Nicklas verfasste Bachelorarbeit „Entwurf und prototypische Implementierung einer Digitalplattform für Genossenschaften“ (2024).

**Dieser Arbeitsbereich wurde von [Nx](https://nx.dev) generiert.**

## Starten Sie die App

### Frontend
Führen Sie „nx server web“ aus. Öffnen Sie Ihren Browser und navigieren Sie zu http://localhost:4200/.

### Backend
Führen Sie „nx serve backend“ aus. Der Backend-Server wird unter http://localhost:3333/ bereitgestellt.

## Datenbank einrichten

### Container ausführen
Führen Sie „docker compose up“ aus dem Verzeichnis „apps/backend“ aus (erfordert [Docker](https://www.docker.com/products/docker-desktop/)).

### Seed-Daten hinzufügen
Führen Sie „npx prisma db seed“ aus, um die Datenbank mit einer Organisation und einem Benutzer zu füllen, der Mitglied mit der Rolle „Administrator“ in dieser Organisation ist.

Anmeldeinformationen für den Seed-Benutzer:
- E-Mail: example@mail.com
- Passwort: Passwort123

## Deploy

Führen Sie „nx build web“ bzw. „nx build backend“ aus, um eine Anwendung zu erstellen. Die Build-Artefakte werden im Verzeichnis „dist/“ gespeichert.
