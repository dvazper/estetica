#!/bin/bash
# Script de instalación rápida para Linux/Mac

echo "🌸 Instalando Estética Premium..."

# Verificar si está en la carpeta correcta
if [ ! -f "index.php" ]; then
    echo "❌ Error: Ejecutar desde la carpeta raíz del proyecto"
    exit 1
fi

# Crear carpetas si no existen
mkdir -p config api css js lib

# Crear archivo .gitignore
cat > .gitignore << 'EOF'
config/database.php
config/stripe.php
lib/Stripe/
.env
node_modules/
vendor/
*.log
.DS_Store
EOF

echo "✅ Carpetas creadas"
echo "✅ .gitignore generado"

echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1. Asegúrate que XAMPP esté corriendo"
echo "   - Abre: http://localhost/phpmyadmin"
echo ""
echo "2. Inicializa la base de datos:"
echo "   - Abre: http://localhost/estetica/config/init_db.php"
echo ""
echo "3. Accede a la aplicación:"
echo "   - Sitio: http://localhost/estetica/"
echo "   - Admin: http://localhost/estetica/admin.php"
echo ""
echo "🎉 ¡Instalación completada!"
