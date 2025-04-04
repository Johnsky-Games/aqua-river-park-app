export const getDashboardData = (req, res) => {
    console.log('📊 Accediendo al dashboard:', req.user.name);
    res.json({
      msg: '🎉 Accediste al dashboard protegido',
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.Role.name,
        permissions: req.user.Permissions.map(p => p.name)
      }
    });
  };
  
  export const getClientsView = (req, res) => {
    console.log('📋 Vista clientes permitida para:', req.user.name);
    res.json({ msg: '📋 Acceso permitido: vista de clientes' });
  };
  
  export const getAdminUsers = (req, res) => {
    console.log('👥 Lista de usuarios solicitada por:', req.user.name);
    res.json({ msg: '👥 Acceso permitido: lista de usuarios para admin' });
  };
  
  export const getAdminReports = (req, res) => {
    console.log('📈 Reportes solicitados por:', req.user.name);
    res.json({ msg: '📈 Acceso permitido: reportes para admin' });
  };