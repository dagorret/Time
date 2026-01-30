import json
import random
from datetime import datetime, timedelta

def generate_data(count=1000):
    roles = ["Admin", "Editor", "Viewer", "Soporte"]
    estados = ["Activo", "Inactivo", "Pendiente", "Bloqueado"]
    nombres = ["Carlos", "Ana", "Luis", "Marta", "Jorge", "Elena", "Roberto", "Sofia"]
    apellidos = ["García", "Rodríguez", "López", "Sánchez", "Pérez", "Gómez", "Martin"]

    data = []
    start_date = datetime(2025, 1, 1)

    for i in range(1, count + 1):
        nombre = random.choice(nombres)
        apellido = random.choice(apellidos)
        fecha_random = start_date + timedelta(days=random.randint(0, 365), hours=random.randint(0, 23))

        data.append({
            "id": i,
            "nombre": f"{nombre} {apellido}",
            "email": f"{nombre.lower()}.{apellido.lower()}{i}@time.os",
            "rol": random.choice(roles),
            "estado": random.choice(estados),
            "balance": round(random.uniform(100.0, 5000.0), 2),
            "ultimo_acceso": fecha_random.strftime("%Y-%m-%d %H:%M")
        })

    output = {
        "total": count,
        "schema": [
            {"field": "id", "header": "ID", "sortable": True},
            {"field": "nombre", "header": "Nombre Completo", "sortable": True},
            {"field": "email", "header": "Correo Electrónico", "sortable": True},
            {"field": "rol", "header": "Rol", "sortable": True},
            {"field": "estado", "header": "Estado", "sortable": True},
            {"field": "balance", "header": "Balance ($)", "sortable": True},
            {"field": "ultimo_acceso", "header": "Último Acceso", "sortable": True}
        ],
        "data": data
    }

    with open('public/api/ti-table.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"✅ Generados {count} registros de personas en public/api/ti-table.json")

if __name__ == "__main__":
    generate_data(1000)