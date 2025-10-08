#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "🎨 =========================================="
echo "   PIZARRA IA EDUCATIVA - SETUP"
echo "=========================================="
echo ""

# Función para imprimir mensajes
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar requisitos
echo ""
print_info "Verificando requisitos previos..."

# Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "Por favor instala Node.js 20+ desde: https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node -v)
    print_success "Node.js instalado: $NODE_VERSION"
fi

# npm
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
else
    NPM_VERSION=$(npm -v)
    print_success "npm instalado: $NPM_VERSION"
fi

# Docker
if ! command -v docker &> /dev/null; then
    print_warning "Docker no está instalado"
    echo "Instalando Docker Desktop es ALTAMENTE recomendado"
    echo "Descarga desde: https://www.docker.com/products/docker-desktop"
    read -p "¿Continuar sin Docker? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    USE_DOCKER=false
else
    DOCKER_VERSION=$(docker --version)
    print_success "Docker instalado: $DOCKER_VERSION"
    USE_DOCKER=true
fi

# Instalación
echo ""
print_info "Paso 1/5: Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias"
    exit 1
fi

print_success "Dependencias instaladas"

# Configurar .env
echo ""
print_info "Paso 2/5: Configurando variables de entorno..."

if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success "Archivo .env creado"
    print_warning "IMPORTANTE: Edita .env y agrega tu OPENAI_API_KEY"
else
    print_info "Archivo .env ya existe (no se sobrescribió)"
fi

if [ ! -f "backend/.env" ]; then
    cp .env backend/.env
    print_success "Archivo backend/.env creado"
else
    print_info "Archivo backend/.env ya existe"
fi

# Iniciar Docker
if [ "$USE_DOCKER" = true ]; then
    echo ""
    print_info "Paso 3/5: Iniciando bases de datos con Docker..."
    
    docker compose down 2>/dev/null
    docker compose up -d
    
    if [ $? -ne 0 ]; then
        print_error "Error al iniciar Docker"
        print_info "Intenta iniciar Docker Desktop manualmente"
        exit 1
    fi
    
    print_success "Contenedores de Docker iniciados"
    print_info "Esperando 30 segundos a que las bases de datos estén listas..."
    sleep 30
    
    # Verificar contenedores
    CONTAINERS=$(docker ps --format '{{.Names}}' | grep pizarra | wc -l)
    if [ $CONTAINERS -eq 4 ]; then
        print_success "4 contenedores corriendo correctamente"
    else
        print_warning "Solo $CONTAINERS/4 contenedores corriendo"
        print_info "Verifica con: docker ps"
    fi
else
    echo ""
    print_warning "Paso 3/5: Saltado (Docker no disponible)"
    print_warning "Deberás configurar PostgreSQL, Redis y MongoDB manualmente"
fi

# Configurar Prisma
echo ""
print_info "Paso 4/5: Configurando Prisma..."

cd backend

# Generar cliente
npx prisma generate
if [ $? -ne 0 ]; then
    print_error "Error al generar cliente de Prisma"
    exit 1
fi
print_success "Cliente de Prisma generado"

# Ejecutar migraciones
if [ "$USE_DOCKER" = true ]; then
    npx prisma migrate dev --name init
    if [ $? -ne 0 ]; then
        print_warning "Error al ejecutar migraciones (puede ser que ya existan)"
    else
        print_success "Migraciones ejecutadas"
    fi
    
    # Ejecutar seed
    npx prisma db seed
    if [ $? -ne 0 ]; then
        print_warning "Error al ejecutar seed (puede ser que ya existan los datos)"
    else
        print_success "Base de datos poblada con datos de prueba"
    fi
fi

cd ..

# Verificación final
echo ""
print_info "Paso 5/5: Verificación final..."

if [ "$USE_DOCKER" = true ]; then
    echo ""
    echo "📊 Contenedores de Docker:"
    docker ps --format 'table {{.Names}}\t{{.Status}}' | grep pizarra
fi

echo ""
print_success "¡Setup completado!"

echo ""
echo "=========================================="
echo "🎯 PRÓXIMOS PASOS"
echo "=========================================="
echo ""
echo "1. Edita el archivo .env y agrega tu OPENAI_API_KEY:"
echo "   ${YELLOW}nano .env${NC}"
echo ""
echo "2. Inicia el proyecto:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "3. Abre en tu navegador:"
echo "   • Frontend: ${BLUE}http://localhost:5173${NC}"
echo "   • Backend: ${BLUE}http://localhost:3000/health${NC}"
echo "   • Prisma Studio: ${BLUE}cd backend && npx prisma studio${NC}"
echo ""
echo "4. Ver base de datos (opcional):"
echo "   • Adminer: ${BLUE}http://localhost:8080${NC}"
echo "   • Server: postgres, User: user, Pass: password, DB: pizarra_db"
echo ""
echo "=========================================="
echo ""
print_warning "RECUERDA: Necesitas configurar OPENAI_API_KEY en .env"
echo ""
