# Quick Start: Launch Project in 5 Minutes

## Step 1: Choose Project Type

**Simple project (Landing, MVP, Script):**
```bash
cp project-types/simple-nextjs/CLAUDE.md ./CLAUDE.md
# or
cp project-types/simple-python/CLAUDE.md ./CLAUDE.md
```

**Modular project (like Outreach - many features):**
```bash
cp project-types/fullstack-modular/CLAUDE.md ./CLAUDE.md
cp project-types/fullstack-modular/structure.md ./docs/
```

---

## Step 2: Add Base Files

```bash
cp base/CHANGELOG.md ./CHANGELOG.md
cp base/.gitignore ./.gitignore
cp base/.env.example ./.env
```

Fill your `.env` file with your keys.

---

## Step 3: (Optional) Add Additional Rules

**If you need different stack, not from ready templates:**

```bash
# Start with base
cp base/CLAUDE.md ./CLAUDE.md

# Add needed rules
cat rules/python.md >> ./CLAUDE.md
cat rules/nextjs.md >> ./CLAUDE.md
# and so on...
```

**Available rules:** see `rules/README.md`

---

## Step 4: Create First Sprint (optional)

```bash
mkdir -p sprints/01-initial-setup/{docs,tasks}
```

Copy structure from `workflows/sprints.md`.

---

## Step 5: Create PRD (optional for big projects)

```bash
mkdir -p docs
touch docs/PRD.md
```

---

## ✅ Done!

**Now tell Claude:**
> "I have CLAUDE.md with rules. Let's create [what you need]."

Claude will see your rules and follow them.

---

## 🔄 Update Rules from cursor.directory

When you want to update rules from cursor.directory:

1. Go to https://cursor.directory/rules/[language]
2. Copy new rules
3. Update `rules/[language].md`
4. Apply to projects via `cat rules/[language].md >> ./CLAUDE.md`

---

## 📦 Adding New Knowledge to Templates

**When you created something cool in project:**

1. **Determine category:**
   - General rule for all projects? → `base/CLAUDE.md`
   - Stack-specific? → `rules/[stack].md`
   - Reusable code? → `snippets/[name]/`
   - Work process? → `workflows/[name].md`

2. **Copy to templates:**
```bash
# Example: new API wrapper
cp ~/my-project/lib/api-client.py ~/code-templates/snippets/api-wrappers/

# Update documentation
echo "- api-client.py - [description]" >> snippets/README.md
```

3. **Commit to code-templates:**
```bash
cd ~/code-templates
git add .
git commit -m "feat: add API client wrapper from my-project"
```

---

**Questions?** See `README.md` in root.
