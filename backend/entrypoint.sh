#!/bin/sh
set -e
# Espera opcional a la DB (simple)
# sleep 2
echo "Ejecutando migraciones..."
node run-migrations.js
echo "Iniciando servidor..."
node src/index.js
