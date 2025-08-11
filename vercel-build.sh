#!/bin/bash

# Script de build otimizado para Vercel
echo "🚀 Iniciando build para Vercel..."

# Limpar builds anteriores
rm -rf dist
rm -rf node_modules/.tmp

# Instalar dependências
echo "📦 Instalando dependências..."
yarn install --frozen-lockfile

# Verificação de tipos
echo "🔍 Verificando tipos..."
yarn type-check

# Build de produção
echo "🏗️ Executando build de produção..."
yarn build:vercel

# Verificar se o build foi bem-sucedido
if [ -d "dist" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Conteúdo do diretório dist:"
    ls -la dist/
else
    echo "❌ Erro no build!"
    exit 1
fi
