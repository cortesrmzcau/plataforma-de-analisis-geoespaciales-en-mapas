// Busqueda general

export class usuarioApp {
    $key: string;
	nombre: string;
	latitude?: string;
	longitude?: string;
	genero?: string;
	fecha_nacimiento?: string;
}

export class usuariosProductosFavoritos {
	$key: string;
	descripcion: string;
	id_tienda: string;
	imagen: string;
	nombre: string;
	tag: string;
	precio: string;
	user_id: string;
	fecha: string;
	hora: string;
}

// Busqueda particular

export class productosInteres {
    $key?: string;
    categoria?: string;
	descripcion?: string;
	id_tienda?: string;
	imagen?: string;
	nombre?: string;
	precio?: string;
}