export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.Role)
        return res.status(403).json({ msg: 'Acceso denegado. Rol no asignado' });
  
      if (!allowedRoles.includes(req.user.Role.name)) {
        console.warn(`🔒 Rol no autorizado: ${req.user.Role.name}`);
        return res.status(403).json({ msg: 'No tienes permiso para acceder a esta ruta' });
      }
  
      next();
    };
  };
  
  export const authorizePermission = (...permissions) => {
    return (req, res, next) => {
      if (!req.user || !req.user.Permissions)
        return res.status(403).json({ msg: 'Permisos no asignados' });
  
      const userPermissions = req.user.Permissions.map(p => p.name);
      const hasPermission = permissions.some(p => userPermissions.includes(p));
  
      if (!hasPermission) {
        console.warn(`🔒 Permiso(s) requerido(s): ${permissions.join(', ')} | Usuario tiene: ${userPermissions.join(', ')}`);
        return res.status(403).json({ msg: 'No tienes permisos suficientes' });
      }
  
      next();
    };
  };