#!/usr/bin/env bash
set -e

SRC="/vercel/share/v0-project/Portfolio"
DEST="/vercel/share/v0-project/portfolio_final_netlify"
ZIP_OUT="/vercel/share/v0-project/portfolio_final_netlify.zip"

# 1. Nettoie les artefacts précédents
rm -rf "$DEST" "$ZIP_OUT"

# 2. Copie le projet sans node_modules, .next, .git et fichiers inutiles
rsync -a \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='*.backup' \
  --exclude='.github' \
  --exclude='Portfolio.zip' \
  "$SRC/" "$DEST/"

# 3. Crée le ZIP depuis le dossier parent, en gardant portfolio_final_netlify/ à la racine
cd /vercel/share/v0-project
zip -r "$ZIP_OUT" portfolio_final_netlify/

# 4. Affiche la taille et le chemin
echo "ZIP créé : $ZIP_OUT"
du -sh "$ZIP_OUT"
