---
name: validar-boveda
description: >-
  Ejecuta la regeneración de índices automáticos, la validación de integridad ISO/IEC/IEEE 29148 y el control de versiones Git del SRS de Construcciones MBL. Usar después de modificar cualquier nota en docs/ o antes de confirmar cambios en el repositorio.
---

# Validar bóveda SRS

Asegura que los índices automáticos, la trazabilidad unidireccional, los wikilinks y el historial de cambios de la bóveda `docs/` permanezcan íntegros tras cada edición.

## Pasos

1. Comprobar el estado del repositorio remoto antes de trabajar o cerrar cambios:
   ```powershell
   git fetch
   git status -sb
   ```
   Si la rama local `main` está por detrás (`behind`) o ha divergido de `origin/main`, detenerse y avisar al usuario antes de tocar archivos o hacer `pull`.
2. Regenerar índices, validar la bóveda y actualizar el listado de requisitos usando [boveda.py](../../../docs/90-anexos/scripts/boveda.py):
   ```powershell
   python docs/90-anexos/scripts/boveda.py indices
   python docs/90-anexos/scripts/boveda.py validar
   python docs/90-anexos/scripts/boveda.py listar
   ```
3. Confirmar que el campo `actualizado:` de cada nota editada coincide con la fecha actual y que los cambios relevantes añaden fila ordenada en `docs/00-inicio/Historial de cambios.md` y actualizan `docs/00-inicio/Estado.md` si cambia lo decidido o el siguiente paso.
4. No editar manualmente bloques `<!-- AUTO:… -->`. Revisar y explicar al usuario cualquier `[AVISO]` devuelto por la validación (hipótesis o preguntas abiertas pendientes).
5. Cuando el cambio corresponda a un hito o nueva versión del historial, crear el commit local en `main` tras pasar la validación (nunca ejecutar `git push` sin confirmación explícita).

## Verificación

- `python docs/90-anexos/scripts/boveda.py validar` finaliza con código de salida `0` y `Errores: 0`.
- `docs/00-inicio/Estado.md` muestra la última versión registrada en `docs/00-inicio/Historial de cambios.md`.
- `git status -sb` muestra el árbol limpio si se realizó el commit del hito.
