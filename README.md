# Mohan Shenoy - Academic & Achievement Portfolio

A premium, interactive, and easily maintainable student portfolio website designed for **Mohan Shenoy**, Computer Science and Engineering student at **REVA University**. This site tracks achievements, skills, and projects semester-by-semester from Semester 1 to Semester 8.

## 🚀 Live Preview & Running Locally

Since this site is built using pure **Vanilla HTML, CSS, and JavaScript**, it does not require any build setups or server dependencies. You can open and run it instantly.

### Running with a Local Server
To make sure data loads properly from the local JSON config file, open the project using a simple local server. Here are the options:

- **VS Code Live Server (Recommended)**: If using VS Code, install the "Live Server" extension, right-click `index.html`, and select **Open with Live Server**.
- **Python**: Run `python -m http.server 8000` in this directory, then visit `http://localhost:8000`.
- **Node.js**: Install `http-server` globally (`npm install -g http-server`) and run `http-server` in the directory, then visit `http://localhost:8080`.

---

## 🛠️ How to Add/Delete Achievements (Maintenance)

The portfolio features a built-in visual **Editor Dashboard** so you don't have to manually write code or edit JSON structures in text editors.

### 1. Open the Editor
1. Open the portfolio in your browser.
2. Click the **Edit Mode** gear button in the top right navigation bar.
3. Enter the passcode: `reva2025`
4. The **Portfolio Editor Dashboard** modal will open.

### 2. Make Your Modifications
- **Profile Info**: Update your year, current semester, short bio, or email.
- **Achievements**: Add, edit, or delete achievements. Link them to specific semesters (1 to 8) and categories (Academic, Technical, Extracurricular).
- **Projects**: Log projects you build (such as the *2D Graphics Renderer in C*) and list their tech stacks.
- **Skills**: Manage tags inside Categories (Languages, Developer Tools, Core Knowledge).

### 3. Save & Persist Your Changes Permanently
When you edit items in the Dashboard, the changes are saved immediately in your browser's local cache (`localStorage`) so you can preview them live. To make these changes **permanent** inside the source files:

1. Click on the **Sync & Export** tab in the admin sidebar.
2. Click the **Download updated portfolio-data.json** button.
3. Move the downloaded `portfolio-data.json` file into your project folder, replacing the existing `portfolio-data.json` file.
4. (Optional) Alternatively, click **Copy JSON to Clipboard** and paste it directly over the contents of `portfolio-data.json` in your code editor.
5. Push the change to your GitHub repository!

---

## 🌐 Deploys & Hosting

You can publish the site for free using GitHub's web interface and GitHub Pages:

1. Create a public repository named `mohanshenoy43-create.github.io` under the `mohanshenoy43-create` account.
2. In the repository, choose **Add file → Upload files** and upload the site files (`index.html`, `styles.css`, `app.js`, `admin.js`, and `portfolio-data.json`) to the repository root. Commit the upload to `main`.
3. Open **Settings → Pages**, choose **Deploy from a branch**, select `main` and the root (`/`) folder, then save.
4. Once deployment completes, the site will be available at `https://mohanshenoy43-create.github.io`.

The portfolio includes a brief, a prompt log for the prompts available in this conversation, links to the Hello World and LeetCode repositories, and HackerRank and LinkedIn profile links.

---

## 🎨 Design Theme & Architecture

- **Glassmorphism Theme**: Smooth background blurs, transculent panels (`rgba`), thin borders, and radial glowing background animation blobs.
- **Typography**: `Outfit` for text and `Sora` for headers, loaded via Google Fonts.
- **Iconography**: `FontAwesome 6` icons.
- **Timeline Engine**: Handles active, completed, and upcoming semester states automatically.
